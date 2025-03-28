
import React, { useState } from 'react';
import SymptomForm from './SymptomForm';
import DiagnosisResult from './DiagnosisResult';
import { analyzeSymptoms } from '@/services/geminiService';
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

const SymptomChecker: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResultType | null>(null);

  const handleSubmitSymptoms = async (symptoms: string[], age: number, gender: string, medicalHistory: string) => {
    setIsAnalyzing(true);
    
    try {
      const result = await analyzeSymptoms(symptoms, age, gender, medicalHistory);
      setDiagnosisResult(result);
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      toast.error('Failed to analyze symptoms. Please try again later.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setDiagnosisResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!diagnosisResult ? (
        <SymptomForm onSubmit={handleSubmitSymptoms} isLoading={isAnalyzing} />
      ) : (
        <DiagnosisResult result={diagnosisResult} onReset={handleReset} />
      )}
    </div>
  );
};

export default SymptomChecker;
