import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings, Check, Ban, ChevronLeft } from 'lucide-react';
import { CookiePolicyModal } from './modals/CookiePolicyModal';

interface CookieSettings {
  essential: boolean;
  analytics: boolean;
  preferences: boolean;
}

export const CookieConsent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>({
    essential: true, // Essential cookies cannot be disabled
    analytics: true,
    preferences: true,
  });

  useEffect(() => {
    const checkAndShowConsent = () => {
      const userData = localStorage.getItem('userData');
      const cookieChoice = localStorage.getItem('cookieConsent');
      
      console.log('Checking consent:', { userData, cookieChoice });
      
      if (userData && !cookieChoice) {
        console.log('Showing cookie consent');
        setIsOpen(true);
      }
    };

    // Initial check
    checkAndShowConsent();

    const handleUserDataUpdate = () => {
      console.log('userDataUpdated event received');
      checkAndShowConsent();
    };

    window.addEventListener('userDataUpdated', handleUserDataUpdate);
    
    // Storage event listener
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'userData') {
        console.log('userData changed in storage');
        checkAndShowConsent();
      }
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('userDataUpdated', handleUserDataUpdate);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'all');
    localStorage.setItem('cookieSettings', JSON.stringify({
      essential: true,
      analytics: true,
      preferences: true,
    }));
    setIsOpen(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('cookieConsent', 'essential');
    localStorage.setItem('cookieSettings', JSON.stringify({
      essential: true,
      analytics: false,
      preferences: false,
    }));
    setIsOpen(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', 'custom');
    localStorage.setItem('cookieSettings', JSON.stringify(settings));
    setIsOpen(false);
  };

  const toggleSetting = (key: keyof CookieSettings) => {
    if (key === 'essential') return; // Essential cookies cannot be toggled
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const CustomizeView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setShowCustomize(false)}
          className="text-white/70 hover:text-white flex items-center gap-2 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <h2 className="text-xl font-semibold text-white">Cookie Settings</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="flex-1">
            <h3 className="text-white font-medium">Essential Cookies</h3>
            <p className="text-white/50 text-sm mt-1">Required for basic site functionality</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-amber-400 text-sm">Required</span>
            <input
              type="checkbox"
              checked={settings.essential}
              disabled
              className="h-5 w-5 rounded border-white/20 bg-white/5 checked:bg-amber-400"
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="flex-1">
            <h3 className="text-white font-medium">Analytics Cookies</h3>
            <p className="text-white/50 text-sm mt-1">Help us improve our website</p>
          </div>
          <input
            type="checkbox"
            checked={settings.analytics}
            onChange={() => toggleSetting('analytics')}
            className="h-5 w-5 rounded border-white/20 bg-white/5 checked:bg-primary"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="flex-1">
            <h3 className="text-white font-medium">Preference Cookies</h3>
            <p className="text-white/50 text-sm mt-1">Remember your settings and preferences</p>
          </div>
          <input
            type="checkbox"
            checked={settings.preferences}
            onChange={() => toggleSetting('preferences')}
            className="h-5 w-5 rounded border-white/20 bg-white/5 checked:bg-primary"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <button
          onClick={handleSavePreferences}
          className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          Save Preferences
        </button>
        <button
          onClick={() => setShowPolicy(true)}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
        >
          Learn More
        </button>
      </div>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-surface"
          >
            <div className="max-w-7xl mx-auto">
              <div className="relative backdrop-blur-xl bg-white/5 p-6 rounded-2xl border border-white/10 shadow-2xl">
                {!showCustomize ? (
                  <div className="flex items-start gap-4">
                    <Cookie className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-white mb-2">Cookie Preferences</h2>
                      <p className="text-gray-300 text-sm mb-4">
                        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                        Please select your cookie preferences.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={handleAcceptAll}
                          className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Accept All
                        </button>
                        <button
                          onClick={handleRejectAll}
                          className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                          <Ban className="w-4 h-4" />
                          Reject All
                        </button>
                        <button
                          onClick={() => setShowCustomize(true)}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                          <Settings className="w-4 h-4" />
                          Customize
                        </button>
                        <button
                          onClick={() => setShowPolicy(true)}
                          className="text-sm text-primary hover:text-primary/80 underline"
                        >
                          View Cookie Policy
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <CustomizeView />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CookiePolicyModal 
        isOpen={showPolicy} 
        onClose={() => setShowPolicy(false)} 
      />
    </>
  );
};
