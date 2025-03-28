
import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, BookOpen, ShieldCheck } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Stethoscope className="w-12 h-12 text-health-blue" />,
      title: "Symptom Analysis",
      description: "Our Symptom Checker provides personalized insights based on your symptoms and health history.",
      link: "/symptom-checker",
      linkText: "Check Symptoms"
    },
    {
      icon: <BookOpen className="w-12 h-12 text-health-blue" />,
      title: "Disease Information",
      description: "Access in-depth information about various diseases, conditions, causes, and treatments.",
      link: "/disease-info",
      linkText: "Explore Diseases"
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-health-blue" />,
      title: "Prevention Tips",
      description: "Learn effective strategies to prevent illness, maintain health, and improve your wellbeing.",
      link: "/prevention-tips",
      linkText: "View Prevention Tips"
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Path to Better Health Starts Here
          </h2>
          <p className="text-lg text-gray-700">
            Our platform offers a comprehensive Symptom Checker that helps you identify potential health issues based on your symptoms. 
            Explore detailed Disease Information and effective Prevention Tips to empower your health journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="health-card flex flex-col items-center text-center">
              <div className="mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <Link 
                to={feature.link} 
                className="mt-auto text-health-blue hover:text-health-dark-blue font-medium flex items-center"
              >
                {feature.linkText}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
