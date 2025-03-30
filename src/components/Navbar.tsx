import React from 'react';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1c2128] border-b border-[#30363d]">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left side */}
        <Link to="/" className="flex items-center gap-2 text-white hover:text-gray-300">
          <Home className="w-5 h-5" />
          <span className="font-semibold">ML Learning Platform</span>
        </Link>

        {/* Center section */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            to="/learn" 
            className="text-white/70 hover:text-white transition-colors"
          >
            Learn
          </Link>
          <Link 
            to="/research" 
            className="text-white/70 hover:text-white transition-colors"
          >
            Research
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Link 
            to="/terms" 
            className="text-white/50 hover:text-white text-sm transition-colors"
          >
            Terms
          </Link>
          <Link 
            to="/privacy" 
            className="text-white/50 hover:text-white text-sm transition-colors"
          >
            Privacy
          </Link>
        </div>
      </div>
    </nav>
  );
}
