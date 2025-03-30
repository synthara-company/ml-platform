import { CookieSettings } from '../types/cookies';

export const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
};

export const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

export const applyConsentedCookies = (settings: CookieSettings) => {
  // Essential cookies (always set)
  setCookie('session_id', 'essential', 365);
  
  // Analytics cookies
  if (settings.analytics) {
    setCookie('analytics_enabled', 'true', 365);
    // Initialize analytics here
  } else {
    deleteCookie('analytics_enabled');
  }
  
  // Preference cookies
  if (settings.preferences) {
    setCookie('preferences_enabled', 'true', 365);
    // Set any user preference cookies
  } else {
    deleteCookie('preferences_enabled');
  }
};