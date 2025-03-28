
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SymptomChecker from '@/components/symptom/SymptomChecker';

const SymptomCheckerPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-10 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto mb-8">
            <h1 className="text-3xl font-bold mb-4">Symptom Checker</h1>
            <p className="text-gray-600">
              Enter your symptoms below and our AI will analyze them to suggest possible conditions, 
              treatments, and next steps. Remember that this analysis is not a replacement for professional 
              medical advice.
            </p>
          </div>
          <SymptomChecker />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SymptomCheckerPage;
