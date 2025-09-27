import {
  Sheet,
  Card,
  Typography,
  Box,
  List,
  ListItem,
  IconButton,
  ListItemDecorator,
  ListItemContent,
  Skeleton,
} from '@mui/joy';
import { AppBar } from '../../components/AppBar';
import { shortText } from '../../utils/text';
import { useFetchBalances } from '../../api/balance';
import { ChevronRight } from 'lucide-react';
import BigNumber from 'bignumber.js';

type Props = {
  onBack: VoidFunction;
  wallet: string;
  chain: string;
};

export function WalletPage({ onBack, wallet, chain }: Props) {
  console.log(wallet, 'wallet');
  const { data, isFetched } = useFetchBalances();
  return (
    <Sheet sx={{ minHeight: '100dvh' }}>
      <AppBar title="Wallet" onBack={onBack} right={<Box />} />
      <Box sx={{ overflow: 'scroll', height: 'calc(100vh - 68px)' }}>
        <Card
          sx={{
            m: 2,
            p: 3,
            borderRadius: 16,
          }}
        >
          <Typography level="h4">{shortText(wallet)}</Typography>

          <List size="lg" sx={{ '--ListItemDecorator-size': '36px' }}>
            {isFetched ? (
              Object.values(data?.[wallet][+chain] || {})?.map((token) => {
                if (!BigNumber(token?.balance).isGreaterThan(0)) {
                  return;
                }
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
                        <IconButton size="sm" variant="soft">
                          <ChevronRight size={16} />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemDecorator>
                      <img
                        src={token?.data.logoURI}
                        alt=""
                        style={{ width: 24, height: 24 }}
                      />
                    </ListItemDecorator>
                    <ListItemContent>
                      <Typography fontWeight="md" level="body-lg" noWrap>
                        {shortText(token?.data.address)}
                      </Typography>
                    </ListItemContent>
                    <ListItemContent>
                      <Typography>
                        ~
                        {BigNumber(token?.balance)
                          .multipliedBy(token?.data.priceUSD)
                          .toFormat()}
                        $
                      </Typography>
                    </ListItemContent>
                  </ListItem>
                );
              })
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
                    <Skeleton height={27} variant="rectangular"></Skeleton>
                  </ListItem>
                ))}
              </List>
            )}
          </List>
        </Card>
      </Box>
    </Sheet>
  );
}
