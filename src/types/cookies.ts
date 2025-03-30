export interface CookieSettings {
  essential: boolean;
  analytics: boolean;
  preferences: boolean;
  userId?: string;
  timestamp?: number;
}

export interface CookieResponse {
  success: boolean;
  message: string;
  data?: CookieSettings;
}

export type CookieConsentType = 'all' | 'essential' | 'custom' | null;