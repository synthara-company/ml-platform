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
            <div className="flex items-center gap-6">
              <Link 
                to="/terms" 
                className="text-white/50 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                to="/privacy" 
                className="text-white/50 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <button
                onClick={() => setShowHiringForm(true)}
                className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-1"
              >
                <Users className="w-4 h-4" />
                Join Our Team
              </button>
              <button
                onClick={handleOpenCredits}
                className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-1"
              >
                <Info className="w-4 h-4" />
                Credits
              </button>
              <button
                onClick={() => setShowCookieSettings(true)}
                className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-1"
              >
                <Cookie className="w-4 h-4" />
                Cookie Settings
              </button>
              <button
                onClick={() => setShowLicense(true)}
                className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-1"
              >
                <Scale className="w-4 h-4" />
                License
              </button>
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
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm w-full h-full flex items-center justify-center"
          open
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#1c2128] border border-[#30363d] rounded-xl p-6 w-full max-w-2xl relative overflow-hidden"
          >
            {/* Animated background effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/10 to-blue-500/10" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
              
              {/* Grid pattern overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            <div className="relative z-10">
              {/* Header with floating elements */}
              <div className="flex justify-between items-center mb-8">
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="p-2 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg backdrop-blur-sm">
                    <Scale className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">MIT License</h2>
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

              {/* License content with animated sections */}
              <div className="prose prose-invert max-w-none">
                <motion.div 
                  className="space-y-6 text-white/80 font-mono text-sm"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
                    <p className="text-purple-400">Copyright (c) 2025 Niladri Das</p>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
                    <p>
                      Permission is hereby granted, free of charge, to any person obtaining a copy
                      of this software and associated documentation files (the "Software"), to deal
                      in the Software without restriction, including without limitation the rights
                      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                      copies of the Software, and to permit persons to whom the Software is
                      furnished to do so, subject to the following conditions:
                    </p>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
                    <p>
                      The above copyright notice and this permission notice shall be included in all
                      copies or substantial portions of the Software.
                    </p>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
                    <p>
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
                className="mt-8 pt-6 border-t border-[#30363d]"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={() => setShowLicense(false)}
                  className="w-full relative group overflow-hidden rounded-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 transition-transform group-hover:scale-105" />
                  <div className="relative px-4 py-3 bg-black/20 backdrop-blur-sm text-white font-medium">
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
