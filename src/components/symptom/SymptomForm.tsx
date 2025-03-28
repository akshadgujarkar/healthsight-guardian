
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SymptomFormProps {
  onSubmit: (symptoms: string[], age: number, gender: string, medicalHistory: string) => void;
  isLoading: boolean;
}

const SymptomForm: React.FC<SymptomFormProps> = ({ onSubmit, isLoading }) => {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState('');
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<string>('');
  const [medicalHistory, setMedicalHistory] = useState('');

  const addSymptom = () => {
    if (currentSymptom.trim() !== '' && !symptoms.includes(currentSymptom.trim())) {
      setSymptoms([...symptoms, currentSymptom.trim()]);
      setCurrentSymptom('');
    }
  };

  const removeSymptom = (index: number) => {
    setSymptoms(symptoms.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symptoms.length > 0 && age > 0 && gender) {
      onSubmit(symptoms, age, gender, medicalHistory);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSymptom();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Symptom Checker</CardTitle>
        <CardDescription>
          Enter your symptoms and health information for an AI-powered analysis and potential diagnosis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label htmlFor="symptom">Enter your symptoms</Label>
            <div className="flex space-x-2">
              <Input
                id="symptom"
                placeholder="E.g., headache, fever, cough..."
                value={currentSymptom}
                onChange={(e) => setCurrentSymptom(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <Button 
                type="button" 
                onClick={addSymptom} 
                disabled={!currentSymptom.trim() || isLoading}
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>

            {symptoms.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Your symptoms:</p>
                <div className="flex flex-wrap gap-2">
                  {symptoms.map((symptom, index) => (
                    <div 
                      key={index} 
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center text-sm"
                    >
                      {symptom}
                      <button 
                        type="button" 
                        onClick={() => removeSymptom(index)}
                        className="ml-2 text-blue-500 hover:text-blue-700"
                        disabled={isLoading}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="0"
                max="120"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select 
                value={gender} 
                onValueChange={setGender}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="medical-history">Medical History (Optional)</Label>
            <Textarea
              id="medical-history"
              placeholder="Include any relevant medical history, allergies, or current medications..."
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              className="min-h-[100px]"
              disabled={isLoading}
            />
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full health-button-primary"
              disabled={symptoms.length === 0 || !age || !gender || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Symptoms...
                </>
              ) : (
                'Analyze Symptoms'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SymptomForm;
