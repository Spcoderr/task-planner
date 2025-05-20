import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">Task Planner</Link>
          
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link 
                  to="/" 
                  className={`hover:text-blue-400 transition-colors ${
                    location.pathname === '/' ? 'text-blue-400' : ''
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/projects" 
                  className={`hover:text-blue-400 transition-colors ${
                    location.pathname.includes('/projects') ? 'text-blue-400' : ''
                  }`}
                >
                  Projects
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;