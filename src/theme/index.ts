import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          500: '#4C88FF',
          600: '#3C72E6',
          700: '#2F5FC7',
          800: '#274E9E',
        },
      },
    },
  },
  radius: { sm: '8px', md: '12px', lg: '20px' },
});

export default theme;
