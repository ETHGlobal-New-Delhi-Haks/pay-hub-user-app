import axiosInstance from '../../api/axios';
import { useAppKitAccount } from '@reown/appkit/react';
import { useEffect } from 'react';
import { useFetchMyWallets } from '../../api/wallet';

const addWallet = async (wallet: {
  type: 'evm' | 'solana';
  wallet: string;
}) => {
  try {
    await axiosInstance.post('/wallets/add', wallet);
  } catch (error) {
    console.log(error);
  }
};

export const useAddWallet = () => {
  const { isFetched, data } = useFetchMyWallets();
  const { allAccounts } = useAppKitAccount();

  useEffect(() => {
    const newAddress = allAccounts.find(
      (acc) =>
        !data?.data
          ?.map((w) => w.attributes.address.toLowerCase())
          .includes(acc.address.toLowerCase())
    );

    if (newAddress) {
      void addWallet({
        type: newAddress.namespace === 'solana' ? newAddress.namespace : 'evm',
        wallet: newAddress.address,
      });
    }
  }, [allAccounts.length, isFetched, data?.data?.length]);
};
