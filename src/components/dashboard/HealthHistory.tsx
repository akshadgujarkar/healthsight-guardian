
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, FileText } from 'lucide-react';

interface Analysis {
  id: number;
  date: string;
  symptoms: string[];
  diagnosis: string;
  recommendations: string;
}

interface HealthHistoryProps {
  analyses: Analysis[];
}

const HealthHistory: React.FC<HealthHistoryProps> = ({ analyses }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Health History</CardTitle>
        <CardDescription>
          Review your past symptom analyses and diagnoses
        </CardDescription>
      </CardHeader>
      <CardContent>
        {analyses.length > 0 ? (
          <div className="space-y-6">
            {analyses.map((analysis) => (
              <div key={analysis.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{analysis.diagnosis}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formatDate(analysis.date)}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <FileText className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-gray-600 mb-1">Symptoms</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.symptoms.map((symptom, index) => (
                      <span 
                        key={index} 
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-600 mb-1">Recommendations</h4>
                  <p className="text-gray-700 text-sm">{analysis.recommendations}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No health records yet</h3>
            <p className="text-gray-600 mb-6">
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
