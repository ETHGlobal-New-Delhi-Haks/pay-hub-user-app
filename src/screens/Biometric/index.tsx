import { useState } from 'react';
import { Box, Typography, Button, CircularProgress, Sheet } from '@mui/joy';
import { Camera, Check } from 'lucide-react';

type BiometricState = 'idle' | 'scanning' | 'success' | 'error';

type Props = {
  onBack: VoidFunction;
};

export default function BiometricUploadScreen({ onBack }: Props) {
  const [state, setState] = useState<BiometricState>('idle');

  const handleStartScan = () => {
    setState('scanning');

    setTimeout(() => {
      setState('success');
    }, 3000);
  };

  const handleRetry = () => {
    setState('idle');
  };

  const getCircleContent = () => {
    switch (state) {
      case 'idle':
        return <Camera size={60} color="#627eea" />;
      case 'scanning':
        return <CircularProgress size="lg" thickness={3} />;
      case 'success':
        return <Check size={60} color='success' />;
    }
  };

  const getMainText = () => {
    switch (state) {
      case 'idle':
        return 'Set up biometric authentication';
      case 'scanning':
        return 'Scanning your face...';
      case 'success':
        return 'Biometric setup complete!';
    }
  };

  const getSubText = () => {
    switch (state) {
      case 'idle':
        return 'Look directly at the camera and tap the circle to begin face scanning';
      case 'scanning':
        return 'Keep your face centered in the circle';
      case 'success':
        return 'You can now use face recognition to access your wallet';

    }
  };

  const getButtonText = () => {
    switch (state) {
      case 'idle':
        return 'Start scanning';
      case 'scanning':
        return 'Scanning...';
      case 'success':
        return 'Continue';
      case 'error':
        return 'Try again';
    }
  };

  return (
    <Sheet
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        bgcolor: 'background.body',
      }}
    >
      {/* Main Content */}
      <Box
        sx={{
          textAlign: 'center',
          maxWidth: 400,
          width: '100%',
        }}
      >
        {/* Title */}
        <Typography
          level="h2"
          sx={{
            fontWeight: 600,
            mb: 2,
            color: 'text.primary',
          }}
        >
          {getMainText()}
        </Typography>

        {/* Subtitle */}
        <Typography
          level="body-lg"
          sx={{
            color: 'text.secondary',
            mb: 6,
            lineHeight: 1.5,
          }}
        >
          {getSubText()}
        </Typography>

        {/* Camera Circle */}
        <Box
          onClick={state === 'idle' ? handleStartScan : undefined}
          sx={{
            width: 200,
            height: 200,
            borderRadius: '50%',
            border: '4px solid',
            borderColor:
              state === 'scanning'
                ? 'primary.500'
                : state === 'success'
                ? 'success.500'
                : state === 'error'
                ? 'danger.500'
                : 'neutral.300',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 6,
            cursor: state === 'idle' ? 'pointer' : 'default',
            transition: 'all 0.3s ease',
            bgcolor:
              state === 'scanning'
                ? 'primary.50'
                : state === 'success'
                ? 'success.50'
                : state === 'error'
                ? 'danger.50'
                : 'background.surface',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Scanning animation overlay */}
          {state === 'scanning' && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                bgcolor: 'primary.500',
                animation: 'scan 2s linear infinite',
                '@keyframes scan': {
                  '0%': {
                    transform: 'translateY(0)',
                    opacity: 0.8,
                  },
                  '50%': {
                    opacity: 1,
                  },
                  '100%': {
                    transform: 'translateY(192px)',
                    opacity: 0.8,
                  },
                },
              }}
            />
          )}

          {getCircleContent()}
        </Box>

        {/* Action Button */}
        <Button
          onClick={
            state === 'idle'
              ? handleStartScan
              : state === 'error'
              ? handleRetry
              : state === 'success'
              ? onBack
              : undefined
          }
          disabled={state === 'scanning'}
          variant="solid"
          size="lg"
          sx={{
            width: '100%',
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 600,
            borderRadius: 'xl',
            bgcolor:
              state === 'success'
                ? 'success.500'
                : state === 'error'
                ? 'danger.500'
                : 'primary.500',
          }}
        >
          {getButtonText()}
        </Button>

        {/* Skip option */}
        {state === 'idle' && (
          <Button
            variant="plain"
            size="sm"
            sx={{
              mt: 2,
              color: 'text.tertiary',
            }}
            onClick={onBack}
          >
            Skip for now
          </Button>
        )}
      </Box>
    </Sheet>
  );
}
