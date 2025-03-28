
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PreventionTips from '@/components/prevention/PreventionTips';

const PreventionTipsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-10 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto mb-8">
            <h1 className="text-3xl font-bold mb-4">Prevention Tips & Healthy Living</h1>
            <p className="text-gray-600">
              Discover evidence-based strategies to prevent illness and maintain optimal health. 
              These practical tips can help you build habits that support long-term wellbeing and disease prevention.
            </p>
          </div>
          <PreventionTips />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PreventionTipsPage;
