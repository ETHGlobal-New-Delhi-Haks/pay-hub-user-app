import { extendTheme } from '@mui/joy/styles';

declare module '@mui/joy/styles' {
  interface Palette {
    card: {
      bg: string;
      shadow: string
    };
  }
}

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        card: {
          bg: 'rgba(255, 255, 255, 0.05)',
          shadow: ''
        },
      },
    },
    light: {
      palette: {
        card: {
          bg: '',
          shadow: '3px 4px 12px -8px #00000080;',
        },
      },
    },
  },
  components: {
    JoyCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.vars.palette.card.bg,
          color: theme.vars.palette.primary.softColor,
          border: 'none',
          boxShadow: theme.vars.palette.card.shadow,
        }),
      },
    },
  },
});

export default theme;
