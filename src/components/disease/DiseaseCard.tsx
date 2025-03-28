
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp, AlertTriangle, Info, Activity, Shield } from 'lucide-react';

interface Disease {
  name: string;
  description: string;
  symptoms: string[];
  causes: string[];
  treatments: string[];
  preventionTips: string[];
}

interface DiseaseCardProps {
  disease: Disease;
}

const DiseaseCard: React.FC<DiseaseCardProps> = ({ disease }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <CardTitle className="flex justify-between items-center">
          <span>{disease.name}</span>
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </CardTitle>
        <p className="text-gray-600">{disease.description}</p>
      </CardHeader>
      
      {expanded && (
        <CardContent className="pt-2 space-y-6">
          <div>
            <div className="flex items-center text-health-blue mb-2">
              <AlertTriangle className="mr-2 h-4 w-4" />
              <h3 className="font-semibold">Symptoms</h3>
            </div>
            <ul className="list-disc list-inside space-y-1 pl-2">
              {disease.symptoms.map((symptom, index) => (
                <li key={index} className="text-gray-700">{symptom}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <div className="flex items-center text-health-blue mb-2">
              <Info className="mr-2 h-4 w-4" />
              <h3 className="font-semibold">Causes</h3>
            </div>
            <ul className="list-disc list-inside space-y-1 pl-2">
              {disease.causes.map((cause, index) => (
                <li key={index} className="text-gray-700">{cause}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <div className="flex items-center text-health-blue mb-2">
              <Activity className="mr-2 h-4 w-4" />
              <h3 className="font-semibold">Treatments</h3>
            </div>
            <ul className="list-disc list-inside space-y-1 pl-2">
              {disease.treatments.map((treatment, index) => (
                <li key={index} className="text-gray-700">{treatment}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <div className="flex items-center text-health-blue mb-2">
              <Shield className="mr-2 h-4 w-4" />
              <h3 className="font-semibold">Prevention</h3>
            </div>
            <ul className="list-disc list-inside space-y-1 pl-2">
              {disease.preventionTips.map((tip, index) => (
                <li key={index} className="text-gray-700">{tip}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default DiseaseCard;
