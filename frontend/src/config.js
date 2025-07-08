// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://agent-os-two.vercel.app';

// Debug logging
console.log('API Configuration:', {
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  API_BASE_URL: API_BASE_URL,
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV
});

export const config = {
  API_BASE_URL,
  API_ENDPOINTS: {
    ask: `${API_BASE_URL}/api/ask`,
    test: `${API_BASE_URL}/api/test`,
    health: `${API_BASE_URL}/api/health`,
  }
}; 