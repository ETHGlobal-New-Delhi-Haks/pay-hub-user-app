import { Box, Button, Sheet } from '@mui/joy';
import { AppBar } from '../../components/AppBar';
import { BalanceCard } from './BalanceCard';
import { Settings } from 'lucide-react';

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
          <Box onClick={() => navigate('#/settings')}>
            <Settings color='#fff'/>
          </Box>
        }
      />

      <Box>
        <Box sx={{ display: 'flex', gap: 1, m: 2 }}>
          <Button onClick={() => navigate('#/payment')} variant="soft">
            Pay
          </Button>
        </Box>
      </Box>
    </Sheet>
  );
}
