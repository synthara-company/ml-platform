import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cookie, Check, Shield, Settings } from 'lucide-react';
import { useCookieConsent } from '../../hooks/useCookieConsent';

export const CookieSettings: React.FC = () => {
  const { cookieSettings, saveCookiePreferences } = useCookieConsent();
  const [settings, setSettings] = useState(cookieSettings);

  useEffect(() => {
    setSettings(cookieSettings);
  }, [cookieSettings]);

  const handleSave = async () => {
    await saveCookiePreferences(settings);
    // Show success message or redirect
  };

  const toggleSetting = (key: keyof typeof settings) => {
    if (key === 'essential') return;
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen bg-[#1c2128] text-white p-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-4">
            <Cookie className="w-8 h-8 text-amber-400" />
            <h1 className="text-3xl font-bold">Cookie Settings</h1>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <p className="text-gray-300">
              Manage your cookie preferences below. Essential cookies are required for basic site functionality
              and cannot be disabled. You can modify other cookie types based on your preferences.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-6 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-amber-400 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold">Essential Cookies</h3>
                  <p className="text-gray-300 text-sm mt-1">Required for basic site functionality</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.essential}
                disabled
                className="h-5 w-5 rounded border-white/20 bg-white/5 checked:bg-amber-400"
              />
            </div>

            <div className="flex items-center justify-between p-6 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <Settings className="w-6 h-6 text-blue-400 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold">Analytics Cookies</h3>
                  <p className="text-gray-300 text-sm mt-1">Help us improve our website</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.analytics}
                onChange={() => toggleSetting('analytics')}
                className="h-5 w-5 rounded border-white/20 bg-white/5 checked:bg-primary"
              />
            </div>

            <div className="flex items-center justify-between p-6 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <Cookie className="w-6 h-6 text-purple-400 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold">Preference Cookies</h3>
                  <p className="text-gray-300 text-sm mt-1">Remember your settings and preferences</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.preferences}
                onChange={() => toggleSetting('preferences')}
                className="h-5 w-5 rounded border-white/20 bg-white/5 checked:bg-primary"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Save Preferences
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};