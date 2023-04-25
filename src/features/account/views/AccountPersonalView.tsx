import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
// auth
import { useAuthContext } from 'src/contexts';
// @mui
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
import { Box, Avatar, Typography, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// assets
import { countries, genders } from 'src/data';
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

  const AccountPersonalSchema = Yup.object().shape({
    firstName: Yup.string().required('O nome é obrigatório.'),
    lastName: Yup.string().required('O apelido é obrigatório.'),
    emailAddress: Yup.string().required('O email é obrigatório.'),
    birthday: Yup.string().required('O aniversário é obrigatório.'),
    gender: Yup.string().required('O género é obrigatório.'),
    streetAddress: Yup.string().required('A morada is required.'),
    city: Yup.string().required('A cidade é obrigatória.'),
    zipCode: Yup.string().required('O código postal é obrigatório.'),
    phoneNumber: Yup.string()
      .test('phoneNumber', 'O número de telemóvel é obrigatório', (value) => {
        console.log('value =', value);
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
    firstName: user?.name ? user.name.split(' ')[0] : null,
    lastName: user?.name ? user.name.split(' ').pop() : null,
    emailAddress: user?.email ? user.email : null,
    phoneNumber: user?.phone ? user.phone : null,
    birthday: user?.birthdate ? user.birthdate : null,
    gender: user?.gender ? user.gender : null,
    streetAddress: user?.address.street ? user.address.street : null,
    zipCode: user?.address.postal_code ? user.address.postal_code : null,
    city: user?.address.city ? user.address.city : null,
    country: user?.address.country ? user.address.country : null,
  };

  const methods = useForm<typeof defaultValues>({
    mode: 'onChange',
    resolver: yupResolver(AccountPersonalSchema),

    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = methods;

  const onSubmit = async (data: typeof defaultValues) => {
    try {
      if (user) {
        user.name = `${data.firstName} ${data.lastName}`;
        user.email = data.emailAddress;
        user.phone = data.phoneNumber;
        user.birthdate = data.birthday;
        user.gender = data.gender;
        user.address.street = data.streetAddress;
        user.address.postal_code = data.zipCode;
        user.address.city = data.city;
        user.address.country = data.country;
        updateUser(user);
        reset(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AccountLayout>
      <Box
        sx={{
          p: 3,
          bgcolor: 'white',
          borderRadius: '16px',
          boxShadow:
            'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
        }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Dados Pessoais
          </Typography>
          {!isMdUp && (
            <Box
              sx={{
                width: '100%',
                pb: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '15px',
              }}
            >
              <UploadPictureModal open={openModal} onClose={() => setOpenModal(false)} />
              <Avatar
                onClick={() => setOpenModal(true)}
                src={user?.profile_picture}
                sx={{ width: '150px', height: '150px' }}
              />
              <Stack
                direction="row"
                alignItems="center"
                onClick={() => setOpenModal(true)}
                sx={{ typography: 'caption', cursor: 'pointer', '&:hover': { opacity: 0.72 } }}
              >
                <Iconify icon="carbon:edit" sx={{ mr: 1 }} />
                Alterar imagem
              </Stack>
            </Box>
          )}
          <Box
            rowGap={2.5}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
          >
            <RHFTextField name="firstName" label="Nome" />

            <RHFTextField name="lastName" label="Apelido" />

            <RHFTextField name="emailAddress" label="Email" />

            <RHFPhoneField
              name="phoneNumber"
              label="Telemóvel"
              defaultCountry="PT"
              forceCallingCode
            />

            <Controller
              name="birthday"
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  format="dd-MM-yyyy"
                  label="Data de nascimento"
                  slotProps={{
                    textField: {
                      helperText: error?.message,
                      error: !!error?.message,
                    },
                  }}
                  {...field}
                  value={new Date(field.value)}
                />
              )}
            />

            <RHFSelect native name="gender" label="Género">
              {genders.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </RHFSelect>

            <RHFTextField name="streetAddress" label="Morada" />

            <RHFTextField name="zipCode" label="Código Postal" />

            <RHFTextField name="city" label="Cidade" />

            <RHFSelect native name="country" label="País">
              <option value="" />
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.label}
                </option>
              ))}
            </RHFSelect>
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
      </Box>
    </AccountLayout>
  );
}
