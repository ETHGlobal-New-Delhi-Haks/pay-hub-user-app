import { Sheet, Card, Typography, Button, Box } from '@mui/joy';
import { AppBar } from '../../components/AppBar';
import { useAppKit } from '@reown/appkit/react';
import { EtherIcon } from '../../components/Icons/Ether';
import { SolanaIcon } from '../../components/Icons/Solana';
import { FlowIcon } from '../../components/Icons/Flow';

type Props = {
  onBack: VoidFunction;
};

export function AddWalletPage({ onBack }: Props) {
  const { open } = useAppKit();

  return (
    <Sheet sx={{ minHeight: '100dvh' }}>
      <AppBar title="Add wallet" onBack={onBack} right={<Box />} />

      <Card sx={{ m: 2, p: 3, borderRadius: 16 }}>
        <Typography level="h4">Select blockchain</Typography>
        <Button
          fullWidth
          size="lg"
          variant="outlined"
          sx={{
            py: 2,
            mt: 2,
            borderRadius: 'xl',
            justifyContent: 'flex-start',
            gap: 2,
          }}
          onClick={() =>
            open({
              view: 'Connect',
              namespace: 'eip155',
            })
          }
        >
          <EtherIcon />
          EVM
        </Button>

        <Button
          fullWidth
          size="lg"
          variant="outlined"
          sx={{
            py: 2,
            borderRadius: 'xl',
            justifyContent: 'flex-start',
            gap: 2,
          }}
          onClick={() =>
            open({
              view: 'Connect',
              namespace: 'solana',
            })
          }
        >
          <SolanaIcon />
          Solana
        </Button>

        <Button
          fullWidth
          size="lg"
          variant="outlined"
          disabled
          sx={{
            py: 2,
            borderRadius: 'xl',
            justifyContent: 'flex-start',
            gap: 2,
          }}
        >
          <FlowIcon />
          Flow
        </Button>
      </Card>
    </Sheet>
  );
}
