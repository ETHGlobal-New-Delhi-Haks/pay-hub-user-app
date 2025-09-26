import { Sheet, Card, Typography, Button, Box } from '@mui/joy';
import { AppBar } from '../../components/AppBar';

type Props = {
  onBack: VoidFunction;
};

export function PayPage({ onBack }: Props) {
  return (
    <Sheet sx={{ minHeight: '100dvh' }}>
      <AppBar title="Pay" onBack={onBack} right={<Box />} />
      <Card sx={{ m: 2, p: 3, borderRadius: 16 }}>
        <Typography level="h4">Choose the payment type</Typography>
        <Button
          fullWidth
          size="lg"
          sx={{
            py: 2,
            mt: 2,
            borderRadius: 'xl',
          }}
        >
          QR
        </Button>
        <Button
          fullWidth
          size="lg"
          sx={{
            py: 2,
            borderRadius: 'xl',
          }}
        >
          Bluetooth
        </Button>
      </Card>
    </Sheet>
  );
}
