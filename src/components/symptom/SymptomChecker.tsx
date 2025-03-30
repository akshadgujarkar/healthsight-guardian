
import React, { useState } from 'react';
import SymptomForm from './SymptomForm';
import DiagnosisResult from './DiagnosisResult';
import { analyzeSymptoms } from '@/services/geminiService';
import { saveHealthAnalysis } from '@/services/dbService';
import { toast } from '@/components/ui/sonner';

export interface DiagnosisResultType {
  possibleConditions: {
    name: string;
    probability: string;
    description: string;
  }[];
  recommendations: string[];
  medications: {
    name: string;
    usage: string;
    warnings: string;
  }[];
  preventionTips: string[];
  followUpQuestions?: string[];
}

// Mock user ID - in a real app this would come from authentication
const MOCK_USER_EMAIL = 'john.doe@example.com';

const SymptomChecker: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResultType | null>(null);
  const [currentSymptoms, setCurrentSymptoms] = useState<string[]>([]);

  const handleSubmitSymptoms = async (symptoms: string[], age: number, gender: string, medicalHistory: string) => {
    setIsAnalyzing(true);
    setCurrentSymptoms(symptoms);
    
    try {
      const result = await analyzeSymptoms(symptoms, age, gender, medicalHistory);
      setDiagnosisResult(result);
      
      // Save symptom check to database if result is valid
      if (result && result.possibleConditions && result.possibleConditions.length > 0) {
        const topCondition = result.possibleConditions[0];
        const severity = determineSeverity(topCondition.probability);
        
        await saveHealthAnalysis(MOCK_USER_EMAIL, {
          symptoms,
          diagnosis: topCondition.name,
          recommendations: result.recommendations.join('. '),
          severity
        });
      }
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      toast.error('Failed to analyze symptoms. Please try again later.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const determineSeverity = (probability: string): 'Low' | 'Medium' | 'High' => {
    const percentage = parseInt(probability.replace('%', '').trim());
    
    if (percentage >= 75) {
      return 'High';
    } else if (percentage >= 40) {
      return 'Medium';
    } else {
      return 'Low';
    }
  };

  const handleReset = () => {
    setDiagnosisResult(null);
    setCurrentSymptoms([]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!diagnosisResult ? (
        <SymptomForm onSubmit={handleSubmitSymptoms} isLoading={isAnalyzing} />
      ) : (
        <DiagnosisResult 
          userId={MOCK_USER_EMAIL}
          result={diagnosisResult} 
          onReset={handleReset} 
          symptoms={currentSymptoms}
        />
      )}
    </div>
  );
};

export default SymptomChecker;
