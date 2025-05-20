import React from 'react';
import { Facebook, Twitter, Instagram, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="text-center md:text-left">
            <p className="text-sm">&copy; {currentYear} Task Planner. All rights reserved.</p>
          </div>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors duration-300">Terms</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Privacy</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Help</a>
          </div>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" aria-label="Facebook" className="hover:text-blue-500 transition">
              <Facebook size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-sky-400 transition">
              <Twitter size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500 transition">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={scrollToTop}
            className="text-gray-400 hover:text-white flex items-center gap-2 transition"
          >
            <ArrowUp size={18} />
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
