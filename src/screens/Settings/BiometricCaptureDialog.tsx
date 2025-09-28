import { useState, useRef, useEffect } from 'react';
import { Camera, CheckCircle } from 'lucide-react';
import {
  Box,
  Button,
  Modal,
  ModalDialog,
  Typography,
} from '@mui/joy';

type Props = { open: boolean; setIsOpen: (val: boolean) => void };

export function BiometricCaptureDialog({ open, setIsOpen }: Props) {
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureComplete, setCaptureComplete] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (open && !captureComplete) {
      startCamera();
    }

    return () => {
      stopCamera();
    };
  }, [open, captureComplete]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handleCapture = async () => {
    setIsCapturing(true);

    // Simulate biometric capture process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsCapturing(false);
    setCaptureComplete(true);
    stopCamera();


    setTimeout(() => {
      setIsOpen(false);
      setCaptureComplete(false);
    }, 200000);
  };

  const handleClose = () => {
    setIsOpen(false);
    setCaptureComplete(false);
    stopCamera();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalDialog size="lg" sx={{ maxWidth: 500, width: 'calc(100% - 24px)' }}>
        <Box>
          <Typography level='h2'>Set up Face Recognition</Typography>
          <Typography>
            {captureComplete
              ? 'Biometric authentication enabled successfully!'
              : 'Position your face in the center of the frame'}
          </Typography>
        </Box>

        <div className="flex flex-col items-center space-y-4">
          {!captureComplete ? (
            <>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: 400,
                  maxHeight: 600,
                  height: '100%',
                  borderRadius: '60px',
                  overflow: 'hidden',
                }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />

                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    height: '80%',
                    border: '2px dashed rgba(255, 255, 255, 0.8)',
                    borderRadius: '60px',
                    pointerEvents: 'none',
                  }}
                />
              </Box>
              {isCapturing && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003087]"></div>
                </div>
              )}

              <Button
                onClick={handleCapture}
                disabled={isCapturing}
                className="w-full gap-2"
                size="lg"
                sx={{ justifyContent: 'center', gap: 2, mt: 2 }}
                fullWidth
              >
                <Camera className="h-4 w-4" />
                {isCapturing ? 'Capturing...' : 'Capture face data'}
              </Button>
            </>
          ) : (
            <Box
              py={4}
              alignItems="center"
              justifyContent="center"
              display="flex"
              flexDirection="column"
            >
              <Box
                bgcolor="success.300"
                p={2}
                borderRadius="50%"
                width={150}
                height={150}
                alignItems="center"
                justifyContent="center"
                display="flex"
                color="success.600"
              >
                <CheckCircle size={50} />
              </Box>
              <Box textAlign="center">
                <Typography mt={3} color="success" level="h3">
                  Success!
                </Typography>
                <Typography level='body-lg'>
                  Biometric authentication enabled successfully!
                </Typography>
              </Box>
            </Box>
          )}
        </div>
      </ModalDialog>
    </Modal>
  );
}
