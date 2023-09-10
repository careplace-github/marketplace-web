import { useForm } from 'react-hook-form';
// auth
import { useSession } from 'next-auth/react';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import FormProvider, { RHFSwitch } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function AccountSettingsGeneral() {
  const isMdUp = useResponsive('up', 'md');

  const theme = useTheme();

  const defaultValues = {
    marketing_notifications: false,
  };

  const methods = useForm<typeof defaultValues>({
    mode: 'onChange',
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  const onSubmit = async (data) => {
    reset(data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Conta
      </Typography>

      <Box
        rowGap={2.5}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      >
        <RHFSwitch
          name="marketing_notifications"
          label="Receber notificações de marketing"
          sx={{ mt: 3 }}
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
          Guardar
        </LoadingButton>
      </Box>
    </FormProvider>
  );
}
