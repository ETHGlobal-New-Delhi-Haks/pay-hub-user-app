import { Box } from '@mui/joy';
import type { SxProps } from '@mui/joy/styles/types';
import { Children, type PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  index: number;
  sx?: SxProps;
  height?: string | number;
}>;

export function SlideSwitch({ index, children, height = 'auto', sx }: Props) {
  const count = Children.count(children);

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: height,
        ...sx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: `${count * 100}%`,
          height: '100%',
          transform: `translateX(-${index * (100 / count)}%)`,
          transition: 'transform 400ms cubic-bezier(.2,.8,.2,1)',
        }}
      >
        {Children.map(children, (child, childIndex) => (
          <Box
            key={childIndex}
            sx={{
              width: `${100 / count}%`,
              height: '100%',
              flexShrink: 0,
            }}
          >
            {child}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
