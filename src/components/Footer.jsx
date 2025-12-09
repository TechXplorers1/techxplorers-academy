import React from 'react';

const Footer = () => {
  // CHANGED: Background to dark gray (or black for stronger contrast) and text to light gray/white
  return (
    <footer className="bg-gray-800 text-white py-12 mt-12 border-t border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-gray-400">&copy; 2023 TX Academy All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;