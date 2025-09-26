import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import { SlideSwitch } from './components/SlideSwitch/inedx';
import theme from './theme';
import { LoginPage } from './screens/Login';
import { PaymentType } from './screens/PaymetType';
import { MainPage } from './screens/Main';
import { SettingsPage } from './screens/Settings';


function useHashRoute() {
  const [hash, setHash] = React.useState(
    () => window.location.hash || '#/login'
  );
  React.useEffect(() => {
    const onHash = () => setHash(window.location.hash || '#/login');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const navigate = React.useCallback((to: string) => {
    if (!to.startsWith('#')) to = '#' + to;
    if (window.location.hash === to) return; // keep transition stable
    window.location.hash = to;
  }, []);
  return { hash, navigate };
}

export default function App() {
  const { hash, navigate } = useHashRoute();
  const route = hash.replace(/^#\//, '');
  const pages = ['login', 'app', 'settings', 'payment'];
  const activeIndex = Math.max(0, pages.indexOf(route));

  return (
    <CssVarsProvider theme={theme} defaultMode="light">
      <SlideSwitch index={activeIndex} height="100dvh">
        <LoginPage onLogin={() => navigate('#/app')} />
        <MainPage navigate={navigate} />
        <SettingsPage onBack={() => navigate('#/app')} onLogout={()=>navigate('#/login')} />
        <PaymentType onBack={() => navigate('#/app')} />
      </SlideSwitch>
    </CssVarsProvider>
  );
}
