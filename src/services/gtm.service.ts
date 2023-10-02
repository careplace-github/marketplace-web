declare global {
  interface Window {
    dataLayer: any[];
  }
}

import { getCookie, setCookie } from '../utils/localStorage'; // Update the path as needed

export function setUserLoginEvent() {
  // Check if user has already logged in today
  const lastLoginDate = getCookie('lastLoginDate');
  const today = new Date().toISOString().split('T')[0]; // Get today's date

  if (lastLoginDate !== today) {
    // User hasn't logged in today, log event
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'userLogin' });

    // Set a cookie to mark today's login
    setCookie('lastLoginDate', today, 1); // Cookie expires in 1 day
  }
}
