import { Box, Button, Sheet, Typography } from '@mui/joy';
import { AppBar } from '../../components/AppBar';
import { BalanceCard } from './BalanceCard';
import { Coins, Settings, Wallet } from 'lucide-react';
import theme from '../../theme';

type Props = {
  navigate: (to: string) => void;
};

export function MainPage({ navigate }: Props) {
  return (
    <Sheet sx={{ minHeight: '100dvh' }}>
      <AppBar
        content={<BalanceCard />}
        isHome
        right={
          <Box onClick={() => navigate('settings')}>
            <Settings color="#fff" />
          </Box>
        }
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 3, px: 2 }}>
        <Button
          onClick={() => navigate('payment')}
          fullWidth
          sx={{
            borderRadius: 'xl',
          }}
        >
          <Box
            sx={{
              py: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              alignItems: 'center',
            }}
          >
            <Coins size={50} />

            <Typography sx={{ color: theme.palette.common.white }} level="h3">
              Pay
            </Typography>
          </Box>
        </Button>
        <Button
          onClick={() => navigate('wallet')}
          fullWidth
          sx={{
            borderRadius: 'xl',
          }}
        >
          <Box
            sx={{
              py: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              alignItems: 'center',
            }}
          >
            <Wallet size={50} />
            <Typography sx={{ color: theme.palette.common.white }} level="h3">
              Add Wallet
            </Typography>
          </Box>
        </Button>
      </Box>
    </Sheet>
  );
}
