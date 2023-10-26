import { useState, useEffect } from 'react';
import * as Yup from 'yup';
// next
import { useRouter } from 'next/router';
import NextLink from 'next/link';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  FormHelperText,
  Box,
  Typography,
  Link,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATHS } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFCodes } from 'src/components/hook-form';
import useCountdown from 'src/hooks/useCountdown';
// lib
import axios from 'src/lib/axios';
// contexts
import { useAuthContext } from 'src/contexts';

// ----------------------------------------------------------------------

type FormValuesProps = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function AuthNewPasswordForm() {
  const { enqueueSnackbar } = useSnackbar();

  const { push } = useRouter();
  const router = useRouter();

  const [emailRecovery, setEmailRecovery] = useState(router.query.email as string | null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resendAvailable, setResendAvailable] = useState(false);
  // The component takes around 2 seconds to initialize so we need to set the countdown to 47 seconds for it to start at 45
  const countdown = useCountdown(new Date(Date.now() + 47000));

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required('Code is required'),
    code2: Yup.string().required('Code is required'),
    code3: Yup.string().required('Code is required'),
    code4: Yup.string().required('Code is required'),
    code5: Yup.string().required('Code is required'),
    code6: Yup.string().required('Code is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const defaultValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',
    email: emailRecovery || '',
    password: '',
    confirmPassword: '',
  };
  const { forgotPassword, resetPassword } = useAuthContext();

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
    getValues,
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const code =
        getValues('code1') +
        getValues('code2') +
        getValues('code3') +
        getValues('code4') +
        getValues('code5') +
        getValues('code6');

      await resetPassword(data.email, code, data.password);

      // Show success message popup
      enqueueSnackbar('Change password success!');

      push(PATHS.auth.login);
    } catch (error) {
      console.error(error);

      // Show error message popup
      enqueueSnackbar('Change password failed!');
    }
  };

  /**
   * Resend the reset password code
   */
  const onResendCode = async () => {
    try {
      const email = getValues('email');

      if (!email || email == '' || errors.email) return;

      // The component takes around 2 seconds to initialize so we need to set the countdown to 47 seconds for it to start at 45
      countdown.update(new Date(Date.now() + 47000));

      // Wait 1 second for the countdown component to update
      setTimeout(() => {
        setResendAvailable(false);
      }, 1000);

      await forgotPassword(email);

      // Show success message popup
      enqueueSnackbar('Code sent successfully!');
    } catch (error) {
      // Show error message popup
      console.error(error);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      if (router.query.email) {
        setEmailRecovery(router.query.email as string);
        setValue('email', router.query.email as string, { shouldDirty: true });
      }
    }
  }, [router.isReady, router.query?.email, emailRecovery]);

  // Set the resendvaialble to true when the countdown ends
  useEffect(() => {
    // The countdown starts at 00 so we need to check if it's 01 and if the resend is not available yet
    if (countdown.seconds == '01' && resendAvailable == false) {
      // Reset the resend available

      // Wait 1 second
      setTimeout(() => {
        setResendAvailable(true);
      }, 1000);
    }
  }, [countdown]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email" disabled={!!emailRecovery} />

        <RHFCodes
          keyName="code"
          inputs={['code1', 'code2', 'code3', 'code4', 'code5', 'code6']}
          sx={{
            justifyContent: 'space-between',
          }}
        />

        {resendAvailable && (
          <Typography variant="body2" sx={{ my: 3 }}>
            Não recebeu o código? &nbsp;
            <Link
              variant="subtitle2"
              onClick={() => onResendCode()}
              sx={{
                cursor: 'pointer',
              }}
            >
              Pedir novo código
            </Link>
          </Typography>
        )}

        {!resendAvailable && (
          // Add margin bottom to the text
          <Typography variant="body2" sx={{}}>
            Poderá pedir um novo código em:
          </Typography>
        )}

        {!resendAvailable && (
          // Add margin bottom to the text
          <Typography
            variant="body2"
            color="primary"
            sx={{
              fontWeight: 'bold',
              mt: -20,
            }}
          >
            {countdown.seconds} segundos
          </Typography>
        )}

        {(!!errors.code1 ||
          !!errors.code2 ||
          !!errors.code3 ||
          !!errors.code4 ||
          !!errors.code5 ||
          !!errors.code6) && (
          <FormHelperText error sx={{ px: 2 }}>
            Code is required
          </FormHelperText>
        )}

        <RHFTextField
          name="password"
          label="Nova Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="confirmPassword"
          label="Confirmar Nova Password"
          type={showConfirmPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Alterar Password
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
