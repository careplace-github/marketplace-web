import * as Yup from 'yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// next
import { useRouter } from 'next/router';
// @mui
import { LoadingButton } from '@mui/lab';
import { Typography, Stack, Alert, Link, IconButton, InputAdornment, Tooltip } from '@mui/material';
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
  firstName: string;
  lastName: string;
  phoneNumber: string;
  confirmPassword: string;
};

export default function AuthRegisterForm() {
  const { push } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const { register } = useAuthContext();

  const theme = useTheme();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //   Password minimum length
  // 8 character(s)

  // Password requirements
  // Contains at least 1 number
  // Contains at least 1 uppercase letter
  // Contains at least 1 lowercase letter
  const passwordRequirements =
    'A sua Password deve conter pelo menos: 1 número, 1 letra maiúscula e 1 letra minúscula';

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('O nome é obrigatório.')
      .min(3, 'O nome deve ter pelo menos 3 caracteres.')
      .max(50, 'O nome deve ter no máximo 50 caracteres.'),
    lastName: Yup.string()
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
    phoneNumber: Yup.string()
      .test('phoneNumber', 'O número de telemóvel é obrigatório', (value) => {
        // If the value is equal to a country phone number, then it is empty
        const code = countries.find((country) => country.phone === value?.replace('+', ''))?.phone;
        const phoneNumber = value?.replace('+', '');

        return code !== phoneNumber;
      })
      .test('phoneNumber', 'O número de telemóvel introduzido não é válido.', (value) => {
        // Portuguese phone number verification
        if (value?.startsWith('+351')) {
          // Remove spaces and the +351 sign
          value = value?.replace(/\s/g, '').replace('+351', '');

          // Check if the phone number is valid
          return value?.length === 9;
        }

        return true;
      }),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '+351',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      setIsSubmitting(true);

      // Get the country from the /data/countries.ts file by the phone number
      const countryCode = (
        countries.find(
          (country) =>
            country.phone ===
            data.phoneNumber.slice(0, data.phoneNumber.indexOf(' ')).replace('+', '')
        ) as any
      ).code;
      // get the frst character unil the first space eg: +351 123 456 789 => +351

      // Remove spaces from the phone number
      const phone = data.phoneNumber.replace(/\s/g, '') as string;

      // Create the user object

      const payload: IUserProps = {
        customer: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,

          phone,
          address: {
            country: countryCode,
          },
        },
        password: data.password,
      };

      await register(payload);

      enqueueSnackbar('Conta criada com sucesso.', { variant: 'success' });

      push({
        pathname: PATHS.auth.verifyCode,
        query: {
          email: data.email,
        },
      });

      setErrorMessage(undefined);
    } catch (error) {
      setIsSubmitting(false);

      enqueueSnackbar('Erro ao criar conta. Por favor tente novamente', { variant: 'error' });

      if (error?.error?.message.includes('Password did not conform with policy:')) {
        setErrorMessage('A password inserida não cumpre todos os requisitos.');
        return;
      }
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
      <Stack spacing={2.5}>
        {errorMessage && (
          <Alert sx={{ width: '100%' }} severity="error">
            {errorMessage}
          </Alert>
        )}

        <RHFTextField name="firstName" label="Nome" />
        <RHFTextField name="lastName" label="Apelido" />

        <RHFTextField name="email" label="Email" />

        <RHFPhoneField
          name="phoneNumber"
          label="Telemóvel"
          defaultCountry="PT"
          forceCallingCode
          flagSize="small"
          onChange={(value: string) => {
            /**
             * Portuguese Number Validation
             */

            // If the value is +351 9123456780 -> 15 digits and has no spaces, add the spaces. (eg: +351 9123456780 -> +351 912 345 678)
            if (value.length === 15 && value[8] !== ' ' && value[12] !== ' ') {
              // (eg: +351 9123456780 -> +351 912 345 678)
              const newValue = `${value.slice(0, 8)} ${value.slice(8, 11)} ${value.slice(11, 14)}`;
              setValue('phoneNumber', newValue);
              return;
            }

            // Limit the phone to 16 digits. (eg: +351 912 345 678 -> 16 digits)
            if (value.length > 16) {
              return;
            }

            setValue('phoneNumber', value);
          }}
        />
        <Tooltip arrow title={passwordRequirements}>
          <div>
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
          </div>
        </Tooltip>

        <Tooltip arrow title={passwordRequirements}>
          <div>
            <RHFTextField
              name="confirmPassword"
              label="Confirmar Password"
              type={showConfirmPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      <Iconify icon={showConfirmPassword ? 'carbon:view' : 'carbon:view-off'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </Tooltip>

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
