
import React from 'react';
import Logo from '../ui/Logo';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col space-y-4">
            <Logo />
            <div className="text-sm text-gray-600">
              <p className="font-semibold">Address:</p>
              <p>Level 1, 12 Sample St, Sydney, NSW 2000</p>
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-semibold">Contact:</p>
              <a href="tel:1800-123-456" className="hover:text-health-blue transition-colors">
                1800 123 456
              </a>
              <a href="mailto:info@healthsight.io" className="block hover:text-health-blue transition-colors">
                info@healthsight.io
              </a>
            </div>
            <div className="flex space-x-4 text-gray-700">
              <a href="#" aria-label="Facebook" className="hover:text-health-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-health-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-health-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-health-blue transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-health-blue transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/" className="hover:text-health-blue transition-colors">Home</Link></li>
                <li><Link to="/symptom-checker" className="hover:text-health-blue transition-colors">Symptom Checker</Link></li>
                <li><Link to="/disease-info" className="hover:text-health-blue transition-colors">Disease Info</Link></li>
                <li><Link to="/prevention-tips" className="hover:text-health-blue transition-colors">Prevention Tips</Link></li>
                <li><Link to="/dashboard" className="hover:text-health-blue transition-colors">User Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-health-blue transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-health-blue transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-health-blue transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-health-blue transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-health-blue transition-colors">Help Center</a></li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-health-blue transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-health-blue transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-health-blue transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-health-blue transition-colors">Disclaimer</a></li>
              <li><a href="#" className="hover:text-health-blue transition-colors">Cookie Settings</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} HealthSight Guardian. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-health-blue transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-health-blue transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-health-blue transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
