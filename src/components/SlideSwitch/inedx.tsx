import { Box } from '@mui/joy';
import type { SxProps } from '@mui/joy/styles/types';
import { Children, type PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  index: number;
  sx?: SxProps;
  height?: string | number;
}>;

export function SlideSwitch({ index, children, height = 0, sx }: Props) {
  const count = Children.count(children);
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: height || 'auto',
        ...sx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: `${count * 100}%`,
          transform: `translateX(-${index * (100 / count)}%)`,
          transition: 'transform 400ms cubic-bezier(.2,.8,.2,1)',
        }}
      >
        {Children.map(children, (child) => (
          <Box sx={{ width: `${100 / count}%`, flexShrink: 0 }}>{child}</Box>
        ))}
      </Box>
    </Box>
  );
}
