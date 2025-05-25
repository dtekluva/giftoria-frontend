/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next/client';
import { jwtDecode } from 'jwt-decode';

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

// Add a response interceptor to handle token refresh
httpConfig.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const accessToken = getCookie('access_token') as string;
    const originalRequest = error.config;

    // Check if the error is due to an expired token
    if (accessToken && isTokenExpired(accessToken)) {
      try {
        // Attempt to refresh the token
        const refreshToken = getCookie('refresh_token') as string;
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}auth/token/refresh`,
          {
            refresh: refreshToken,
          }
        );

        const newAccessToken = response.data.access;

        // Update cookies and retry the original request
        setCookie('access_token', newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return httpConfig(originalRequest); // Retry the original request
      } catch (refreshError) {
        // Handle refresh token failure (e.g., redirect to login)
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // Reject other errors
  }
);

function isTokenExpired(token: string): boolean {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch (e) {
    return true; // Treat malformed tokens as expired
  }
}
