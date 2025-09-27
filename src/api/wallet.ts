import { useQuery } from '@tanstack/react-query';
import axiosInstance from './axios';

type MyWalletsApi = {
  data: {
    id: 3;
    attributes: {
      address: '0x2613336961Db33f76425260B99E8f23f37eB8BcE';
      createdAt: '2025-09-27T10:46:25.730Z';
      updatedAt: '2025-09-27T10:46:25.730Z';
      type: 'evm';
    };
  }[];
};

export const useFetchMyWallets = () =>
  useQuery({
    queryKey: ['/wallets/my'],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get<MyWalletsApi>('/wallets/my');

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    initialData: {
      data: [],
    },
  });
