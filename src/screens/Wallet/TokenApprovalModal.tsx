import { useState, useEffect } from 'react';
import {
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Stack,
  Box,
  Avatar,
  Alert,
  Divider,
  Card,
  CardContent,
  Slider,
} from '@mui/joy';
import { FileWarning } from 'lucide-react';
import BigNumber from 'bignumber.js';
import type { TokenApi } from '../../api/balance';
import { fromWei, toWei } from '../../utils/wei';

interface ApprovalModalProps {
  open: boolean;
  onClose: () => void;
  token?: TokenApi;
  currentAllowance?: string;
  onApprove: (amount: string) => void;
  isLoading?: boolean;
}

export default function TokenApprovalModal({
  open,
  onClose,
  token,
  currentAllowance = '0',
  onApprove,
  isLoading = false,
}: ApprovalModalProps) {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setAmount('');
      setCustomAmount('');
      setError('');
    }
  }, [open]);

  // Форматирование баланса для отображения
  const formatBalance = (balance?: string) => {
    if (!balance) return '0';

    const num = parseFloat(balance);
    if (num === 0) return '0';
    if (num < 0.0001) return '< 0.0001';
    if (num < 1) return num.toFixed(6);
    if (num < 1000) return num.toFixed(4);
    if (num < 1000000) return (num / 1000).toFixed(2) + 'K';
    return (num / 1000000).toFixed(2) + 'M';
  };

  // Вычисление USD стоимости
  const calculateUSDValue = (amount: string): string => {
    if (!amount || !token?.data?.priceUSD) return '0';

    try {
      const usdValue = new BigNumber(amount).multipliedBy(token.data.priceUSD);
      const value = usdValue.toNumber();

      if (value < 0.01) return '< $0.01';
      if (value < 1000) return `$${value.toFixed(2)}`;
      if (value < 1000000) return `$${(value / 1000).toFixed(2)}K`;
      return `$${(value / 1000000).toFixed(2)}M`;
    } catch {
      return '$0';
    }
  };

  const getReadableBalance = (): string => {
    if (!token?.balance) return '0';
    return fromWei(token.balance, token.data?.decimals || 18);
  };

  const getReadableAllowance = (): string => {
    if (!currentAllowance || currentAllowance === '0') return '0';
    return fromWei(currentAllowance, token?.data?.decimals || 18);
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setAmount(value);

    if (!token) return;

    if (value && isNaN(parseFloat(value))) {
      setError('Invalid number');
    } else if (
      new BigNumber(value || '0').isGreaterThan(getReadableBalance())
    ) {
      setError('Insufficient balance');
    } else {
      setError('');
    }
  };

  const handleApprove = async () => {
    if (!amount || error || !token) return;

    try {
      const amountInWei = toWei(amount, token.data?.decimals || 18);
      await onApprove(amountInWei);
    } catch (err) {
      console.error('Approval error:', err);
    }
  };

  const readableBalance = getReadableBalance();
  const readableAllowance = getReadableAllowance();
  const balanceUSD = calculateUSDValue(readableBalance);
  const allowanceUSD = calculateUSDValue(readableAllowance);
  const customAmountUSD = calculateUSDValue(customAmount);

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog size="lg" sx={{ maxWidth: 500, width: 'calc(100% - 24px)' }}>
        <ModalClose />

        <Typography level="h4" sx={{ mb: 2 }}>
          Give permission
        </Typography>

        <Stack spacing={3}>
          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                {token?.data?.logoURI ? (
                  <img width={40} height={40} src={token.data.logoURI} alt="" />
                ) : (
                  <Avatar
                    sx={{
                      bgcolor: '#627EEA',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {token?.data?.symbol?.charAt(0)}
                  </Avatar>
                )}
                <Box sx={{ flex: 1 }}>
                  <Typography level="title-md">
                    {token?.data?.symbol}
                  </Typography>
                  <Typography level="body-sm" color="neutral">
                    {token?.data?.name}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography level="body-sm" color="neutral">
                    Balance
                  </Typography>
                  <Typography level="title-sm">
                    {formatBalance(readableBalance)}
                  </Typography>
                  <Typography level="body-xs" color="neutral">
                    {balanceUSD}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {readableAllowance !== '0' && (
            <Alert color="warning" startDecorator={<FileWarning />}>
              <Box>
                <Typography level="body-sm">
                  Current permission: {formatBalance(readableAllowance)}{' '}
                  {token?.data?.symbol}
                </Typography>
                <Typography level="body-xs" color="neutral">
                  {allowanceUSD}
                </Typography>
              </Box>
            </Alert>
          )}

          {/* Кастомная сумма */}
          <FormControl error={!!error}>
            <FormLabel>Enter amount:</FormLabel>
            <Input
              placeholder={`0.0 ${token?.data?.symbol}`}
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              type="number"
              slotProps={{
                input: {
                  min: 0,
                  max: parseFloat(readableBalance),
                  step: 'any',
                },
              }}
              endDecorator={
                <Button
                  size="sm"
                  variant="plain"
                  onClick={() => handleCustomAmountChange(readableBalance)}
                >
                  Max
                </Button>
              }
            />
            {error && <FormHelperText>{error}</FormHelperText>}
            {customAmount && !error && (
              <FormHelperText>
                <Typography level="body-xs" color="neutral">
                  ≈ {customAmountUSD}
                </Typography>
              </FormHelperText>
            )}
          </FormControl>

          {customAmount && !error && (
            <Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Typography level="body-sm">Percent of balance</Typography>
                <Typography level="body-xs" color="neutral">
                  {(
                    (parseFloat(customAmount) / parseFloat(readableBalance)) *
                    100
                  ).toFixed(1)}
                  %
                </Typography>
              </Stack>
              <Slider
                value={
                  (parseFloat(customAmount) / parseFloat(readableBalance)) * 100
                }
                onChange={(_, value) => {
                  const newAmount = (
                    ((value as number) / 100) *
                    parseFloat(readableBalance)
                  ).toString();
                  handleCustomAmountChange(newAmount);
                }}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value.toFixed(1)}%`}
              />
            </Box>
          )}

          <Divider />

          {/* Подтверждение с суммой */}
          {customAmount && !error && (
            <Card variant="soft" color="primary">
              <CardContent>
                <Typography level="body-sm" color="primary">
                  You will approve:
                </Typography>
                <Typography level="title-md" color="primary">
                  {formatBalance(customAmount)} {token?.data?.symbol}
                </Typography>
                <Typography level="body-xs" color="primary">
                  ≈ {customAmountUSD}
                </Typography>
              </CardContent>
            </Card>
          )}

          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={onClose} fullWidth>
              Cancel
            </Button>
            <Button
              onClick={handleApprove}
              disabled={!amount || !!error}
              fullWidth
              loading={isLoading}
            >
              Permit
            </Button>
          </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  );
}
