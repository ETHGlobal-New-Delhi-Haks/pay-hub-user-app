import { Sheet, Card, Typography, Button, Box } from '@mui/joy';
import { AppBar } from '../../components/AppBar';
import { useState } from 'react';

type Props = {
  onBack: VoidFunction;
  onWalletSelect: (wallet: string) => void;
};

export function AddWalletPage({ onBack, onWalletSelect }: Props) {
  const [activeStep] = useState('network');

  return (
    <Sheet sx={{ minHeight: '100dvh' }}>
      <AppBar title="Add wallet" onBack={onBack} right={<Box />} />
      {activeStep === 'network' && (
        <Card sx={{ m: 2, p: 3, borderRadius: 16 }}>
          <Typography level="h4">Select blockchain</Typography>
          <Button
            fullWidth
            size="lg"
            sx={{
              py: 2,
              mt: 2,
              borderRadius: 'xl',
            }}
            onClick={() => onWalletSelect('0xasdh827r9823or2l3rl')}
          >0xasdh827r9823or2l3rl</Button>
        </Card>
      )}
    </Sheet>
  );
}
