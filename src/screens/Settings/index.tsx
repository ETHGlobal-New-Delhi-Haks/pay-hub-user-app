import { Card, Sheet, Typography } from '@mui/joy';
import { AppBar } from '../../components/AppBar';

type Props = {
  onBack: VoidFunction;
};

export function SettingsPage({ onBack }: Props) {
  return (
    <Sheet sx={{ minHeight: '100dvh' }}>
      <AppBar title="Your wallet" isHome={false} onBack={onBack} />
      <Card sx={{ m: 2, p: 2, borderRadius: 16 }}>
        <Typography level="title-md" sx={{ mb: 1 }}>
          Settings
        </Typography>
      </Card>
    </Sheet>
  );
}
