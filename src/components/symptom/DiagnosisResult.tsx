
import React, { useState } from 'react';
import { DiagnosisResultType } from './SymptomChecker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Check, AlertCircle, PlusCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DiagnosisResultProps {
  result: DiagnosisResultType;
  onReset: () => void;
}

const DiagnosisResult: React.FC<DiagnosisResultProps> = ({ result, onReset }) => {
  const [activeTab, setActiveTab] = useState('conditions');

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <Check className="mr-2 h-5 w-5 text-green-500" />
          Analysis Complete
        </CardTitle>
        <CardDescription>
          Based on the symptoms and information you provided, here's what our AI system has identified
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="conditions">Possible Conditions</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="prevention">Prevention</TabsTrigger>
          </TabsList>
          
          <TabsContent value="conditions" className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <AlertTriangle className="text-yellow-500 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800">Important Disclaimer</h4>
                  <p className="text-yellow-700 text-sm">
                    This analysis is not a medical diagnosis. Always consult with a healthcare professional
                    for proper medical advice and treatment.
                  </p>
                </div>
              </div>
            </div>
            
            <h3 className="font-semibold text-lg mb-4">Potential Conditions</h3>
            
            <div className="space-y-6">
              {result.possibleConditions.map((condition, index) => (
                <div key={index} className="border rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-lg">{condition.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      condition.probability.includes('High') 
                        ? 'bg-red-100 text-red-800' 
                        : condition.probability.includes('Medium')
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {condition.probability}
                    </span>
                  </div>
                  <p className="text-gray-700">{condition.description}</p>
                  <div className="mt-4">
                    <Link 
                      to={`/disease-info?disease=${encodeURIComponent(condition.name)}`}
                      className="text-health-blue hover:text-health-dark-blue font-medium flex items-center"
                    >
                      Learn more about {condition.name}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="medications" className="space-y-4">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <AlertCircle className="text-blue-500 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800">Medication Information</h4>
                  <p className="text-blue-700 text-sm">
                    These are potential medications that may be prescribed for your symptoms. 
                    Never self-medicate without consulting a healthcare professional.
                  </p>
                </div>
              </div>
            </div>
            
            <h3 className="font-semibold text-lg mb-4">Suggested Medications</h3>
            
            <div className="space-y-6">
              {result.medications.map((medication, index) => (
                <div key={index} className="border rounded-lg p-5 hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-lg mb-2">{medication.name}</h4>
                  <div className="mb-3">
                    <h5 className="font-semibold text-sm text-gray-600">Usage</h5>
                    <p className="text-gray-700">{medication.usage}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm text-gray-600">Warnings</h5>
                    <p className="text-gray-700">{medication.warnings}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recommendations" className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Recommendations</h3>
            <ul className="space-y-3">
              {result.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <PlusCircle className="text-health-green mr-3 mt-1 flex-shrink-0" />
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
            
            {result.followUpQuestions && (
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Follow-up Questions to Ask Your Doctor</h3>
                <ul className="space-y-3">
                  {result.followUpQuestions.map((question, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="text-health-blue mr-3 mt-1 flex-shrink-0" />
                      <span>{question}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="prevention" className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Prevention Tips</h3>
            <ul className="space-y-3">
              {result.preventionTips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <Check className="text-health-green mr-3 mt-1 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8">
              <Link 
                to="/prevention-tips"
                className="text-health-blue hover:text-health-dark-blue font-medium flex items-center"
              >
                See more prevention tips and health guidance
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 flex justify-between">
          <Button 
            variant="outline" 
            onClick={onReset}
            className="health-button-outline"
          >
            Start New Analysis
          </Button>
          <Button asChild className="health-button-primary">
            <Link to="/dashboard">Save to Health Records</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiagnosisResult;
