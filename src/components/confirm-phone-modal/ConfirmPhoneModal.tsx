// mui
import { Modal, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// components
import Iconify from 'src/components/iconify';

// hooks
import useResponsive from 'src/hooks/useResponsive';
import PhoneVerifyCodeForm from 'src/features/auth/components/PhoneVerifyCodeForm';

type Props = {
  open: boolean;
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
  setShowSnackbar?: (obj: any) => void;
  updateOrder?: boolean;
  onSuccess: () => void;
};

export default function ConfirmPhoneModal({
  open,
  onSuccess,
  onClose,
  setShowSnackbar,
  updateOrder,
}: Props) {
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose({}, 'backdropClick');
      }}
    >
      <Box
        sx={{
          width: isMdUp ? 'auto' : '100vw',
          height: isMdUp ? 'auto' : '100vh',
          //   minWidth: isMdUp ? '800px' : undefined,
          maxHeight: isMdUp ? '90vh' : '100vh',
          p: isMdUp ? '50px' : '20px',
          pt: isMdUp ? '50px' : '75px',
          pb: isMdUp ? '50px' : '75px',
          backgroundColor: 'white',
          borderRadius: isMdUp ? '16px' : '0',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translateY(-50%) translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          overflowY: 'auto',
        }}
      >
        <Iconify
          width={30}
          height={30}
          icon="material-symbols:close-rounded"
          sx={{
            position: 'absolute',
            top: isMdUp ? '50px' : '72px',
            right: isMdUp ? '50px' : '20px',
            cursor: 'pointer',
            '&:hover': {
              cursor: 'pointer',
              color: theme.palette.mode === 'light' ? 'grey.400' : 'white',
            },
          }}
          onClick={() => {
            onClose({}, 'backdropClick');
          }}
        />
        <Typography variant="h5" sx={{ mb: 3, width: '100%', alignText: 'left' }}>
          Confirmar Telemóvel
        </Typography>

        <Typography
          variant="body2"
          sx={{ mt: 2, mb: 2, color: 'text.secondary', textAlign: 'center' }}
        >
          {`Para ${
            updateOrder ? 'atualizar um pedido' : 'efetuar um pedido de orçamento'
          } necessita de ter o seu número de telémovel
          confirmado.`}
        </Typography>
        <Typography variant="body2" sx={{ mb: 5, color: 'text.secondary', textAlign: 'center' }}>
          Enviámos-lhe um código com 6 dígitos para o seu telemóvel. Por favor escreva o código
          abaixo para confirmar o número associado.
        </Typography>

        <PhoneVerifyCodeForm
          setShowSnackbar={setShowSnackbar}
          onPhoneConfirm={() => {
            onSuccess();
            onClose({}, 'backdropClick');
          }}
        />
      </Box>
    </Modal>
  );
}
