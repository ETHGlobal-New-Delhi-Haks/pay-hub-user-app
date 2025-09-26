import { CssVarsProvider } from '@mui/joy/styles';
import theme from './theme';
import { LoginPage } from './screens/Login';
import { PayPage } from './screens/Pay';
import { MainPage } from './screens/Main';
import { SettingsPage } from './screens/Settings';
import { WalletsPage } from './screens/Wallets';
import { useCallback, useEffect, useState } from 'react';
import { AddWalletPage } from './screens/AddWallet';
import { SlideSwitch } from './components/SlideSwitch';
import { WalletPage } from './screens/Wallet';

interface RouteParams {
  [key: string]: string;
}

interface ParsedRoute {
  screen: string;
  params: RouteParams;
  fullPath: string;
}

function parseRoute(route: string): ParsedRoute {
  if (!route || route === '') {
    return { screen: 'app', params: {}, fullPath: 'app' };
  }

  const parts = route.split('/');
  const screen = parts[0];
  const params: RouteParams = {};

  // Парсим параметры для разных экранов
  switch (screen) {
    case 'wallet':
      if (parts[1]) {
        params.address = parts[1];
      }
      break;
    case 'payment':
      if (parts[1]) {
        params.transactionId = parts[1];
      }
      break;
    case 'user':
      if (parts[1]) {
        params.userId = parts[1];
      }
      break;
    // Добавляйте другие экраны с параметрами здесь
    default:
      // Для остальных экранов просто собираем все части как параметры
      parts.slice(1).forEach((part, index) => {
        params[`param${index}`] = part;
      });
  }

  return {
    screen,
    params,
    fullPath: route,
  };
}

function buildRoute(screen: string, params?: RouteParams): string {
  if (!params || Object.keys(params).length === 0) {
    return screen;
  }

  // Специальная логика для разных экранов
  switch (screen) {
    case 'wallet':
      return params.address ? `wallet/${params.address}` : 'wallet';
    case 'payment':
      return params.transactionId
        ? `payment/${params.transactionId}`
        : 'payment';
    case 'user':
      return params.userId ? `user/${params.userId}` : 'user';
    default: {
      const paramValues = Object.values(params).filter(Boolean);
      return paramValues.length > 0
        ? `${screen}/${paramValues.join('/')}`
        : screen;
    }
  }
}

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || '#/login');

  useEffect(() => {
    const onHash = () => setHash(window.location.hash || '#/login');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = useCallback((to: string, params?: RouteParams) => {
    let route: string;

    if (params) {
      route = buildRoute(to, params);
    } else {
      route = to;
    }

    const fullHash = route.startsWith('#') ? route : `#/${route}`;

    if (window.location.hash === fullHash) return;
    window.location.hash = fullHash;
  }, []);

  const parsedRoute = parseRoute(hash.replace(/^#\//, ''));

  return {
    hash,
    navigate,
    route: parsedRoute.screen,
    params: parsedRoute.params,
    fullPath: parsedRoute.fullPath,
  };
}

function useNavigationStack() {
  const { route, params, fullPath, navigate } = useHashRoute();
  const [stack, setStack] = useState<ParsedRoute[]>([
    { screen: 'app', params: {}, fullPath: 'app' },
  ]);

  const currentRoute = { screen: route, params, fullPath };
  const currentIndex = stack.length - 1;

  useEffect(() => {
    // Проверяем, есть ли уже такой полный путь в стеке
    const existingIndex = stack.findIndex(
      (item) => item.fullPath === currentRoute.fullPath
    );

    if (existingIndex !== -1 && existingIndex < stack.length - 1) {
      // Возврат к существующему экрану - обрезаем стек
      setStack((prev) => prev.slice(0, existingIndex + 1));
      return;
    }

    // Если это новый экран или возврат на главный
    if (currentRoute.screen === 'app') {
      setStack([{ screen: 'app', params: {}, fullPath: 'app' }]);
    } else if (existingIndex === -1) {
      // Добавляем новый экран в стек
      setStack((prev) => [...prev, currentRoute]);
    }
  }, [currentRoute.fullPath]);

  const navigateToApp = useCallback(
    (screen: string, params?: RouteParams) => {
      navigate(screen, params);
    },
    [navigate]
  );

  const goBack = useCallback(() => {
    if (stack.length > 1) {
      const previousRoute = stack[stack.length - 2];
      navigate(previousRoute.screen, previousRoute.params);
    }
  }, [stack, navigate]);

  const logout = useCallback(() => {
    navigate('login');
    setStack([{ screen: 'app', params: {}, fullPath: 'app' }]);
  }, [navigate]);

  return {
    stack,
    currentIndex,
    currentRoute,
    navigateToApp,
    goBack,
    logout,
  };
}

function AppRouter() {
  const { stack, currentIndex, navigateToApp, goBack, logout } =
    useNavigationStack();

  const createScreen = (routeInfo: ParsedRoute) => {
    const { params, fullPath } = routeInfo;

    switch (fullPath) {
      case 'settings':
        return (
          <SettingsPage key={fullPath} onBack={goBack} onLogout={logout} />
        );
      case 'payment':
        return <PayPage key={fullPath} onBack={goBack} />;
      case 'wallet':
        return (
          <WalletsPage
            key={fullPath}
            onBack={goBack}
            toAddWallet={() => navigateToApp('add-wallet')}
          />
        );
      case 'add-wallet':
        return (
          <AddWalletPage
            key={fullPath}
            onBack={goBack}
            onWalletSelect={(address: string) =>
              navigateToApp('wallet', { address })
            }
          />
        );
      case `wallet/${params.address}`:
        return (
          <WalletPage key={fullPath} onBack={goBack} wallet={params.address} />
        );

      case 'app':
      default:
        return <MainPage key={fullPath} navigate={navigateToApp} />;
    }
  };

  const screens = stack.map((routeInfo) => createScreen(routeInfo));

  return (
    <SlideSwitch index={currentIndex} height="100dvh">
      {screens}
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
        <LoginPage onLogin={() => navigate('app')} />
      )}
    </CssVarsProvider>
  );
}
