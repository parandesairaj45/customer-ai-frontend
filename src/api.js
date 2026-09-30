import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

api.interceptors.request.use((config) => {
  // Ensure backend routes targeting /tickets or /auth have the mandatory /api prefix
  if (config.url && !config.url.startsWith('/api') && (config.url.startsWith('/tickets') || config.url.startsWith('/auth'))) {
    config.url = `/api${config.url}`;
  }
  const token = localStorage.getItem('token') || localStorage.getItem('resox_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
