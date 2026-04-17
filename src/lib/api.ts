import axios from 'axios';
import { getAccess, getRefresh, setTokens, clearTokens } from './auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = getAccess();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refresh = getRefresh();
      if (!refresh) {
        clearTokens();
        window.location.href = '/sign-in';
        return Promise.reject(error);
      }
      try {
        const { data } = await axios.post(`${BASE_URL}/api/auth/token/refresh/`, { refresh });
        setTokens(data.access, refresh);
        original.headers.Authorization = `Bearer ${data.access}`;
        return api(original);
      } catch {
        clearTokens();
        window.location.href = '/sign-in';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
