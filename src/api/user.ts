import { useQuery } from '@tanstack/react-query';
import axiosInstance from './axios';

export const useFetchUser = () =>
  useQuery({
    queryKey: ['/users/me`'],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get('/users/me', {
          headers: {
            'Authorization':`Bearer ${localStorage.getItem('access_token')}`
          }
        });

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    initialData: {
      data: [],
    },
  });
