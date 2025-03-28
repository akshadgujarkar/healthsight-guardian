
import React from 'react';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import KeyFeatures from '@/components/home/KeyFeatures';
import EarlyDetection from '@/components/home/EarlyDetection';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <KeyFeatures />
        <EarlyDetection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
