
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Discover Your Health: Check Your Symptoms Today
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Welcome to our disease detection platform, where understanding your health is just a few clicks away.
              Input your symptoms and receive tailored insights to guide your next steps.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                className="health-button-primary"
              >
                <Link to="/symptom-checker">Check Symptoms</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="health-button-outline"
              >
                <Link to="/disease-info">Learn More</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 gap-4 animate-fade-in">
            <div className="w-[100%]  bg-gray-200 rounded-lg overflow-hidden col-span-2 h-48">
              <img
                src="https://www.shutterstock.com/image-vector/young-family-kids-talks-pediatrician-600nw-2246402649.jpg"
                alt="Medical dashboard interface"
                className="w-full bg-black"
              />
            </div>

            <div className="aspect-square w-full bg-gray-200 rounded-lg overflow-hidden">
              <img
                src="https://www.shutterstock.com/image-vector/young-family-kids-talks-pediatrician-600nw-2246402649.jpg"
                alt="Medical app interface"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <img
                src="https://img.freepik.com/free-vector/dentist-man-office-with-computer-books_24877-55109.jpg"
                alt="Health analysis interface"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
