import { Sheet, Card, Typography, Box } from '@mui/joy';
import { AppBar } from '../../components/AppBar';

type Props = {
  onBack: VoidFunction;
  wallet: string;
};

export function WalletPage({ onBack, wallet }: Props) {
  return (
    <Sheet sx={{ minHeight: '100dvh' }}>
      <AppBar title="Wallet" onBack={onBack} right={<Box />} />
      <Card sx={{ m: 2, p: 3, borderRadius: 16 }}>
        <Typography level="h4">{wallet}</Typography>
      </Card>
    </Sheet>
  );
}
