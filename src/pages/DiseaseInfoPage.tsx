
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DiseaseInfo from '@/components/disease/DiseaseInfo';

const DiseaseInfoPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-10 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto mb-8">
            <h1 className="text-3xl font-bold mb-4">Disease Information</h1>
            <p className="text-gray-600">
              Explore comprehensive information about various diseases, their symptoms, causes, and treatment options. 
              Our database provides reliable medical information to help you better understand health conditions.
            </p>
          </div>
          <DiseaseInfo />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DiseaseInfoPage;
