// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const config = {
  API_BASE_URL,
  API_ENDPOINTS: {
    ask: `${API_BASE_URL}/api/ask`,
  }
}; 