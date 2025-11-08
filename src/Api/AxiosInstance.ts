import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true 
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

AxiosInstance.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;
    console.error(`HTTP ${status}: ${message}`);
    return Promise.reject({
      status,
      message,
      data: error.response?.data
    });
  }
);

export default AxiosInstance;
