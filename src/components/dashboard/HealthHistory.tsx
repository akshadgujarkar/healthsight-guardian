import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getUserHealthHistory, Analysis } from "@/services/dbService";

// Mock user ID - in a real app this would come from authentication
const MOCK_USER_ID = "65f5e16c8e3f7b6a12345678";

const HealthHistory: React.FC = () => {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHealthHistory = async () => {
      setIsLoading(true);
      try {
        const history = await getUserHealthHistory(MOCK_USER_ID);
        setAnalyses(history);
      } catch (error) {
        toast.error("Failed to load health history");
        setAnalyses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHealthHistory();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  };

  if (isLoading) {
    return (
      <Card className="border-accent-foreground/10 bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-6 flex justify-center items-center h-60">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-accent-foreground/10 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-foreground">Your Health History</CardTitle>
        <CardDescription className="text-muted-foreground">
          Review your past symptom analyses and diagnoses
        </CardDescription>
      </CardHeader>
      <CardContent>
        {analyses.length > 0 ? (
          <div className="space-y-6">
            {analyses.map((analysis) => (
              <div key={analysis.id} className="border border-border rounded-lg p-4 hover:bg-accent/5 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{analysis.diagnosis}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formatDate(analysis.date)}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {analysis.severity && (
                      <span className={`mr-3 px-3 py-1 rounded-full text-xs font-medium ${
                        analysis.severity === "Low" ? "bg-green-900/20 text-green-400" : 
                        analysis.severity === "Medium" ? "bg-amber-900/20 text-amber-400" : 
                        "bg-red-900/20 text-red-400"
                      }`}>
                        {analysis.severity}
                      </span>
                    )}
                    <Button variant="outline" size="sm" className="flex items-center border-border bg-background/50">
                      <FileText className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Symptoms</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.symptoms.map((symptom, index) => (
                      <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Recommendations</h4>
                  <p className="text-foreground/80 text-sm">{analysis.recommendations}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-foreground">No health records yet</h3>
            <p className="text-muted-foreground mb-6">
              Start by checking your symptoms to build your health history.
            </p>
            <Button asChild className="health-button-primary">
              <a href="/symptom-checker">Check Symptoms Now</a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HealthHistory;
