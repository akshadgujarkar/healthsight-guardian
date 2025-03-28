
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../ui/Logo';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { title: 'Symptom Checker', path: '/symptom-checker' },
    { title: 'Disease Info', path: '/disease-info' },
    { title: 'Prevention Tips', path: '/prevention-tips' },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="py-4 px-6 md:px-10 bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Logo />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium hover:text-health-blue transition-colors ${
                isActivePath(link.path) ? 'text-health-blue' : 'text-gray-700'
              }`}
            >
              {link.title}
            </Link>
          ))}

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center space-x-1 font-medium hover:text-health-blue transition-colors ${
                isActivePath('/dashboard') ? 'text-health-blue' : 'text-gray-700'
              }`}
            >
              <span>User Dashboard</span>
              <ChevronDown size={16} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  My Dashboard
                </Link>
                <Link
                  to="/dashboard/history"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Health History
                </Link>
                <Link
                  to="/dashboard/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  My Profile
                </Link>
              </div>
            )}
          </div>
        </nav>

        <div className="hidden md:block">
          <Button className="health-button-primary">
            Join
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-6 bg-white border-t">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium hover:text-health-blue transition-colors ${
                  isActivePath(link.path) ? 'text-health-blue' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            <Link
              to="/dashboard"
              className={`font-medium hover:text-health-blue transition-colors ${
                isActivePath('/dashboard') ? 'text-health-blue' : 'text-gray-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              User Dashboard
            </Link>
            <Button className="health-button-primary w-full mt-2">
              Join
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
