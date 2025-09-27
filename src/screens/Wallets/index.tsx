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
} from '@mui/joy';
import { AppBar } from '../../components/AppBar';
import { useAppKitAccount } from '@reown/appkit/react';
import { EtherIcon } from '../../components/Icons/Ether';
import { shortText } from '../../utils/text';
import { ChevronRight } from 'lucide-react';
import { useAddWallet } from '../AddWallet/hooks';
import { useFetchBalances } from '../../api/balance';
import { ArbitrumIcon } from '../../components/Icons/Arbitrum';
import { PolygonIcon } from '../../components/Icons/Polygon';
import BigNumber from 'bignumber.js';

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
  const { allAccounts, isConnected } = useAppKitAccount();
  const { data, isFetched } = useFetchBalances();

  return (
    <Sheet sx={{ minHeight: '100dvh' }}>
      <AppBar title="Wallet" onBack={onBack} right={<Box />} />
      <Card sx={{ m: 2, px: 1, py: 3, borderRadius: 16 }}>
        {!allAccounts?.length && isConnected ? (
          <Typography level="h4">Don't have active wallets yet</Typography>
        ) : null}
        {isFetched && data ? (
          <List size="lg" sx={{ '--ListItemDecorator-size': '36px' }}>
            {Object.entries(data).map(([wallet, config]) =>
              Object.entries(config).map(([chain, tokens]) => {

                const totalBalance = Object.values(tokens).reduce(
                  (prev, acc) =>
                    prev.plus(
                      BigNumber(acc.balance).multipliedBy(
                        acc.data.priceUSD || 0
                      )
                    ),
                  BigNumber(0)
                );

                return (
                  <ListItem
                    key={wallet}
                    sx={{
                      borderRadius: 'md',
                      '&:hover': {
                        bgcolor: 'background.level2',
                        cursor: 'pointer',
                      },
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
                      <Typography>~{totalBalance.toFormat()}$</Typography>
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
                  '&:hover': {
                    bgcolor: 'background.level2',
                    cursor: 'pointer',
                  },
                }}
              >
                <Skeleton height={27} variant='rectangular'></Skeleton>
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
    </Sheet>
  );
}
