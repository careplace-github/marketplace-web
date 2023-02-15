import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
// icons
import viewIcon from '@iconify/icons-carbon/view';
import viewOff from '@iconify/icons-carbon/view-off';
// next
import NextLink from 'next/link';
// @mui
import { LoadingButton } from '@mui/lab';
import { Stack, Link, TextField, IconButton, InputAdornment } from '@mui/material';
// routes
import Routes from '../../routes';
// components
import { Iconify } from '../../components';
import { useAuthContext } from '../../auth/useAuthContext';
import Router from 'next/router';

// ----------------------------------------------------------------------

const FormSchema = Yup.object().shape({
  email: Yup.string().required('Email é obrigatório').email('Coloque um email válido'),
  password: Yup.string()
    .required('Password é obrigatória')
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthContext();


  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    //await new Promise((resolve) => setTimeout(resolve, 500));
      try {
        await login(data.email, data.password);
        if(localStorage.getItem('accessToken') !== undefined) {
          alert(JSON.stringify("Autenticação bem sucedida", null, 2  ));
          Router.push({ pathname: '/home' });
        }
      } catch (error) {
        console.error(error);
  
        reset();
  
        setError('afterSubmit', {
          ...error,
          message: error.message,
        });
      }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5} alignItems="flex-end">
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              label="Email"
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Iconify icon={showPassword ? viewIcon : viewOff} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />

        <NextLink href={Routes.resetPassword} passHref>
          <Link variant="body3" underline="always" color="text.secondary">
            Esqueceu-se da password?
          </Link>
        </NextLink>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Stack>
    </form>
  );
}
