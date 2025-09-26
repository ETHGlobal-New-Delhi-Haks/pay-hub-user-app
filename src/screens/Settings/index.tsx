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
import { useState } from 'react';
import { Moon, Plus, Sun } from 'lucide-react';

type Props = {
  onBack: VoidFunction;
  onLogout: VoidFunction;
};

export function SettingsPage({ onBack, onLogout }: Props) {
  const [currency, setCurrency] = useState('USD');
  const { mode, setMode } = useColorScheme();
  const [username, setUsername] = useState('vadikforz');

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
                sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                variant={mode === 'light' ? 'solid' : 'outlined'}
                onClick={() => setMode('light')}
              >
                <Sun />
              </Button>
              <Button
                sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                size="sm"
                variant={mode === 'dark' ? 'solid' : 'outlined'}
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
            <Switch />
          </Box>
          <Box sx={{ display: 'grid', gap: 1.5, mt: 1 }}>
            <Button sx={{ width: 'fit-content', ml: 'auto' }}>Update</Button>
          </Box>

          {/* If not uploaded */}

          <Box sx={{ display: 'grid', gap: 1.5, mt: 1 }}>
            <Typography level="body-sm" color="neutral">
              You don't have biometric data yet
            </Typography>
            <Button sx={{ width: 'fit-content', ml: 'auto', gap: 1 }}>
              Upload
              <Plus />
            </Button>
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
              Logged in as <b>vadikforz@gmail.com</b>
            </Typography>
            <Button variant="outlined" color="danger" onClick={onLogout}>
              Log out
            </Button>
          </Box>
        </Card>
      </Box>
    </Sheet>
  );
}
