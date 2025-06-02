import api from '@/lib/api';
import { useMutation } from '@tanstack/react-query';

export const useRegister = () => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: (payload: { username: string; phone: string; password: string }) => {
      const response = api.post(`/api/auth/register`, payload);

      return response;
    },
    meta: {
      successMessage: '',
      errorMessage: '',
    },
  });
};
