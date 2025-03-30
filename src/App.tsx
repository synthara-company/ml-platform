import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Hero } from './components/sections/Hero';
import { LearningInterface } from './components/sections/LearningInterface';
import { ResearchInterface } from './components/sections/ResearchInterface';
import { Test } from './components/Test';
import { OpenGraphImage } from './components/OpenGraphImage';
import { OGPreview } from './components/OGPreview';
import { ImageGenerationInterface } from './components/sections/ImageGenerationInterface';
import { FloatingBugReport } from './components/FloatingBugReport';
import { BlurBackground } from './components/BlurBackground';
import { SimpleBlurForm } from './components/SimpleBlurForm';
import { MicroservicesInterface } from './components/sections/MicroservicesInterface';
import { TermsOfService } from './components/legal/TermsOfService';
import { PrivacyPolicy } from './components/legal/PrivacyPolicy';
import { CookiePolicy } from './components/legal/CookiePolicy';
import { CookieConsent } from './components/CookieConsent';
import { Footer } from './components/Footer';

// Define a type for user data
interface UserData {
  name: string;
  age: number;
}

// Separate component for the main app content with form
const MainContent: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const location = useLocation();

  // Add this function to handle form submission
  const handleFormSubmit = (newUserData: UserData) => {
    setUserData(newUserData);
    setFormSubmitted(true);
    // Trigger a custom event to notify App component
    window.dispatchEvent(new CustomEvent('userDataUpdated'));
  };

  // Check if we're on a legal page
  const isLegalPage = location.pathname === '/terms' || location.pathname === '/privacy';

  // Your existing useEffect for localStorage
  useEffect(() => {
    try {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData) as UserData;
        if (parsedUserData && parsedUserData.name && parsedUserData.age) {
          setUserData(parsedUserData);
          setFormSubmitted(true);
        }
      }
    } catch (error) {
      console.error('Error loading user data from localStorage:', error);
      localStorage.removeItem('userData');
    } finally {
      setInitialCheckDone(true);
    }
  }, []);

  // Your existing handleSubmit function
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUserData = {
      name: formData.get('name') as string,
      age: parseInt(formData.get('age') as string),
    };

    try {
      localStorage.setItem('userData', JSON.stringify(newUserData));
      handleFormSubmit(newUserData); // Use the new function here
    } catch (error) {
      console.error('Error saving user data:', error);
      alert('There was an error saving your information. Please try again.');
    }
  };

  if (isLegalPage) {
    return (
      <Routes>
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-[#1c2128] text-primary tracking-wide leading-relaxed relative flex flex-col">
      {/* Cookie Consent must be mounted at all times */}
      <CookieConsent />
      
      {/* Welcome bar */}
      {formSubmitted && userData && (
        <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 text-white py-0.5 px-4 z-50 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-white/50">Welcome,</span>
              <span className="font-medium">{userData.name}</span>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('userData');
                setUserData(null);
                setFormSubmitted(false);
              }}
              className="text-white/50 hover:text-white flex items-center gap-1 px-1.5 py-0.5 rounded-md hover:bg-white/10 transition-colors text-xs"
            >
              <span>Sign Out</span>
              <svg 
                className="w-3 h-3" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Blur overlay */}
      {!formSubmitted && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-30"></div>
      )}

      {/* User onboarding form */}
      {!formSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-surface rounded-2xl border border-border shadow-2xl overflow-hidden">
            {/* Header Section */}
            <div className="relative h-32 bg-gradient-radial from-primary/20 via-background to-background">
              <div className="absolute inset-0 bg-noise opacity-20"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-3xl font-bold text-text-primary">Welcome</h2>
                <p className="text-text-secondary mt-1">Let's get you started</p>
              </div>
            </div>

            {/* Form Section */}
            <div className="p-6 pt-4">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Input */}
                <div className="space-y-2">
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium text-text-secondary"
                  >
                    Your Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      className="w-full px-4 h-11 bg-surface border border-border rounded-lg
                               text-text-primary placeholder:text-text-secondary/50
                               focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30
                               transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Age Selection */}
                <div className="space-y-2">
                  <label 
                    htmlFor="age" 
                    className="block text-sm font-medium text-text-secondary"
                  >
                    Your Age
                  </label>
                  <div className="relative">
                    <select
                      id="age"
                      name="age"
                      className="w-full px-4 h-11 bg-surface border border-border rounded-lg
                               text-text-primary 
                               focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30
                               transition-all duration-200 appearance-none"
                      required
                    >
                      <option value="" disabled selected>Select your age</option>
                      {Array.from({ length: 83 }, (_, i) => i + 18).map(value => (
                        <option key={value} value={value}>{value} years</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full h-11 bg-primary hover:bg-primary/90 text-surface
                             rounded-lg font-medium transition-all duration-200
                             focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2
                             focus:ring-offset-surface
                             flex items-center justify-center gap-2"
                  >
                    <span>Continue to Platform</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </form>

              {/* Footer */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <p className="text-amber-400 text-sm font-medium mb-2">Note:</p>
                    <p className="text-gray-300 text-sm">
                      To view our Terms of Service and Privacy Policy in detail, please complete your credentials first. 
                      Then you can press these links to see them activated in our cloud-based documentation system!
                    </p>
                  </div>
                  <p className="text-center text-sm text-text-secondary">
                    By continuing, you agree to our{' '}
                    <a 
                      href="/terms" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 underline cursor-pointer"
                    >
                      Terms of Service
                    </a>
                    {' '}and{' '}
                    <a 
                      href="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 underline cursor-pointer"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
        
      {/* Application content */}
      <div className="relative z-10 flex-1">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/learn" element={<LearningInterface />} />
          <Route path="/research" element={<ResearchInterface />} />
          <Route path="/test" element={<Test />} />
          <Route path="/og-image" element={<OpenGraphImage />} />
          <Route path="/og-preview" element={<OGPreview />} />
          <Route path="/generate" element={<ImageGenerationInterface />} />
          <Route path="/simple-blur" element={<SimpleBlurForm />} />
          <Route path="/microservices" element={<MicroservicesInterface />} />
        </Routes>
        <FloatingBugReport />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Main App component
function App() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    const checkUserData = () => {
      try {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData) as UserData;
          if (parsedUserData && parsedUserData.name && parsedUserData.age) {
            setUserData(parsedUserData);
            setFormSubmitted(true);
          }
        }
      } catch (error) {
        console.error('Error loading user data from localStorage:', error);
        localStorage.removeItem('userData');
      } finally {
        setInitialCheckDone(true);
      }
    };

    // Check initially
    checkUserData();

    // Listen for updates
    const handleUserDataUpdate = () => checkUserData();
    window.addEventListener('userDataUpdated', handleUserDataUpdate);

    return () => {
      window.removeEventListener('userDataUpdated', handleUserDataUpdate);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/*" element={<MainContent />} />
      </Routes>
      {formSubmitted && <CookieConsent />}
    </Router>
  );
}

export default App;
