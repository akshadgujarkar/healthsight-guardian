
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <span className="text-2xl font-bold italic text-health-dark-blue">
        HealthSight
      </span>
      <span className="text-health-green font-bold">Guardian</span>
    </Link>
  );
};

export default Logo;
