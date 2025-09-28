import { Box, Skeleton, Typography } from '@mui/joy';
import { useFetchUser } from '../../api/user';

export function BalanceCard() {
  const { data, isFetched } = useFetchUser();

  return (
    <Box sx={{ my: 3, borderRadius: 24 }}>
      {isFetched ? (
        <Typography level="body-md" sx={{ color: 'lightgray' }}>
          Hello {data.username}
        </Typography>
      ) : (
        <Skeleton height={20} width={100}/>
      )}
      <Typography level="h1" sx={{ mt: 2, color: 'white' }}>
        $ 272.30
      </Typography>
      <Typography level="body-md" sx={{ mt: 2, color: 'lightgray' }}>
        Your Balance
      </Typography>
    </Box>
  );
}
