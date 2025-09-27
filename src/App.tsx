import { LoginPage } from './screens/Login';
import { PayPage } from './screens/Pay';
import { MainPage } from './screens/Main';
import { SettingsPage } from './screens/Settings';
import { WalletsPage } from './screens/Wallets';
import { useCallback, useEffect, useState } from 'react';
import { AddWalletPage } from './screens/AddWallet';
import { SlideSwitch } from './components/SlideSwitch';
import { WalletPage } from './screens/Wallet';
import { createAppKit } from '@reown/appkit/react';

import { WagmiProvider, type Config } from 'wagmi';
import { arbitrum, mainnet, solana } from '@reown/appkit/networks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { setAuthToken } from './api/axios';

const queryClient = new QueryClient();

const projectId = 'a65ae05148a220caba0c80f70097e9d7';

const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://example.com',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

const wagmiAdapter = new WagmiAdapter({
  networks: [mainnet, arbitrum, solana],
  projectId,
  ssr: false,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet, arbitrum, solana],
  projectId,
  metadata,
  features: {
    analytics: true,
  },
});

interface RouteParams {
  [key: string]: string;
}

interface ParsedRoute {
  screen: string;
  params: RouteParams;
  fullPath: string;
}

function parseRoute(path: string): ParsedRoute {
  const segments = path.split('/').filter(Boolean);
  const screen = segments[0] || 'app';
  
  let params: RouteParams = {};
  
  switch (screen) {
    case 'wallet':
      if (segments.length === 3) {
        // wallet/address/chain
        params = {
          address: segments[1],
          chain: segments[2]
        };
      }
      break;
    case 'payment':
      if (segments.length === 2) {
        params = { transactionId: segments[1] };
      }
      break;
    case 'user':
      if (segments.length === 2) {
        params = { userId: segments[1] };
      }
      break;
  }
  
  return {
    screen,
    params,
    fullPath: path
  };
}

function buildRoute(screen: string, params?: RouteParams): string {
  if (!params || Object.keys(params).length === 0) {
    return screen;
  }

  switch (screen) {
    case 'wallet':
      return params.address ? `wallet/${params.address}/${params.chain}` : 'wallet';
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
    const existingIndex = stack.findIndex(
      (item) => item.fullPath === currentRoute.fullPath
    );

    if (existingIndex !== -1 && existingIndex < stack.length - 1) {
      setStack((prev) => prev.slice(0, existingIndex + 1));
      return;
    }

    if (currentRoute.screen === 'app') {
      setStack([{ screen: 'app', params: {}, fullPath: 'app' }]);
    } else if (existingIndex === -1) {
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

    console.log(params, 'params')

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
            onWalletSelect={(address: string, chain: string) =>
              navigateToApp('wallet', { address, chain })
            }
          />
        );
      case 'add-wallet':
        return <AddWalletPage key={fullPath} onBack={goBack} />;
      case `wallet/${params.address}/${params.chain}`:
        return (
          <WalletPage key={fullPath} onBack={goBack} wallet={params.address} chain={params.chain} />
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

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken && route !== 'login' && route !== '') {
      navigate('login');
    }

    if(accessToken) {
      setAuthToken(accessToken)
    }
  }, []);

  const isLoggedIn = !['login', ''].includes(route);

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config}>
      <QueryClientProvider client={queryClient}>
        <>
          {isLoggedIn ? (
            <AppRouter />
          ) : (
            <LoginPage onLogin={() => navigate('app')} />
          )}
        </>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
