import {
  Sheet,
  Card,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  IconButton,
  ListItemDecorator,
  ListItemContent,
  Divider,
} from '@mui/joy';
import { AppBar } from '../../components/AppBar';
import { useAppKitAccount } from '@reown/appkit/react';
import { EtherIcon } from '../../components/Icons/Ether';
import { SolanaIcon } from '../../components/Icons/Solana';
import { shortText } from '../../utils/text';
import { ChevronRight } from 'lucide-react';

type Props = {
  onBack: VoidFunction;
  toAddWallet: VoidFunction;
  onWalletSelect: (wallet: string) => void;
};

const iconMap = {
  eip155: <EtherIcon />,
  solana: <SolanaIcon />,
};

export function WalletsPage({ onBack, toAddWallet, onWalletSelect }: Props) {
  const { allAccounts } = useAppKitAccount();

  return (
    <Sheet sx={{ minHeight: '100dvh' }}>
      <AppBar title="Wallet" onBack={onBack} right={<Box />} />
      <Card sx={{ m: 2, p: 3, borderRadius: 16 }}>
        {!allAccounts?.length ? (
          <Typography level="h4">Don't have active wallets yet</Typography>
        ) : (
          <List size="lg" sx={{ '--ListItemDecorator-size': '36px' }}>
            {allAccounts.map((w) => (
              <ListItem
                key={w.address}
                sx={{
                  borderRadius: 'md',
                  '&:hover': {
                    bgcolor: 'background.level2',
                    cursor: 'pointer',
                  },
                }}
                endAction={
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="sm"
                      variant="soft"
                      onClick={() => onWalletSelect(w.address)}
                    >
                      <ChevronRight size={16} />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemDecorator>
                  {/*  eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  {iconMap[w.namespace]}
                </ListItemDecorator>
                <ListItemContent>
                  <Typography fontWeight="md" level="body-lg" noWrap>
                    {shortText(w.address)}
                  </Typography>
                </ListItemContent>
              </ListItem>
            ))}
          </List>
        )}

        <Divider sx={{ my: 2 }} />

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
