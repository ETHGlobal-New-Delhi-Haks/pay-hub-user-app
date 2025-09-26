import { Sheet, Box, Typography } from '@mui/joy';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import theme from '../../theme';

type Props = {
  title?: string;
  content?: ReactNode;
  right?: ReactNode;
  isHome?: boolean;
  onBack?: VoidFunction;
};

export function AppBar({ content, right, isHome, onBack, title }: Props) {
  return (
    <Sheet
      variant="solid"
      color="primary"
      sx={{
        p: 2,
        borderBottomLeftRadius: isHome ? 0 : 16,
        borderBottomRightRadius: isHome ? 50 : 16,
        minHeight: 68,
        background: (t) =>
          `linear-gradient(135deg, ${t.vars.palette.primary[700]} 0%, ${t.vars.palette.primary[900]} 100%)`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left side: back arrow or logo */}
        {isHome ? (
          <Typography level="h4" sx={{ color: '#fff' }}>
            PayPal
          </Typography>
        ) : (
          <Box onClick={onBack}>
            <ArrowLeft color={theme.palette.common.white} />
          </Box>
        )}

        {title && (
          <Typography
            level="h4"
            sx={{ color: '#fff', flex: 1, textAlign: 'center' }}
          >
            {title}
          </Typography>
        )}

        <Box>{right}</Box>
      </Box>
      {content}
    </Sheet>
  );
}
