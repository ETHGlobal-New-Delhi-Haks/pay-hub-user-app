import { Sheet, Card, Typography, Button } from '@mui/joy';
import { AppBar } from '../../components/AppBar';

type Props = {
  onBack: VoidFunction;
};

export function PaymentType({ onBack }: Props) {
  return (
    <Sheet sx={{ minHeight: '100dvh' }}>
      <AppBar
        title="Payment"
        onBack={onBack}
        right={
          <Button size="sm" onClick={onBack}>
            Back
          </Button>
        }
      />
      <Card sx={{ m: 2, p: 3, borderRadius: 16 }}>
        <Typography level="h4">Select payment type</Typography>
      </Card>
    </Sheet>
  );
}
