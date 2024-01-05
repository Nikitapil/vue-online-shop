import axios from 'axios';
import { getTokenFromStorage, setTokenToStorage } from '@/helpers/token-helpers';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getTokenFromStorage()}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      // eslint-disable-next-line no-underscore-dangle
      !error.config._isRetry
    ) {
      try {
        // eslint-disable-next-line no-underscore-dangle
        originalRequest._isRetry = true;
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`, {
          withCredentials: true
        });
        setTokenToStorage(response.data.accessToken);
        return await axiosInstance.request(originalRequest);
      } catch (e) {
        throw error;
      }
    }
    throw error;
  }
);

export default axiosInstance;
