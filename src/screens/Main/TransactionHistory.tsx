import { Box, Typography, CardContent, Stack, Chip, Card } from '@mui/joy';
import { Clock, CheckCircle2 } from 'lucide-react';

const mockTransactions = [
  {
    id: '1',
    amount: '100',
    merchant: 'Pepsi',
    token: 'BNB',
    network: 'BSC',
    status: 'completed',
    time: '2 min ago',
    usdValue: '245.50',
    merchantLogo: '🥤',
  },
  {
    id: '2',
    amount: '50',
    merchant: 'Spotify',
    token: 'USDT',
    network: 'Ethereum',
    status: 'completed',
    time: '1 hour ago',
    usdValue: '50.00',
    merchantLogo: '🎵',
  },
  {
    id: '3',
    amount: '200',
    merchant: 'Apple',
    token: 'ETH',
    network: 'Ethereum',
    status: 'pending',
    time: '3 hours ago',
    usdValue: '520.00',
    merchantLogo: '🍎',
  },
  {
    id: '4',
    amount: '75',
    merchant: 'Netflix',
    token: 'USDC',
    network: 'Polygon',
    status: 'completed',
    time: '1 day ago',
    usdValue: '75.00',
    merchantLogo: '🎬',
  },
  {
    id: '5',
    amount: '300',
    merchant: 'Amazon',
    token: 'DAI',
    network: 'Ethereum',
    status: 'completed',
    time: '2 days ago',
    usdValue: '299.85',
    merchantLogo: '📦',
  },
];

export default function BeautifulTransactionHistory() {
  const getStatusIcon = (status: string) => {
    return status === 'completed' ? (
      <CheckCircle2 size={14} style={{ color: '#22c55e' }} />
    ) : (
      <Clock size={14} style={{ color: '#f59e0b' }} />
    );
  };

  const getNetworkColor = (network: string) => {
    const colors = {
      Ethereum: '#627eea',
      BSC: '#f3ba2f',
      Polygon: '#8247e5',
    };
    return colors[network as keyof typeof colors] || '#627eea';
  };

  return (
    <Box
      sx={{
        px: 2,
        mt: 2,
        flex: 1,
        pb: 2,
        minHeight: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        level="h3"
        sx={{
          fontWeight: 600,
          mb: 2,
          color: 'text.primary',
        }}
      >
        Transactions history
      </Typography>

      <Stack
        sx={{
          overflowY: 'auto',
          pr: 1,
          gap: 1, // Отступ для скроллбара
          flex: 1,
        }}
      >
        {mockTransactions.map((tx) => (
          <Card
            key={tx.id}
            variant="outlined"
            sx={{
              borderRadius: 8,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              borderColor: 'divider',
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                {/* Transaction Info */}
                <Box sx={{ flex: 1 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Box>
                      <Typography
                        level="title-md"
                        sx={{
                          fontWeight: 600,
                          mb: 0.5,
                        }}
                      >
                        {tx.merchant}
                      </Typography>

                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                          size="sm"
                          variant="soft"
                          sx={{
                            bgcolor: getNetworkColor(tx.network) + '20',
                            color: getNetworkColor(tx.network),
                            fontSize: '0.75rem',
                            fontWeight: 500,
                          }}
                        >
                          {tx.network}
                        </Chip>

                        <Chip
                          size="sm"
                          variant="soft"
                          color={
                            tx.status === 'completed' ? 'success' : 'warning'
                          }
                          startDecorator={getStatusIcon(tx.status)}
                          sx={{ fontSize: '0.75rem' }}
                        >
                          {tx.status}
                        </Chip>
                      </Stack>
                    </Box>

                    <Box sx={{ textAlign: 'right' }}>
                      <Typography
                        level="title-md"
                        sx={{
                          fontWeight: 700,
                          color: 'danger.400',
                        }}
                      >
                        -{tx.amount} {tx.token}
                      </Typography>
                      <Typography
                        level="body-sm"
                        sx={{
                          color: 'text.tertiary',
                          fontWeight: 500,
                        }}
                      >
                        ${tx.usdValue}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Bottom row */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mt: 1.5 }}
                  >
                    <Typography
                      level="body-sm"
                      sx={{
                        color: 'text.tertiary',
                        fontSize: '0.8rem',
                      }}
                    >
                      {tx.time}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
