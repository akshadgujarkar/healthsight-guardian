
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DiseaseCard from './DiseaseCard';
import { Search } from 'lucide-react';

interface Disease {
  name: string;
  description: string;
  symptoms: string[];
  causes: string[];
  treatments: string[];
  preventionTips: string[];
}

const DiseaseInfo: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  // Sample disease data - in a real app, this would come from the Gemini API
  const diseases: Disease[] = [
    {
      name: "Common Cold",
      description: "A viral infection of the upper respiratory tract that typically causes symptoms such as a runny nose, cough, and sore throat.",
      symptoms: ["Runny nose", "Sneezing", "Cough", "Sore throat", "Mild fever", "Fatigue"],
      causes: ["Rhinovirus", "Other viruses", "Close contact with infected individuals", "Touching contaminated surfaces"],
      treatments: ["Rest and hydration", "Over-the-counter pain relievers", "Decongestants", "Throat lozenges"],
      preventionTips: ["Frequent handwashing", "Avoid close contact with sick people", "Keep your hands away from your face", "Strengthen your immune system"]
    },
    {
      name: "Influenza (Flu)",
      description: "A contagious respiratory illness caused by influenza viruses that can cause mild to severe illness, and in some cases, can lead to hospitalization or death.",
      symptoms: ["Fever", "Cough", "Sore throat", "Body aches", "Headache", "Fatigue", "Chills"],
      causes: ["Influenza A viruses", "Influenza B viruses", "Close contact with infected individuals", "Airborne transmission"],
      treatments: ["Antiviral medications", "Rest", "Hydration", "Over-the-counter pain relievers"],
      preventionTips: ["Annual flu vaccination", "Regular handwashing", "Avoid close contact with sick people", "Cover coughs and sneezes"]
    },
    {
      name: "Hypertension (High Blood Pressure)",
      description: "A condition in which the force of the blood against the artery walls is too high, potentially leading to heart disease and other health problems.",
      symptoms: ["Often no symptoms", "Headaches (in severe cases)", "Shortness of breath (in severe cases)", "Nosebleeds (in severe cases)"],
      causes: ["Age", "Family history", "Obesity", "Sedentary lifestyle", "High sodium diet", "Excessive alcohol consumption", "Stress"],
      treatments: ["Lifestyle changes", "Blood pressure medications", "Regular monitoring", "Reduced sodium intake", "Exercise"],
      preventionTips: ["Maintain a healthy weight", "Regular physical activity", "Eat a heart-healthy diet", "Limit alcohol consumption", "Avoid tobacco use", "Manage stress"]
    },
    {
      name: "Type 2 Diabetes",
      description: "A chronic condition that affects how your body metabolizes sugar (glucose), which is an important source of fuel for your body.",
      symptoms: ["Increased thirst", "Frequent urination", "Increased hunger", "Fatigue", "Blurred vision", "Slow-healing sores"],
      causes: ["Insulin resistance", "Overweight or obesity", "Family history", "Inactivity", "Age", "Prediabetes"],
      treatments: ["Healthy eating", "Regular exercise", "Blood sugar monitoring", "Diabetes medications", "Insulin therapy"],
      preventionTips: ["Maintain a healthy weight", "Regular physical activity", "Eat a balanced diet", "Avoid sugary foods and refined carbohydrates", "Regular health check-ups"]
    }
  ];
  
  const filteredDiseases = searchQuery.trim() ? 
    diseases.filter(disease => 
      disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disease.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disease.symptoms.some(symptom => symptom.toLowerCase().includes(searchQuery.toLowerCase()))
    ) : 
    diseases;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    // In a real app, this would trigger an API call to fetch disease info
    setTimeout(() => {
      setIsSearching(false);
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for diseases, symptoms, or conditions..."
              className="pl-10"
            />
          </div>
          <Button type="submit" className="health-button-primary" disabled={isSearching}>
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
        </form>
      </div>

      <div className="space-y-6">
        {filteredDiseases.length > 0 ? (
          filteredDiseases.map((disease, index) => (
            <DiseaseCard key={index} disease={disease} />
          ))
        ) : (
          <div className="text-center py-10">
            <h3 className="text-xl font-semibold mb-2">No diseases found</h3>
            <p className="text-gray-600">Try a different search term or browse our common diseases.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseaseInfo;
