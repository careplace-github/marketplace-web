import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
// @mui
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
import { Box, Avatar, Typography, Stack, InputAdornment, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// assets
import { countries, genders } from 'src/data';
// contexts
import { useAuthContext } from 'src/contexts';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import Iconify from 'src/components/iconify';
import RHFPhoneField from 'src/components/hook-form/RHFPhoneField';
import FormProvider, { RHFTextField, RHFSelect, RHFUploadAvatar } from 'src/components/hook-form';
import UploadPictureModal from '../components/UploadPictureModal';
//
import { AccountLayout } from '../components';


// ----------------------------------------------------------------------

export default function AccountPersonalView() {
  const [openModal, setOpenModal] = useState(false);
  const isMdUp = useResponsive('up', 'md');
  const { user, updateUser } = useAuthContext();
  const theme = useTheme();

  const { changePassword } = useAuthContext();

  const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('A Password Antiga é obrigatóri.'),
    newPassword: Yup.string().required('A Nova Password  é obrigatória.'),
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'As Passwords não coincidem.')
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
    marketing_notifications: user?.notifications?.email,

    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm<typeof defaultValues>({
    mode: 'onChange',
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = methods;

  const onSubmit = async (data: typeof defaultValues) => {
    try {
        await changePassword(data.oldPassword, data.newPassword);
        reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
          disabled={!isDirty}
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Alterar Password
        </LoadingButton>
      </Box>
    </FormProvider>
  );
}
