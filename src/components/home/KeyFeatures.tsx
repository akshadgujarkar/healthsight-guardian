
import React from 'react';
import { Link } from 'react-router-dom';

const KeyFeatures: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Discover Your Health: Key Features of Our Disease Detection Platform
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 h-48 w-full bg-gray-200 rounded-lg overflow-hidden">
              <img
                src="https://static.vecteezy.com/system/resources/previews/048/970/788/non_2x/colorful-digital-workspace-illustration-flat-free-png.png"
                alt="Symptom checker interface"
                className="w-full h-full object-cover border-2 border-black rounded-lg"
              />
            </div>
            <h3 className="text-xl font-bold mb-3">
              Explore Our Comprehensive Tools for Accurate Health Insights
            </h3>
            <p className="text-gray-600 mb-6">
              Our Symptom Checker provides personalized insights based on your symptoms.
            </p>
            <Link
              to="/symptom-checker"
              className="text-health-blue hover:text-health-dark-blue font-medium flex items-center"
            >
              Learn More
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-6 h-48 w-full bg-gray-200 rounded-lg overflow-hidden">
              <img
                src="https://worldclinic.com/wp-content/uploads/2025/01/types-and-branches-of-personalized-medicine-1024x873.png"
                alt="Disease information interface"
                className="w-full h-full object-cover border-2 border-black rounded-lg"
              />
            </div>
            <h3 className="text-xl font-bold mb-3">
              Access Detailed Disease Information for Informed Health Decisions
            </h3>
            <p className="text-gray-600 mb-6">
              Get in-depth knowledge about various diseases and conditions.
            </p>
            <Link
              to="/disease-info"
              className="text-health-blue hover:text-health-dark-blue font-medium flex items-center"
            >
              Learn More
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-6 h-48 w-full bg-gray-200 rounded-lg border-red-100 overflow-hidden">
              <img
                src="https://cdn.who.int/media/images/default-source/health-topics/coronavirus/person-sick-in-your-household-what-to-do.jpg?sfvrsn=39d1287_18"
                alt="Prevention tips interface"
                className="w-full h-full object-cover border-2 border-black rounded-lg"
              />
            </div>
            <h3 className="text-xl font-bold mb-3">
              Stay Healthy with Our Expert Prevention Tips and Guidelines
            </h3>
            <p className="text-gray-600 mb-6">
              Discover effective strategies to prevent illness and promote wellness.
            </p>
            <Link
              to="/prevention-tips"
              className="text-health-blue hover:text-health-dark-blue font-medium flex items-center"
            >
              Learn More
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
