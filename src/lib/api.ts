import axios from 'axios';

import axiosInstance from '@/lib/axiosConfig';

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const api = async <T>(
  url: string,
  method: HTTPMethod,
  data?: unknown,
  params?: Record<string, unknown>,
): Promise<T> => {
  try {
    const response = await axiosInstance({
      url,
      method,
      data,
      params,
    });
    return response.data as T;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error(String(error));
  }
};

api.get = <T>(url: string, params?: Record<string, unknown>) =>
  api<T>(url, 'GET', undefined, params);

api.post = <T>(url: string, data?: unknown, params?: Record<string, unknown>) =>
  api<T>(url, 'POST', data, params);

api.put = <T>(url: string, data?: unknown, params?: Record<string, unknown>) =>
  api<T>(url, 'PUT', data, params);

api.delete = <T>(url: string, params?: Record<string, unknown>) =>
  api<T>(url, 'DELETE', undefined, params);

export default api;
