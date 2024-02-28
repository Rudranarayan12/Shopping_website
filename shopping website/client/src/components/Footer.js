import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer bg-gray-600 text-white p-4">
      <h4 className="text-center mb-2 text-lg">
        All Right Reserved &copy; Saumya
      </h4>
      <p className="text-center">
        <Link to="/about" className="block mt-2 sm:inline-block sm:mt-0 mr-4">
          About
        </Link>
        <span className="hidden sm:inline-block">|</span>
        <Link to="/contact" className="block mt-2 sm:inline-block sm:mt-0 mx-4">
          Contact
        </Link>
        <span className="hidden sm:inline-block">|</span>
        <Link to="/policy" className="block mt-2 sm:inline-block sm:mt-0 ml-4">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default Footer;
