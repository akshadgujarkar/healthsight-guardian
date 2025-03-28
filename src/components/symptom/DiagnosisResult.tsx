import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DiagnosisResultType } from './SymptomChecker';
import NearbyHospitals from './NearbyHospitals';
import { ArrowLeft, ThumbsUp, ThumbsDown, Activity, Pill, Shield, Stethoscope, HelpCircle } from 'lucide-react';

interface DiagnosisResultProps {
  result: DiagnosisResultType;
  onReset: () => void;
  symptoms?: string[];
}

const DiagnosisResult: React.FC<DiagnosisResultProps> = ({ result, onReset, symptoms = [] }) => {
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const handleFeedback = (isHelpful: boolean) => {
    console.log(`User found diagnosis ${isHelpful ? 'helpful' : 'not helpful'}`);
    setFeedbackGiven(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          className="flex items-center" 
          onClick={onReset}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Symptom Checker
        </Button>
        
        {!feedbackGiven ? (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Was this diagnosis helpful?</span>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center" 
              onClick={() => handleFeedback(true)}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              Yes
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center" 
              onClick={() => handleFeedback(false)}
            >
              <ThumbsDown className="h-4 w-4 mr-1" />
              No
            </Button>
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">Thank you for your feedback!</span>
        )}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Diagnosis Results</CardTitle>
          <CardDescription>
            Based on your described symptoms, here are possible conditions and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="conditions" className="space-y-4">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="conditions" className="flex items-center">
                <Activity className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Conditions</span>
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="flex items-center">
                <Stethoscope className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Recommendations</span>
              </TabsTrigger>
              <TabsTrigger value="medications" className="flex items-center">
                <Pill className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Medications</span>
              </TabsTrigger>
              <TabsTrigger value="prevention" className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Prevention</span>
              </TabsTrigger>
              <TabsTrigger value="followup" className="flex items-center">
                <HelpCircle className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Follow-up</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="conditions" className="space-y-4">
              <div className="space-y-4">
                {result.possibleConditions.map((condition, index) => (
                  <div key={index} className="p-4 border rounded-md">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{condition.name}</h3>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {condition.probability}
                      </span>
                    </div>
                    <p className="text-gray-700">{condition.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="recommendations" className="space-y-4">
              <ul className="space-y-2">
                {result.recommendations.map((recommendation, index) => (
                  <li key={index} className="p-3 bg-background border rounded-md flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-medium mr-3 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="medications" className="space-y-4">
              <div className="space-y-4">
                {result.medications.map((medication, index) => (
                  <div key={index} className="p-4 border rounded-md">
                    <h3 className="font-bold mb-2">{medication.name}</h3>
                    <div className="mb-2">
                      <h4 className="text-sm font-semibold text-gray-600 mb-1">Usage</h4>
                      <p className="text-gray-700">{medication.usage}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 mb-1">Warnings</h4>
                      <p className="text-gray-700">{medication.warnings}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="prevention" className="space-y-4">
              <ul className="space-y-2">
                {result.preventionTips.map((tip, index) => (
                  <li key={index} className="p-3 bg-background border rounded-md flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-medium mr-3 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="followup" className="space-y-4">
              {result.followUpQuestions && result.followUpQuestions.length > 0 ? (
                <ul className="space-y-2">
                  {result.followUpQuestions.map((question, index) => (
                    <li key={index} className="p-3 bg-background border rounded-md">
                      {question}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center">
                  <p className="text-gray-600">No follow-up questions at this time.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {result.possibleConditions.length > 0 && (
        <NearbyHospitals condition={result.possibleConditions[0].name} />
      )}
    </div>
  );
};

export default DiagnosisResult;
