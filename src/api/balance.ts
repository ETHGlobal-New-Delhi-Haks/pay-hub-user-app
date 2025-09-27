import { useQuery } from '@tanstack/react-query';
import axiosInstance from './axios';

type BalanceApi = Record<
  string,
  Record<
    number,
    Record<
      string,
      {
        balance: '0';
        data: {
          id: 1;
          address: '0xc3d688b66703497daa19211eedff47f25384cdc3';
          name: 'Compound USDC';
          decimals: 6;
          symbol: 'cUSDCv3';
          logoURI: 'https://tokens.1inch.io/0xc3d688b66703497daa19211eedff47f25384cdc3.png';
          createdAt: '2025-09-27T08:53:19.612Z';
          updatedAt: '2025-09-27T08:53:19.612Z';
          priceUSD: 0.07994;
          blockchain: {
            id: 1;
            chain: 1;
            name: 'Ethereum';
            createdAt: '2025-09-27T08:42:16.432Z';
            updatedAt: '2025-09-27T08:42:16.432Z';
          };
        };
      }
    >
  >
>;

export const useFetchBalances = () =>
  useQuery({
    queryKey: ['wallets/balances'],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get<BalanceApi>(
          'wallets/balances'
        );

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    initialData: {},
  });
