import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { LoadingButton } from '@mui/lab';
import { Stack, Alert, IconButton, InputAdornment, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// routes
import { PATHS } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
// auth
import { useAuthContext } from 'src/contexts/useAuthContext';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  password: string;
  afterSubmit?: string;
};

export default function AuthLoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const theme = useTheme();

  const { login } = useAuthContext();

  const { pathname, push } = useRouter();
  const router = useRouter();

  const handleForgotPassword = () => {
    const path = methods.getValues('email')
      ? `${PATHS.auth.forgotPassword}?email=${methods.getValues('email')}`
      : PATHS.auth.forgotPassword;
    push(path);
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('O email é obrigatório.').email('O email inserido não é válido.'),
    password: Yup.string().required('A password é obrigatória.'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    getValues,
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: FormValuesProps) => {
    try {
      setIsSubmitting(true);
      await login(data.email, data.password);
      setErrorMessage(undefined);
    } catch (error) {
      console.error(error);
      if (error.error.message === 'User is not confirmed.') {
        setIsSubmitting(false);
        router.push(
          {
            pathname: PATHS.auth.verifyCode,
            query: {
              email: data.email,
              resend: true,
            },
          },
          PATHS.auth.verifyCode
        );
        return;
      }
      setIsSubmitting(false);
      switch (error?.error?.type) {
        case 'UNAUTHORIZED':
          setErrorMessage('O email ou a password estão incorretos.');
          break;
        default:
          setErrorMessage('Algo correu mal. Por favor tente novamente.');
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5} alignItems="flex-end">
        {errorMessage && (
          <Alert sx={{ width: '100%', textAlign: 'left' }} severity="error">
            {errorMessage}
          </Alert>
        )}

        <RHFTextField name="email" label="Email" type="email" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  <Iconify icon={showPassword ? 'carbon:view' : 'carbon:view-off'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Typography
          onClick={handleForgotPassword}
          variant="body2"
          sx={{ cursor: 'pointer', textDecoration: 'underline' }}
          color="text.secondary"
        >
          Esqueceu-se da password?
        </Typography>

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{
            px: 4,
            bgcolor: 'primary.main',
            color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
            '&:hover': {
              bgcolor: 'primary.dark',
              color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
            },
          }}
        >
          Entrar
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
