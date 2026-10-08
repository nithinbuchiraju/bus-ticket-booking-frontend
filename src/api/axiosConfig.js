import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
});

// Attach the JWT (if the user is logged in) to every request
api.interceptors.request.use((config) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
  } catch {
    /* ignore bad localStorage data */
  }
  return config;
});

export function getErrorMessage(err) {
  return err?.response?.data?.message || 'Something went wrong. Please try again.';
}

export default api;
