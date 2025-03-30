import React, { useState } from 'react';
import { Home, X, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1c2128] border-b border-[#30363d]">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-[2560px]">
        {/* Left side */}
        <Link to="/" className="flex items-center gap-2 text-white hover:text-gray-300">
          <Home className="w-5 h-5" />
          <span className="font-semibold text-sm sm:text-base">ML Learning Platform</span>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-white/5 rounded-lg"
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            to="/learn" 
            className="text-white/70 hover:text-white transition-colors text-sm lg:text-base"
          >
            Learn
          </Link>
          <Link 
            to="/research" 
            className="text-white/70 hover:text-white transition-colors text-sm lg:text-base"
          >
            Research
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[#1c2128] border-b border-[#30363d] py-4">
          <div className="container mx-auto px-4 flex flex-col gap-4">
            <Link 
              to="/learn" 
              className="text-white/70 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Learn
            </Link>
            <Link 
              to="/research" 
              className="text-white/70 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Research
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
