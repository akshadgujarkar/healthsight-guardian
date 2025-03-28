
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Dashboard from '@/components/dashboard/Dashboard';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-10 px-6 bg-gray-50">
        <div className="container mx-auto">
          <Dashboard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
