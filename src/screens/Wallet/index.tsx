import { Sheet, Card, Typography } from '@mui/joy';
import { AppBar } from '../../components/AppBar';
import { Box } from 'lucide-react';

type Props = {
  onBack: VoidFunction;
};

export function WalletPage({ onBack }: Props) {
  return (
    <Sheet sx={{ minHeight: '100dvh' }}>
      <AppBar title="Payment" onBack={onBack} right={<Box />} />
      <Card sx={{ m: 2, p: 3, borderRadius: 16 }}>
        <Typography level="h4">Add wallet</Typography>
      </Card>
    </Sheet>
  );
}
