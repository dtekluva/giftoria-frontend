import { getCookie } from 'cookies-next/client';
import axios from 'axios';

export const httpConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpConfig.interceptors.request.use(async (config) => {
  const accessToken = getCookie('access_token') as string;

  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  }

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});
