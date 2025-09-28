import {
  Sheet,
  Card,
  Typography,
  Box,
  List,
  ListItem,
  IconButton,
  ListItemDecorator,
  ListItemContent,
  Skeleton,
} from '@mui/joy';
import { AppBar } from '../../components/AppBar';
import { shortText } from '../../utils/text';
import { useFetchBalances, type TokenApi } from '../../api/balance';
import { ChevronRight } from 'lucide-react';
import BigNumber from 'bignumber.js';
import TokenApprovalModal from './TokenApprovalModal';
import { useState } from 'react';
import { fromWei } from '../../utils/wei';

type Props = {
  onBack: VoidFunction;
  wallet: string;
  chain: string;
};

export function WalletPage({ onBack, wallet, chain }: Props) {
  const { data, isFetched } = useFetchBalances();
  const [selectedToken, setSelectedToken] = useState<TokenApi>();

  return (
    <>
      <Sheet sx={{ minHeight: '100dvh' }}>
        <AppBar title="Wallet" onBack={onBack} right={<Box />} />
        <Box sx={{ overflow: 'scroll', height: 'calc(100vh - 68px)' }}>
          <Card
            sx={{
              m: 2,
              p: 3,
              borderRadius: 16,
            }}
          >
            <Typography level="h4">{shortText(wallet)}</Typography>
            {isFetched &&
            !Object.values(data?.[wallet][+chain] || {}).find((t) =>
              BigNumber(t?.balance).isGreaterThan(0)
            ) ? (
              <Typography>Don't have tokens to pay yet</Typography>
            ) : null}
            <List size="lg" sx={{ '--ListItemDecorator-size': '36px' }}>
              {isFetched ? (
                Object.values(data?.[wallet][+chain] || {})?.map((token) => {
                  if (!BigNumber(token?.balance).isGreaterThan(0)) {
                    return;
                  }
                  return (
                    <ListItem
                      key={token.data.address}
                      sx={{
                        borderRadius: 'md',
                      }}
                      endAction={
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            size="sm"
                            variant="soft"
                            onClick={() => setSelectedToken(token)}
                          >
                            <ChevronRight size={16} />
                          </IconButton>
                        </Box>
                      }
                    >
                      <ListItemDecorator>
                        <img
                          src={token?.data.logoURI}
                          alt=""
                          style={{ width: 24, height: 24 }}
                        />
                      </ListItemDecorator>
                      <ListItemContent>
                        <Typography fontWeight="md" level="body-lg" noWrap>
                          {shortText(token?.data.address)}
                        </Typography>
                      </ListItemContent>
                      <ListItemContent>
                        <Typography>
                          ~
                          {BigNumber(
                            fromWei(token?.balance, token.data.decimals)
                          )
                            .multipliedBy(token?.data.priceUSD)
                            .toFixed(2)}
                          $
                        </Typography>
                      </ListItemContent>
                    </ListItem>
                  );
                })
              ) : (
                <List size="lg" sx={{ '--ListItemDecorator-size': '36px' }}>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <ListItem
                      key={i}
                      sx={{
                        borderRadius: 'md',
                      }}
                    >
                      <Skeleton height={27} variant="rectangular"></Skeleton>
                    </ListItem>
                  ))}
                </List>
              )}
            </List>
          </Card>
        </Box>
      </Sheet>

      <TokenApprovalModal
        open={!!selectedToken}
        onClose={() => setSelectedToken(undefined)}
        token={selectedToken}
        currentAllowance="0"
        onApprove={() => console.log('Approve')}
        isLoading={false}
      />
    </>
  );
}
