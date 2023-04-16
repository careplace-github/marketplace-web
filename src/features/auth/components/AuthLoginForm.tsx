import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { LoadingButton } from '@mui/lab';
import { Stack, Link, Alert, IconButton, InputAdornment } from '@mui/material';
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
  const theme = useTheme();


  const { login } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('O Email é obrigatório.').email('Este email não é válido.'),
    password: Yup.string()
      .required('A Password é obrigatória.')
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
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await login(data.email, data.password);
      setErrorMessage(undefined)
    } catch (error) {
      reset();
      if (error.error.message === "Incorrect username or password.") {
        setErrorMessage("O email ou a password estão incorretos")
      } else {
        setErrorMessage("Algo correu mal. Tente novamente.");
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ width: "100%" }} spacing={2.5} alignItems="center">
        {errorMessage && <Alert sx={{ width: "100%" }} severity="error">{errorMessage}</Alert>}

        <RHFTextField name="email" label="Email" />


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

        <Link
          component={NextLink}
          href={PATHS.auth.resetPassword}
          variant="body2"
          underline="always"
          color="text.secondary"
        >
          Esqueceu-se da password?
        </Link>

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
              color:
                theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
            },
          }}
        >
          Entrar
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

