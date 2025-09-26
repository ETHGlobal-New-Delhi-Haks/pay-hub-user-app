import { Box, Typography } from '@mui/joy';

export function BalanceCard() {
  return (
    <Box sx={{ my: 3, borderRadius: 24 }}>
      <Typography level="body-md">Hello huilopan</Typography>
      <Typography level="h1" sx={{ mt: 2 }}>
        $ 272.30
      </Typography>
      <Typography level="body-md">Your Balance</Typography>
    </Box>
  );
}
