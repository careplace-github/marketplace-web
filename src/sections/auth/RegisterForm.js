import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
// icons
import viewIcon from '@iconify/icons-carbon/view';
import viewOff from '@iconify/icons-carbon/view-off';
// @mui
import { LoadingButton } from '@mui/lab';
import { Typography, Stack, Link, TextField, IconButton, InputAdornment } from '@mui/material';
// components
import { Iconify } from '../../components';
import { useAuthContext } from '../../auth/useAuthContext';
import Router from 'next/router';


// ----------------------------------------------------------------------

const FormSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Nome é obrigatório')
    .min(6, 'Minímo de 6 caracteres')
    .max(20, 'Máximo de 20 caracteres'),
  email: Yup.string().required('Email é obrigatório').email('Insira um email válido'),
  phoneNumber: Yup.string().required('Número de Telemóvel é obrigatório'),
  password: Yup.string()
    .required('Insira uma Password')
    .min(6, 'Password incorreta'),
  confirmPassword: Yup.string()
    .required('Confirme a sua password')
    .oneOf([Yup.ref('password')], "Password não corresponde"),
});

export default function RegisterForm() {
  const { register } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);

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
      fullName: '',
      email: '',
      phoneNumber:'',
      password: '',
      confirmPassword: '',
    },
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      if (register) {
        await register(data.email, data.password, data.firstName, data.lastName);
      }
     // await new Promise((resolve) => setTimeout(resolve, 500));
    
     Router.push({ pathname: '/home' });

    alert(JSON.stringify(data, null, 2  ));

    
    

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
      <Stack spacing={2.5}>
        <Controller
          name="fullName"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Nome Completo"
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />

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
          name="phoneNumber"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              label="Telemóvel"
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

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Confirm Password"
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

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Registar
        </LoadingButton>

        <Typography variant="caption" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
          Concordo com os
          <Link color="text.primary" href="#">
            {''} Termos e Condições {''}
          </Link>
          e a
          <Link color="text.primary" href="#">
            {''} Política de privacidade
          </Link>
        </Typography>
      </Stack>
    </form>
  );
}
