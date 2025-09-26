import {
  Box,
  Button,
  Input,
  Sheet,
  Typography,
  Link as JoyLink,
} from '@mui/joy';
import { useState } from 'react';

type Props = {
  onLogin: VoidFunction;
};

export function LoginPage({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Sheet
      sx={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', p: 2 }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '100%',
        }}
      >
        <Box sx={{ display: 'grid', gap: 2 }}>
          <Typography level="h2" sx={{ textAlign: 'center', mb: 1 }}>
            PayPal
          </Typography>
          <Input
            size="lg"
            placeholder="Enter your name or e‑mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            size="lg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button size="lg" onClick={onLogin} sx={{ mt: 1 }}>
            Log in
          </Button>
          <Typography
            level="body-sm"
            sx={{ textAlign: 'center', color: 'neutral.500', mt: 1 }}
          >
            Having trouble logging in?
          </Typography>
          <JoyLink level="body-sm" sx={{ textAlign: 'center' }} href="#/signup">
            Sign up
          </JoyLink>
        </Box>
      </Box>
    </Sheet>
  );
}
