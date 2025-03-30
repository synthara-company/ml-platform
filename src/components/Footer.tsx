import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Copyright, Info, Cookie, Settings, Scale, X } from 'lucide-react';
import { HiringForm } from './ui/HiringForm';
import { CreditsModal } from './ui/CreditsModal';
import { motion } from 'framer-motion';

interface CookieSettings {
  essential: boolean;
  analytics: boolean;
  preferences: boolean;
}

export function Footer() {
  const [showHiringForm, setShowHiringForm] = useState(false);
  const [showCookieSettings, setShowCookieSettings] = useState(false);
  const [showLicense, setShowLicense] = useState(false);
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
    essential: true,
    analytics: false,
    preferences: false,
  });

  const handleOpenCredits = () => {
    const modal = document.getElementById('credits-modal');
    if (modal) modal.showModal();
  };

  const handleCookieSettingsChange = async (settings: Partial<CookieSettings>) => {
    const newSettings = { ...cookieSettings, ...settings };
    setCookieSettings(newSettings);
    
    try {
      const response = await fetch('http://localhost:3000/cookie-preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newSettings,
          userId: localStorage.getItem('userId') || 'anonymous',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save cookie preferences');
      }

      localStorage.setItem('cookieSettings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error saving cookie preferences:', error);
    }
  };

  return (
    <footer className="bg-[#1c2128] border-t border-[#30363d] py-6 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Make the links container horizontally scrollable on mobile */}
            <div className="w-full overflow-x-auto pb-2 md:pb-0">
              <div className="flex items-center gap-6 min-w-max md:min-w-0">
                <Link 
                  to="/terms" 
                  className="text-white/50 hover:text-white text-sm transition-colors whitespace-nowrap"
                >
                  Terms of Service
                </Link>
                <Link 
                  to="/privacy" 
                  className="text-white/50 hover:text-white text-sm transition-colors whitespace-nowrap"
                >
                  Privacy Policy
                </Link>
                <button
                  onClick={() => setShowHiringForm(true)}
                  className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-1 whitespace-nowrap"
                >
                  <Users className="w-4 h-4" />
                  Join Our Team
                </button>
                <button
                  onClick={handleOpenCredits}
                  className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-1 whitespace-nowrap"
                >
                  <Info className="w-4 h-4" />
                  Credits
                </button>
                <button
                  onClick={() => setShowCookieSettings(true)}
                  className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-1 whitespace-nowrap"
                >
                  <Cookie className="w-4 h-4" />
                  Cookie Settings
                </button>
                <button
                  onClick={() => setShowLicense(true)}
                  className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-1 whitespace-nowrap"
                >
                  <Scale className="w-4 h-4" />
                  License
                </button>
              </div>
              
              {/* Optional: Add scroll indicator on mobile */}
              <div className="h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent mt-2 md:hidden" />
            </div>
          </div>
          <div className="text-center text-white/50 text-sm border-t border-[#30363d] pt-4">
            © 2025 Synthara. All rights reserved.
          </div>
        </div>
      </div>

      {/* Modals */}
      {showHiringForm && (
        <HiringForm 
          isOpen={showHiringForm} 
          onClose={() => setShowHiringForm(false)} 
        />
      )}
      <CreditsModal onClose={() => {
        const modal = document.getElementById('credits-modal');
        if (modal) modal.close();
      }} />

      {/* License Modal */}
      {showLicense && (
        <dialog
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm w-full h-full flex items-center justify-center overflow-y-auto p-4"
          open
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#1c2128] border border-[#30363d] rounded-xl p-6 w-full max-w-2xl relative overflow-hidden my-8"
          >
            {/* Synthara-styled background effects */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Gradient mesh background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-purple-500/5" />
              
              {/* Animated orbs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
              
              {/* Subtle grid overlay */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
                  `,
                  backgroundSize: '24px 24px'
                }}
              />
            </div>

            <div className="relative z-10 max-h-[calc(100vh-8rem)] overflow-y-auto">
              {/* Header with Synthara branding */}
              <div className="flex justify-between items-center mb-8 sticky top-0 bg-[#1c2128]/80 backdrop-blur-sm py-2 z-20">
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {/* Synthara logo container */}
                  <div className="relative w-10 h-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg blur-sm opacity-50" />
                    <img 
                      src="https://avatars.githubusercontent.com/u/203538727?s=200&v=4"
                      alt="Synthara Logo"
                      className="relative w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    License Agreement
                  </h2>
                </motion.div>
                
                <motion.button
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  onClick={() => setShowLicense(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white/70" />
                </motion.button>
              </div>

              {/* License content with Synthara styling */}
              <div className="prose prose-invert max-w-none">
                <motion.div 
                  className="space-y-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* Copyright notice with enhanced styling */}
                  <div className="p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl backdrop-blur-sm border border-white/10">
                    <div className="flex items-center gap-3">
                      <Copyright className="w-5 h-5 text-purple-400" />
                      <p className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        Copyright (c) 2025 Synthara
                      </p>
                    </div>
                  </div>
                  
                  {/* License terms with improved readability */}
                  <div className="space-y-4 text-white/80">
                    <p className="leading-relaxed">
                      Permission is hereby granted, free of charge, to any person obtaining a copy
                      of this software and associated documentation files (the "Software"), to deal
                      in the Software without restriction, including without limitation the rights
                      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                      copies of the Software, and to permit persons to whom the Software is
                      furnished to do so, subject to the following conditions:
                    </p>

                    <p className="leading-relaxed">
                      The above copyright notice and this permission notice shall be included in all
                      copies or substantial portions of the Software.
                    </p>

                    <p className="leading-relaxed">
                      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                      SOFTWARE.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Footer with gradient button */}
              <motion.div 
                className="mt-8 pt-6 border-t border-white/10 sticky bottom-0 bg-[#1c2128]/80 backdrop-blur-sm z-20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={() => setShowLicense(false)}
                  className="w-full relative group overflow-hidden rounded-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="relative px-4 py-3 flex items-center justify-center gap-2 text-white font-medium">
                    <Scale className="w-4 h-4" />
                    Close License
                  </div>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </dialog>
      )}

      {/* Cookie Settings Modal */}
      {showCookieSettings && (
        <dialog
          className="fixed inset-0 z-50 bg-black/50 w-full h-full flex items-center justify-center"
          open
        >
          <div className="bg-[#1c2128] border border-[#30363d] rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Cookie Settings
              </h2>
              <button
                onClick={() => setShowCookieSettings(false)}
                className="text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Essential Cookies</h3>
                  <p className="text-white/50 text-sm">Required for basic site functionality</p>
                </div>
                <input
                  type="checkbox"
                  checked={cookieSettings.essential}
                  disabled
                  className="accent-purple-500"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Analytics Cookies</h3>
                  <p className="text-white/50 text-sm">Help us improve our website</p>
                </div>
                <input
                  type="checkbox"
                  checked={cookieSettings.analytics}
                  onChange={(e) => handleCookieSettingsChange({ analytics: e.target.checked })}
                  className="accent-purple-500"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Preference Cookies</h3>
                  <p className="text-white/50 text-sm">Remember your settings</p>
                </div>
                <input
                  type="checkbox"
                  checked={cookieSettings.preferences}
                  onChange={(e) => handleCookieSettingsChange({ preferences: e.target.checked })}
                  className="accent-purple-500"
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#30363d]">
              <button
                onClick={() => setShowCookieSettings(false)}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </dialog>
      )}
    </footer>
  );
}
