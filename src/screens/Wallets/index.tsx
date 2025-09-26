import { Sheet, Card, Typography, Button, Box } from '@mui/joy';
import { AppBar } from '../../components/AppBar';

type Props = {
  onBack: VoidFunction;
  toAddWallet: VoidFunction;
};

export function WalletsPage({ onBack, toAddWallet }: Props) {
  return (
    <Sheet sx={{ minHeight: '100dvh' }}>
      <AppBar title="Wallet" onBack={onBack} right={<Box />} />
      <Card sx={{ m: 2, p: 3, borderRadius: 16 }}>
        <Typography level="h4">Don't have active wallets yet</Typography>

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
