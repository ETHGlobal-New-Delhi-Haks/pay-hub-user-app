import ReactDOM from 'react-dom/client';
import { CssVarsProvider } from '@mui/joy/styles';
import InitColorSchemeScript from '@mui/joy/InitColorSchemeScript';
import CssBaseline from '@mui/joy/CssBaseline';
import App from './App';
import theme from './theme';
import { StatusBar } from '@capacitor/status-bar';

StatusBar.setOverlaysWebView({ overlay: true });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <InitColorSchemeScript />
    <CssVarsProvider
      theme={theme}
      defaultMode="system"
      modeStorageKey="app_theme"
      attribute="data-joy-color-scheme"
    >
      <CssBaseline />
      <App />
    </CssVarsProvider>
  </>
);
