// react
import { useState } from 'react';
// Yup
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// types
import { ISnackbarProps } from 'src/types/snackbar';
// routes
import { useRouter } from 'next/router';
import { PATHS } from 'src/routes';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Typography, Stack, InputAdornment, IconButton, Snackbar, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// contexts
import { useAuthContext } from 'src/contexts';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function AccountSettingsChangeEmail() {
  const isMdUp = useResponsive('up', 'md');
  const theme = useTheme();
  const router = useRouter();
  const [showSnackbar, setShowSnackbar] = useState<ISnackbarProps>({
    show: false,
    severity: 'success',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { changePassword } = useAuthContext();

  const ChangePasswordSchema = Yup.object().shape({
    newEmail: Yup.string()
      .required('O email é obrigatório.')
      .email('O email inserido não é válido.'),
  });

  const defaultValues = {
    newEmail: '',
  };

  const methods = useForm<typeof defaultValues>({
    mode: 'onBlur',
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    getValues,
    formState: { isDirty, errors, isValid },
  } = methods;

  const handleOnSubmit = async () => {
    setIsSubmitting(true);
    try {
      const data = getValues();
      console.log('data', data);
    } catch (error) {
      setShowSnackbar({
        show: true,
        severity: 'error',
        message: 'Algo correu mal, tente novamente.',
      });
      console.log('error', error);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <Snackbar
        open={showSnackbar.show}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() =>
          setShowSnackbar({
            show: false,
            severity: 'success',
            message: '',
          })
        }
      >
        <Alert
          onClose={() =>
            setShowSnackbar({
              show: false,
              severity: 'success',
              message: '',
            })
          }
          severity={showSnackbar.severity}
          sx={{ width: '100%' }}
        >
          {showSnackbar.message}
        </Alert>
      </Snackbar>
      <FormProvider methods={methods}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Alterar Email
        </Typography>

        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'column' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          rowGap={2.5}
        >
          <RHFTextField name="newEmail" label="Novo Email" type="text" />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <LoadingButton
            sx={{
              width: isMdUp ? 'auto' : '100%',
              mt: isMdUp ? '20px' : '40px',
              backgroundColor: 'primary.main',
              color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
              '&:hover': {
                backgroundColor: 'primary.dark',
                color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
              },
            }}
            color="inherit"
            disabled={!isDirty || !isValid}
            size="large"
            variant="contained"
            loading={isSubmitting}
            onClick={handleOnSubmit}
          >
            Alterar Email
          </LoadingButton>
        </Box>
      </FormProvider>
    </>
  );
}
