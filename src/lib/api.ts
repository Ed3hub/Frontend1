import axios from 'axios';
import { getAccess, getRefresh, setTokens, clearTokens } from './auth';

const api = axios.create({
  // baseURL: 'http://localhost:8000/api', //local machine of the backend
  baseURL: 'https://dev-api.ed3hub.com/api',

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
        const { data } = await axios.post('https://dev-api.ed3hub.com/api/auth/token/refresh/', { refresh });
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
