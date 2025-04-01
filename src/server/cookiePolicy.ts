/**
 * Cookie Policy Router
 * Handles all cookie-related API endpoints including:
 * - Getting/Setting cookie preferences
 * - Managing user consent
 * - Admin operations
 */

import express from 'express';
import { z } from 'zod';
import { CookieSettings } from '../types/cookies';

const cookiePolicyRouter = express.Router();

/**
 * Cookie Settings Schema
 * Validates incoming cookie preference data
 * @property {boolean} essential - Required cookies that cannot be disabled
 * @property {boolean} analytics - Analytics and tracking cookies
 * @property {boolean} preferences - User preference cookies
 * @property {string} userId - Unique identifier for the user
 * @property {number} timestamp - When preferences were last updated
 */
const CookieSettingsSchema = z.object({
  essential: z.boolean(),
  analytics: z.boolean(),
  preferences: z.boolean(),
  userId: z.string(),
  timestamp: z.number().optional().default(() => Date.now())
});

// In-memory store (replace with database in production)
const cookiePreferences = new Map<string, CookieSettings>();

/**
 * GET /cookie-preferences
 * Admin endpoint to retrieve all cookie preferences
 * @returns {Object} JSON response with all user preferences
 */
cookiePolicyRouter.get('/cookie-preferences', async (_req, res) => {
  const allPreferences = Array.from(cookiePreferences.values());
  res.status(200).json({
    success: true,
    data: allPreferences
  });
});

/**
 * POST /cookie-preferences
 * Save or update user cookie preferences
 * @body {CookieSettings} Cookie preference settings
 * @returns {Object} Success/failure response
 */
cookiePolicyRouter.post('/cookie-preferences', async (req, res) => {
  try {
    const settings = CookieSettingsSchema.parse({
      ...req.body,
      timestamp: Date.now()
    });
    
    cookiePreferences.set(settings.userId, settings);
    
    res.status(200).json({
      success: true,
      message: 'Cookie preferences saved'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid cookie preferences data'
    });
  }
});

// Get specific user cookie preferences
cookiePolicyRouter.get('/cookie-preferences/:userId', (req, res) => {
  const settings = cookiePreferences.get(req.params.userId);
  
  if (!settings) {
    return res.status(404).json({
      success: false,
      message: 'Cookie preferences not found'
    });
  }
  
  res.status(200).json({
    success: true,
    data: settings
  });
});

// Delete cookie preferences
cookiePolicyRouter.delete('/cookie-preferences/:userId', (req, res) => {
  const deleted = cookiePreferences.delete(req.params.userId);
  
  res.status(200).json({
    success: deleted,
    message: deleted ? 'Cookie preferences deleted' : 'Cookie preferences not found'
  });
});

export default cookiePolicyRouter;
