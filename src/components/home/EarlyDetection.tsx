
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Box, Zap } from 'lucide-react';

const EarlyDetection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm text-health-blue font-semibold uppercase tracking-wider">Health</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
              Empower Your Health with Early Detection
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Our platform offers timely insights into your health. By identifying symptoms early, 
              you can take proactive steps towards better health.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="bg-health-light-green p-3 rounded-lg">
                  <Box className="w-6 h-6 text-health-green" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Personalized Insights</h3>
                  <p className="text-gray-600">
                    Receive tailored health information based on your specific symptoms and concerns.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-health-light-green p-3 rounded-lg">
                  <Zap className="w-6 h-6 text-health-green" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Early Detection</h3>
                  <p className="text-gray-600">
                    Catch potential health issues before they become serious with our symptom checker.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild className="health-button-primary">
                <Link to="/symptom-checker">Check Symptoms</Link>
              </Button>
              <Button asChild variant="outline" className="health-button-outline">
                <Link to="/dashboard">Sign Up</Link>
              </Button>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjkatXXpVqLT4RUjQoe8ykOH2Tq7t0iinUdw&s" 
              alt="Health monitoring dashboard" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyDetection;
