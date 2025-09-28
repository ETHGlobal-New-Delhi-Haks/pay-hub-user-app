import {
  Box,
  Button,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
} from '@mui/joy';
import { AlertTriangle, Shield } from 'lucide-react';
import theme from '../../theme';

type Props = {
  open: boolean;
  setIsOpen: (val: boolean) => void;
  onConfirm: VoidFunction;
};

export function BiometricAcceptingDialog({
  open,
  setIsOpen,
  onConfirm,
}: Props) {
  return (
    <Modal open={open} onClose={() => setIsOpen(false)}>
      <ModalDialog size="lg" sx={{ maxWidth: 500, width: 'calc(100% - 24px)' }}>
        <ModalClose />
        <Box>
          <Typography level="h2" display="flex" alignItems="center" gap={2}>
            <Box
              color="warning.500"
              bgcolor="warning.100"
              borderRadius="50%"
              width={50}
              height={50}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <AlertTriangle size={24} />
            </Box>
            Biometric Data Storage
          </Typography>
          <Typography mt={1}>
            Your biometric data will be securely stored on our servers to enable
            fast and secure payments. This data is encrypted and used only for
            authentication purposes.
          </Typography>
        </Box>
        <Box
          mt={2}
          display="flex"
          gap={1}
          p={2}
          sx={{ background: theme.palette.primary[100], borderRadius: 8 }}
        >
          <Shield />
          <Typography>
            Your data is encrypted and protected according to industry standards
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={() => setIsOpen(false)} fullWidth>
            Cancel
          </Button>
          <Button onClick={onConfirm} fullWidth>
            Permit
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
}
