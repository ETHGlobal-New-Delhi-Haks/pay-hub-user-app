import {
  Box,
  Button,
  Card,
  Input,
  Option,
  Select,
  Sheet,
  Switch,
  Typography,
  useColorScheme,
} from '@mui/joy';
import { AppBar } from '../../components/AppBar';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { setAuthToken } from '../../api/axios';
import { useFetchUser } from '../../api/user';
import { BiometricCaptureDialog } from './BiometricCaptureDialog';
import { BiometricAcceptingDialog } from './BiometricAcceptingDialog';

type Props = {
  onBack: VoidFunction;
  onLogout: VoidFunction;
};

export function SettingsPage({ onBack, onLogout }: Props) {
  const { data } = useFetchUser();
  const [openAccessModal, setOpenAccessModal] = useState(false);
  const [openCaptureModal, setOpenCaptureModal] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const { mode, setMode, systemMode } = useColorScheme();
  const [username, setUsername] = useState('');

  const selectedMode = mode === 'system' ? systemMode : mode;

  const handleLogout = () => {
    setAuthToken('');
    localStorage.removeItem('access_token');
    onLogout();
  };

  useEffect(() => {
    if (data?.username) {
      setUsername(data?.username);
    }
  }, [data?.username]);

  return (
    <Sheet sx={{ minHeight: '100dvh' }}>
      <AppBar title="Settings" isHome={false} onBack={onBack} />

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          p: 2,
          overflow: 'scroll',
          height: 'calc(100vh - 68px)',
        }}
      >
        {/* Preferences */}
        <Card sx={{ p: 2, borderRadius: 16 }}>
          <Typography level="title-md" sx={{ mb: 1 }}>
            Preferences
          </Typography>

          {/* Fiat currency */}
          <Box sx={{ display: 'grid', gap: 1.5, mt: 1 }}>
            <Typography level="body-sm" color="neutral">
              Payment currency (fiat)
            </Typography>
            <Select
              value={currency}
              onChange={(_, v) => setCurrency(v || 'USD')}
              placeholder="Choose currency"
            >
              <Option value="USD">USD — US Dollar</Option>
              <Option value="EUR">EUR — Euro</Option>
              <Option value="INR">INR — Indian Rupee</Option>
              <Option value="IDR">IDR — Indonesian Rupiah</Option>
              <Option value="RUB">RUB — Russian Ruble</Option>
            </Select>
          </Box>

          {/* Theme mode */}
          <Box
            sx={{
              mt: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography level="body-sm" color="neutral">
              Theme
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Button
                size="sm"
                sx={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  boxShadow: 'none',
                }}
                variant={selectedMode === 'light' ? 'solid' : 'outlined'}
                onClick={() => setMode('light')}
              >
                <Sun />
              </Button>
              <Button
                sx={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  boxShadow: 'none',
                }}
                size="sm"
                variant={selectedMode === 'dark' ? 'solid' : 'outlined'}
                onClick={() => setMode('dark')}
              >
                <Moon />
              </Button>
            </Box>
          </Box>
        </Card>
        {/* Biometric */}
        <Card sx={{ p: 2, borderRadius: 16 }}>
          <Typography level="title-md" sx={{ mb: 1 }}>
            Biometric
          </Typography>

          {/* Username */}
          <Box sx={{ display: 'grid', gap: 1.5, mt: 1 }}>
            <Typography level="body-sm" color="neutral">
              Enabled
            </Typography>
            <Switch
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setOpenAccessModal(event.target.checked)
              }
            />
          </Box>
        </Card>
        {/* Account */}
        <Card sx={{ p: 2, borderRadius: 16 }}>
          <Typography level="title-md" sx={{ mb: 1 }}>
            Account
          </Typography>

          {/* Username */}
          <Box sx={{ display: 'grid', gap: 1.5, mt: 1 }}>
            <Typography level="body-sm" color="neutral">
              Username
            </Typography>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </Box>

          {/* Change password */}
          <Box sx={{ display: 'grid', gap: 1.5, mt: 2 }}>
            <Typography level="body-sm" color="neutral">
              Change password
            </Typography>
            <Input type="password" placeholder="Current password" />
            <Input type="password" placeholder="New password" />
            <Input type="password" placeholder="Confirm new password" />
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Button variant="soft">Cancel</Button>
              <Button>Save</Button>
            </Box>
          </Box>
        </Card>

        {/* Danger / Logout */}
        <Card sx={{ p: 2, borderRadius: 16 }}>
          <Typography level="title-md" sx={{ mb: 1 }}>
            Session
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography level="body-md">
              Logged in as <b>{data?.email}</b>
            </Typography>
            <Button variant="outlined" color="danger" onClick={handleLogout}>
              Log out
            </Button>
          </Box>
        </Card>
      </Box>
      <BiometricAcceptingDialog
        open={openAccessModal}
        setIsOpen={setOpenAccessModal}
        onConfirm={() => {
          setOpenCaptureModal(true);
          setOpenAccessModal(false);
        }}
      />
      <BiometricCaptureDialog
        open={openCaptureModal}
        setIsOpen={() => setOpenCaptureModal(false)}
      />
    </Sheet>
  );
}
