/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Sheet,
  Card,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  IconButton,
  ListItemDecorator,
  ListItemContent,
  Divider,
  Skeleton,
  Select,
  Option,
} from '@mui/joy';
import { AppBar } from '../../components/AppBar';
import { useAppKitAccount } from '@reown/appkit/react';
import { EtherIcon } from '../../components/Icons/Ether';
import { shortText } from '../../utils/text';
import { ChevronRight, RefreshCcw } from 'lucide-react';
import { useAddWallet } from '../AddWallet/hooks';
import { useFetchBalances } from '../../api/balance';
import { ArbitrumIcon } from '../../components/Icons/Arbitrum';
import { PolygonIcon } from '../../components/Icons/Polygon';
import BigNumber from 'bignumber.js';
import { useState } from 'react';
import { fromWei } from '../../utils/wei';
import { SolanaIcon } from '../../components/Icons/Solana';

type Props = {
  onBack: VoidFunction;
  toAddWallet: VoidFunction;
  onWalletSelect: (wallet: string, chain: string) => void;
};

const iconMap = {
  1: <EtherIcon />,
  137: <PolygonIcon />,
  42161: <ArbitrumIcon />,
  // solana: <SolanaIcon />,
};

export function WalletsPage({ onBack, toAddWallet, onWalletSelect }: Props) {
  useAddWallet();
  const [isRotating, setIsRotating] = useState(false);
  const { allAccounts, isConnected } = useAppKitAccount();
  const { data, isFetched, refetch } = useFetchBalances();
  const [currentChain, setCurrentChain] = useState('1');

  const handleChange = (_: unknown, newValue: string | null) => {
    if (newValue) {
      setCurrentChain(newValue);
    }
  };

  const handleRefresh = () => {
    setIsRotating(true);
    refetch();

    setTimeout(() => {
      setIsRotating(false);
    }, 300);
  };

  return (
    <Sheet sx={{ minHeight: '100dvh' }}>
      <AppBar title="Wallet" onBack={onBack} right={<Box />} />
      <Box sx={{ overflow: 'scroll', height: 'calc(100vh - 68px)' }}>
        <Card sx={{ m: 2, px: 1, py: 3, borderRadius: 16 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography level="h4">Select blockchain</Typography>
            <Box onClick={handleRefresh}>
              <RefreshCcw
                style={{
                  transform: isRotating ? 'rotate(360deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease-in-out',
                }}
              />
            </Box>
          </Box>
          <Select defaultValue="1" onChange={handleChange}>
            <Option value="1">
              <EtherIcon /> Ethereum
            </Option>
            <Option value="137">
              <PolygonIcon /> Polygon
            </Option>
            <Option value="42161">
              <ArbitrumIcon /> Arbitrum
            </Option>
            <Option value="cat">
              <SolanaIcon />
              Solana
            </Option>
          </Select>
          {(!allAccounts?.length && isConnected) ||
          (isFetched && data && !Object.values(data).length) ? (
            <Typography mt={2}>Don't have active wallets yet</Typography>
          ) : null}
          {isFetched && data ? (
            <List size="lg" sx={{ '--ListItemDecorator-size': '36px' }}>
              {Object.entries(data).map(([wallet, config]) =>
                Object.entries(config).map(([chain, tokens]) => {
                  if (+currentChain !== +chain) {
                    return;
                  }

                  const totalBalance = Object.values(tokens).reduce(
                    (prev, acc) =>
                      prev.plus(
                        BigNumber(
                          fromWei(acc?.balance, acc.data.decimals)
                        ).multipliedBy(acc.data.priceUSD || 0)
                      ),
                    BigNumber(0)
                  );

                  return (
                    <ListItem
                      key={wallet}
                      sx={{
                        borderRadius: 'md',
                      }}
                      endAction={
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            size="sm"
                            variant="soft"
                            onClick={() => onWalletSelect(wallet, chain)}
                          >
                            <ChevronRight size={16} />
                          </IconButton>
                        </Box>
                      }
                    >
                      {/* @ts-ignore */}
                      <ListItemDecorator>{iconMap?.[chain]}</ListItemDecorator>
                      <ListItemContent>
                        <Typography fontWeight="md" level="body-lg" noWrap>
                          {shortText(wallet)}
                        </Typography>
                      </ListItemContent>
                      <ListItemContent>
                        <Typography>~{totalBalance.toFixed(2)}$</Typography>
                      </ListItemContent>
                    </ListItem>
                  );
                })
              )}
            </List>
          ) : (
            <List size="lg" sx={{ '--ListItemDecorator-size': '36px' }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <ListItem
                  key={i}
                  sx={{
                    borderRadius: 'md',
                  }}
                >
                  <Skeleton height={27} variant="rectangular"></Skeleton>
                </ListItem>
              ))}
            </List>
          )}
          <Divider sx={{ my: 2 }} />
          <Button
            onClick={toAddWallet}
            sx={{ width: 'fit-content', mt: 3 }}
            size="lg"
          >
            Add wallet
          </Button>
        </Card>
      </Box>
    </Sheet>
  );
}
