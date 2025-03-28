
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';

interface PreventionTip {
  title: string;
  description: string;
  category: 'general' | 'lifestyle' | 'nutrition' | 'mental';
  actionSteps: string[];
  image?: string;
}

interface TipCardProps {
  tip: PreventionTip;
}

const TipCard: React.FC<TipCardProps> = ({ tip }) => {
  const [expanded, setExpanded] = useState(false);
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'general': return 'bg-blue-100 text-blue-800';
      case 'lifestyle': return 'bg-purple-100 text-purple-800';
      case 'nutrition': return 'bg-green-100 text-green-800';
      case 'mental': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'general': return 'General Health';
      case 'lifestyle': return 'Lifestyle';
      case 'nutrition': return 'Nutrition';
      case 'mental': return 'Mental Health';
      default: return category;
    }
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(tip.category)}`}>
            {getCategoryLabel(tip.category)}
          </span>
        </div>
        <CardTitle>{tip.title}</CardTitle>
        <CardDescription>{tip.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow flex flex-col">
        {expanded && (
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Action Steps:</h4>
            <ul className="space-y-2">
              {tip.actionSteps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <Check className="text-health-green mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <Button 
          variant="ghost" 
          className="mt-auto self-start text-health-blue hover:text-health-dark-blue hover:bg-blue-50"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              <ChevronUp className="mr-1 h-4 w-4" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="mr-1 h-4 w-4" />
              Show Action Steps
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TipCard;
