import { CssVarsProvider } from '@mui/joy/styles';
import { SlideSwitch } from './components/SlideSwitch/inedx';
import theme from './theme';
import { LoginPage } from './screens/Login';
import { PayPage } from './screens/Pay';
import { MainPage } from './screens/Main';
import { SettingsPage } from './screens/Settings';
import { WalletPage } from './screens/Wallet';
import { useCallback, useEffect, useState } from 'react';

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || '#/login');
  const [activeScreen, setActiveScreen] = useState('');

  useEffect(() => {
    const onHash = () => setHash(window.location.hash || '#/login');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = useCallback((to: string) => {
    if (!to.startsWith('#')) to = '#' + to;
    if (window.location.hash === to) return;
    window.location.hash = to;
  }, []);

  const route = hash.replace(/^#\//, '');

  useEffect(() => {
    if (!['login', 'app'].includes(route)) {
      setActiveScreen(route);
    }
  }, [route]);

  return { hash, navigate, route: hash.replace(/^#\//, ''), activeScreen };
}
function useAppRouter() {
  const { route, navigate, activeScreen } = useHashRoute();

  const activeIndex = route === 'app' ? 0 : 1;

  const navigateToApp = useCallback(
    (screen: string) => {
      navigate(`#/${screen}`);
    },
    [navigate]
  );

  const logout = useCallback(() => {
    navigate('#/login');
  }, [navigate]);

  return {
    activeIndex,
    navigateToApp,
    logout,
    activeScreen,
  };
}

function AppRouter() {
  const { activeIndex, navigateToApp, logout, activeScreen } = useAppRouter();
  function getActiveScreen(screen: string) {
    switch (screen) {
      case 'settings':
        return (
          <SettingsPage onBack={() => navigateToApp('app')} onLogout={logout} />
        );
      case 'payment':
        return <PayPage onBack={() => navigateToApp('app')} />;
      case 'wallet':
        return <WalletPage onBack={() => navigateToApp('app')} />;
      default:
        return <MainPage navigate={navigateToApp} />;
    }
  }

  return (
    <SlideSwitch index={activeIndex} height="100dvh">
      <MainPage navigate={navigateToApp} />
      {getActiveScreen(activeScreen)}
    </SlideSwitch>
  );
}

export default function App() {
  const { route, navigate } = useHashRoute();

  const isLoggedIn = !['login', ''].includes(route);

  return (
    <CssVarsProvider theme={theme} defaultMode="light">
      {isLoggedIn ? (
        <AppRouter />
      ) : (
        <LoginPage onLogin={() => navigate('#/app')} />
      )}
    </CssVarsProvider>
  );
}
