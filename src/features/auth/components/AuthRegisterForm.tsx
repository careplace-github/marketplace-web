import * as Yup from 'yup';
import React from 'react';
import { MuiTelInput } from 'mui-tel-input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
// @mui
import { LoadingButton } from '@mui/lab';
import { Typography, Stack, Link, IconButton, InputAdornment } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField, RHFPhoneField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
// routes
import { PATHS } from 'src/routes/paths';
// auth
import { useAuthContext } from 'src/contexts';
// data
import { countries } from 'src/data';
// types
import { IUserProps } from 'src/types/user';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  password: string;
  name: string;
  phone: string;
  confirmPassword: string;
};

export default function AuthRegisterForm() {
  const { enqueueSnackbar } = useSnackbar();

  const { register } = useAuthContext();

  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .required('O nome é obrigatório.')
      .min(3, 'O nome deve ter pelo menos 3 caracteres.')
      .max(50, 'O nome deve ter no máximo 50 caracteres.'),
    email: Yup.string()
      .required('O email é obrigatório.')
      .email('O email introduzido não é válido.'),
    password: Yup.string()
      .required('A password é obrigatória.')
      .min(6, 'A password deve ter pelo menos 6 caracteres.')
      .max(50, 'A password deve ter no máximo 50 caracteres.'),
    confirmPassword: Yup.string()
      .required('A confirmação da password é obrigatória.')
      .oneOf([Yup.ref('password')], 'As passwords não coincidem.'),
    phone: Yup.string()

      .test('phone', 'O número de telemóvel é obrigatório', (value) => {
        // If the value is equal to a country phone number, then it is empty
        const code = countries.find((country) => country.phone === value.replace('+', ''))?.phone;
        const phone = value.replace('+', '');

        return code !== phone;
      })

      .test('phone', 'O número de telemóvel introduzido não é válido.', (value) => {
        // Portuguese phone number verification
        if (value.startsWith('+351')) {
          // Remove spaces and the +351 sign
          value = value.replace(/\s/g, '').replace('+351', '');

          // Check if the phone number is valid
          return value.length === 9;
        }

        return true;
      }),
  });

  const defaultValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '+351',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      // Get the country from the /data/countries.ts file by the phone number
      const countryCode = (countries.find((country) => country.phone === data.phone.slice(0, data.phone.indexOf(' ')).replace('+', '')) as any).code;
     // get the frst character unil the first space eg: +351 123 456 789 => +351
      

     console.log("countryCode",countryCode)

      // Remove spaces from the phone number
      const phone = data.phone.replace(/\s/g, '');



      // Create the user object

      const user: IUserProps = {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: phone,
        address: {
          country: countryCode,
        },
      };

      await register(user);

      enqueueSnackbar('Conta criada com sucesso.', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Erro ao criar conta. Por favor tente novamente', { variant: 'error' });
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        <RHFTextField name="name" label="Nome" />

        <RHFTextField name="email" label="Email" />

        <RHFPhoneField
          name="phone"
          label="Telemóvel"
          focusOnSelectCountry
          defaultCountry="PT"
          forceCallingCode
          flagSize="small"
        />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'carbon:view' : 'carbon:view-off'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="confirmPassword"
          label="Confirmar Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'carbon:view' : 'carbon:view-off'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{
            px: 4,

            mb: 30,

            bgcolor: 'primary.main',
            color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
            '&:hover': {
              bgcolor: 'primary.dark',
              color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
            },
          }}
        >
          Criar Conta
        </LoadingButton>

        <Typography variant="caption" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
          {`Ao criar conta declara que leu e aceita os nossos `}
          <Link
            color="text.primary"
            href={PATHS.termsAndConditions}
            underline="always"
            target="_blank"
          >
            Termos e Condições
          </Link>
          {` e a `}
          <Link color="text.primary" href={PATHS.privacyPolicy} underline="always" target="_blank">
            Política de Privacidade.
          </Link>
        </Typography>
      </Stack>
    </FormProvider>
  );
}
