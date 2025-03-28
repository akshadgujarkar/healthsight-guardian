
import React, { useState } from 'react';
import TipCard from './TipCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PreventionTip {
  title: string;
  description: string;
  category: 'general' | 'lifestyle' | 'nutrition' | 'mental';
  actionSteps: string[];
  image?: string;
}

const PreventionTips: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const tips: PreventionTip[] = [
    {
      title: "Regular Hand Washing",
      description: "Proper hand hygiene is one of the most effective ways to prevent the spread of infectious diseases.",
      category: "general",
      actionSteps: [
        "Wash hands with soap and water for at least 20 seconds",
        "Use hand sanitizer with at least 60% alcohol when soap is unavailable",
        "Wash hands before eating, after using the restroom, and after being in public places"
      ]
    },
    {
      title: "Stay Active Daily",
      description: "Regular physical activity can help prevent heart disease, stroke, diabetes, and several other conditions.",
      category: "lifestyle",
      actionSteps: [
        "Aim for at least 150 minutes of moderate activity weekly",
        "Include strength training exercises twice a week",
        "Find activities you enjoy to make exercise sustainable",
        "Start small and gradually increase intensity and duration"
      ]
    },
    {
      title: "Prioritize Sleep",
      description: "Quality sleep is essential for physical health, mental wellbeing, and immune function.",
      category: "lifestyle",
      actionSteps: [
        "Aim for 7-9 hours of sleep per night",
        "Maintain a consistent sleep schedule",
        "Create a relaxing bedtime routine",
        "Limit screen time before bed",
        "Keep your bedroom cool, dark, and quiet"
      ]
    },
    {
      title: "Balanced Nutrition",
      description: "A healthy diet provides nutrients essential for disease prevention and overall wellbeing.",
      category: "nutrition",
      actionSteps: [
        "Eat plenty of fruits and vegetables daily",
        "Choose whole grains over refined grains",
        "Limit processed foods and added sugars",
        "Stay hydrated with plenty of water",
        "Practice portion control"
      ]
    },
    {
      title: "Stress Management",
      description: "Chronic stress can lead to serious health problems, making stress management vital for prevention.",
      category: "mental",
      actionSteps: [
        "Practice mindfulness or meditation regularly",
        "Engage in activities you enjoy",
        "Set realistic goals and priorities",
        "Connect with others for social support",
        "Consider professional help when needed"
      ]
    },
    {
      title: "Limit Alcohol Consumption",
      description: "Excessive alcohol use can lead to liver disease, heart problems, and increased cancer risk.",
      category: "lifestyle",
      actionSteps: [
        "Limit to one drink daily for women and two for men",
        "Have alcohol-free days each week",
        "Count and measure your drinks",
        "Avoid drinking on an empty stomach",
        "Find healthy alternatives to manage stress"
      ]
    },
    {
      title: "Regular Health Screenings",
      description: "Regular check-ups and screenings can detect health issues early, when they're most treatable.",
      category: "general",
      actionSteps: [
        "Schedule annual physical examinations",
        "Know your family health history",
        "Follow age-appropriate screening guidelines",
        "Discuss concerns with your healthcare provider",
        "Keep track of key health metrics like blood pressure and cholesterol"
      ]
    },
    {
      title: "Boost Your Immune System",
      description: "A strong immune system helps your body fight off infections and diseases.",
      category: "nutrition",
      actionSteps: [
        "Eat immune-boosting foods rich in vitamins C and D",
        "Get adequate sunlight or consider vitamin D supplements",
        "Prioritize protein intake for antibody production",
        "Include probiotic foods for gut health",
        "Limit sugar which can suppress immune function"
      ]
    },
    {
      title: "Practice Mindfulness",
      description: "Mindfulness can reduce stress, anxiety, and depression while improving overall mental health.",
      category: "mental",
      actionSteps: [
        "Set aside 5-10 minutes daily for mindfulness practice",
        "Use guided meditation apps to help get started",
        "Practice mindful eating and other daily activities",
        "Notice thoughts without judgment",
        "Focus on your breath when feeling overwhelmed"
      ]
    }
  ];
  
  const filteredTips = activeTab === 'all' 
    ? tips 
    : tips.filter(tip => tip.category === activeTab);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Prevention Tips & Healthy Living Guidance</h2>
        <p className="text-gray-600">
          Discover practical strategies to prevent illness and maintain optimal health. These evidence-based tips 
          can help you build habits that support long-term wellbeing and disease prevention.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="all">All Tips</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="mental">Mental Health</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTips.map((tip, index) => (
            <TipCard key={index} tip={tip} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PreventionTips;
