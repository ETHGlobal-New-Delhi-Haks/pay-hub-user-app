import { Box, Button, Sheet } from '@mui/joy';
import { AppBar } from '../../components/AppBar';
import { BalanceCard } from './BalanceCard';

type Props = {
  navigate: (to: string) => void;
};

export function MainPage({ navigate }: Props) {
  return (
    <Sheet sx={{ minHeight: '100dvh' }}>
      <AppBar
        content={<BalanceCard />}
        isHome
        right={<Button onClick={() => navigate('#/settings')}>Setting</Button>}
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
