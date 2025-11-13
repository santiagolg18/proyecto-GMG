import type { CMSData } from "@/types/cms";

const CMS_API_URL = import.meta.env.VITE_CMS_API_URL || '';
const TIMEOUT_MS = 10000; // 10 second timeout

/**
 * Fetches CMS data from Google Sheets via Google Apps Script endpoint
 * @returns Promise with services and settings data
 */
export async function fetchCMSData(): Promise<CMSData> {
  if (!CMS_API_URL) {
    console.warn('VITE_CMS_API_URL is not configured. Using fallback data.');
    throw new Error('CMS API URL not configured');
  }

  try {
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const response = await fetch(CMS_API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal,
      // Add cache control to respect browser cache
      cache: 'default',
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch CMS data: ${response.statusText}`);
    }

    const data: CMSData = await response.json();

    // Validate that we have the expected structure
    if (!data.services || !data.settings) {
      throw new Error('Invalid CMS data structure');
    }

    console.log('✅ CMS data loaded successfully:', {
      services: data.services?.length || 0,
      settings: Object.keys(data.settings || {}).length
    });

    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('⏱️ CMS request timed out after', TIMEOUT_MS, 'ms');
      throw new Error('Request timeout - using fallback data');
    }
    console.error('❌ Error fetching CMS data:', error);
    throw error;
  }
}

/**
 * Helper function to get a specific setting value
 * @param settings Settings object from CMS
 * @param key Setting key to retrieve
 * @param defaultValue Default value if setting not found
 * @returns Setting value or default
 */
export function getSetting(
  settings: Record<string, string | undefined>,
  key: string,
  defaultValue: string = ''
): string {
  return settings[key] || defaultValue;
}
