import { useState, useEffect } from 'react';
import { CookieSettings, CookieConsentType } from '../types/cookies';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const useCookieConsent = () => {
  const [cookieConsent, setCookieConsent] = useState<CookieConsentType>(null);
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
    essential: true,
    analytics: false,
    preferences: false,
  });

  const saveCookiePreferences = async (settings: CookieSettings) => {
    try {
      const userId = localStorage.getItem('userId') || 'anonymous';
      
      const response = await fetch(`${API_URL}/cookie-preferences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...settings,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save cookie preferences');
      }

      localStorage.setItem('cookieConsent', 'custom');
      localStorage.setItem('cookieSettings', JSON.stringify(settings));
      
      setCookieSettings(settings);
      setCookieConsent('custom');

      // Dispatch event for other components
      window.dispatchEvent(new Event('cookiePreferencesUpdated'));
      
      return true;
    } catch (error) {
      console.error('Error saving cookie preferences:', error);
      return false;
    }
  };

  const loadCookiePreferences = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const localConsent = localStorage.getItem('cookieConsent') as CookieConsentType;
      const localSettings = localStorage.getItem('cookieSettings');

      // If we have local settings, use them first
      if (localConsent && localSettings) {
        setCookieConsent(localConsent);
        setCookieSettings(JSON.parse(localSettings));
        return;
      }

      // Only try to fetch from server if we have a userId and no local settings
      if (userId) {
        const response = await fetch(`${API_URL}/cookie-preferences/${userId}`);
        
        if (response.ok) {
          const { data } = await response.json();
          setCookieSettings(data);
          setCookieConsent('custom');
          
          // Store in localStorage to prevent future unnecessary fetches
          localStorage.setItem('cookieConsent', 'custom');
          localStorage.setItem('cookieSettings', JSON.stringify(data));
        }
      }
    } catch (error) {
      console.error('Error loading cookie preferences:', error);
    }
  };

  const resetCookiePreferences = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      await fetch(`${API_URL}/cookie-preferences/${userId}`, {
        method: 'DELETE'
      });

      localStorage.removeItem('cookieConsent');
      localStorage.removeItem('cookieSettings');
      
      setCookieSettings({
        essential: true,
        analytics: false,
        preferences: false,
      });
      setCookieConsent(null);
      
      return true;
    } catch (error) {
      console.error('Error resetting cookie preferences:', error);
      return false;
    }
  };

  const isAllowed = (cookieType: keyof CookieSettings): boolean => {
    if (!cookieConsent) return false;
    if (cookieType === 'essential') return true;
    return cookieSettings[cookieType] || false;
  };

  useEffect(() => {
    loadCookiePreferences();
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cookieSettings' || e.key === 'cookieConsent') {
        loadCookiePreferences();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    cookieConsent,
    cookieSettings,
    isAllowed,
    saveCookiePreferences,
    resetCookiePreferences,
  };
};
