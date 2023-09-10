// react
import { useState } from 'react';
// Yup
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// types
import { ISnackbarProps } from 'src/types/snackbar';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Typography, Stack, InputAdornment, IconButton, Snackbar, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// contexts
import { useSession } from 'next-auth/react';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// lib
import fetch from 'src/lib/fetch';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function AccountPersonalView() {
  const isMdUp = useResponsive('up', 'md');
  const theme = useTheme();
  const [showSnackbar, setShowSnackbar] = useState<ISnackbarProps>({
    show: false,
    severity: 'success',
    message: '',
  });

  const { data: user } = useSession();

  const passwordRequirements =
    'A sua Password deve conter pelo menos: 8 caracteres, 1 número, 1 letra maiúscula e 1 letra minúscula';

  const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('A Password Antiga é obrigatória.'),
    newPassword: Yup.string()
      .required('A Nova Password  é obrigatória.')
      .min(8, 'A password deve ter pelo menos 8 caracteres.'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'As Passwords não coincidem.')
      .required('A Confirmação de Password é obrigatória.'),
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleShowConfirmNewPassword = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm<typeof defaultValues>({
    mode: 'onBlur',
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    watch,
    formState: { isSubmitting, isDirty, isValid },
  } = methods;

  const oldPassword = watch('oldPassword');
  const newPassword = watch('newPassword');
  const confirmNewPassword = watch('confirmNewPassword');

  const onSubmit = async (data: typeof defaultValues) => {
    try {
      await fetch(`/api/auth/change-password`, {
        method: 'POST',
        body: JSON.stringify({
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        }),
      });

      setShowSnackbar({
        show: true,
        severity: 'success',
        message: 'A sua Palavra-passe foi alterada com sucesso.',
      });
      reset();
    } catch (error) {
      setShowSnackbar({
        show: true,
        severity: 'error',
        message: 'Algo correu mal, tente novamente.',
      });
      console.error(error);
    }
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
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Alterar Password
        </Typography>

        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'column' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          rowGap={2.5}
        >
          <RHFTextField
            name="oldPassword"
            label="Password Antiga"
            type={showOldPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowOldPassword} edge="end">
                    <Iconify icon={showOldPassword ? 'carbon:view' : 'carbon:view-off'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <RHFTextField
            name="newPassword"
            label="Nova Password"
            type={showNewPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowNewPassword} edge="end">
                    <Iconify icon={showNewPassword ? 'carbon:view' : 'carbon:view-off'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <RHFTextField
            name="confirmNewPassword"
            label="Confirmar Nova Password"
            type={showConfirmNewPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowConfirmNewPassword} edge="end">
                    <Iconify icon={showConfirmNewPassword ? 'carbon:view' : 'carbon:view-off'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Stack
            component="span"
            direction="row"
            alignItems="center"
            sx={{ fontSize: '12px', color: 'text.secondary', width: '100%' }}
          >
            <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> {passwordRequirements}
          </Stack>
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
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Alterar Password
          </LoadingButton>
        </Box>
      </FormProvider>
    </>
  );
}
