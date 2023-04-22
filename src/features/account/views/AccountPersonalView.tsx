import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
// auth
import { useAuthContext } from 'src/contexts';

// @mui
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
import { Box, Typography, Stack, IconButton, InputAdornment } from '@mui/material';
// assets
import { countries } from 'src/data';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField, RHFSelect } from 'src/components/hook-form';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import RHFPhoneField from 'src/components/hook-form/RHFPhoneField';
//
import { AccountLayout } from '../components';

// ----------------------------------------------------------------------

const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

// ----------------------------------------------------------------------

export default function AccountPersonalView() {
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useAuthContext();

  console.log(user);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const AccountPersonalSchema = Yup.object().shape({
    firstName: Yup.string().required('O nome é obrigatório'),
    lastName: Yup.string().required('O apelido é obrigatório'),
    emailAddress: Yup.string().required('O email é obrigatório'),
    phoneNumber: Yup.string().required('O telemóvel é obrigatório'),
    birthday: Yup.string().required('O aniversário é obrigatório'),
    gender: Yup.string().required('O género é obrigatório'),
    streetAddress: Yup.string().required('A morada is required'),
    city: Yup.string().required('A cidade é obrigatória'),
    zipCode: Yup.string().required('O código postal é obrigatório'),
  });

  const defaultValues = {
    firstName: user?.name ? user.name.split(' ')[0] : null,
    lastName: user?.name ? user.name.split(' ').pop() : null,
    emailAddress: user?.email ? user.email : null,
    phoneNumber: user?.phone ? user.phone : null,
    birthday: user?.birthdate ? user.birthdate : null,
    gender: user?.gender ? user.gender : null,
    streetAddress: user?.address.street ? user.address.street : null,
    zipCode: user?.address.street ? user.address.street : null,
    city: user?.address.street ? user.address.street : null,
    country: user?.address.street ? user.address.street : null,
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm<typeof defaultValues>({
    resolver: yupResolver(AccountPersonalSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: typeof defaultValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AccountLayout>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Dados Pessoais
        </Typography>

        <Box
          rowGap={2.5}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <RHFTextField name="firstName" label="First Name" />

          <RHFTextField name="lastName" label="Last Name" />

          <RHFTextField name="emailAddress" label="Email Address" />

          <RHFPhoneField
            name="phoneNumber"
            label="Telemóvel"
            defaultCountry="PT"
            forceCallingCode
          />
          {/* <RHFTextField name="phoneNumber" label="Phone Number" /> */}

          <Controller
            name="birthday"
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                label="Birthday"
                slotProps={{
                  textField: {
                    helperText: error?.message,
                    error: !!error?.message,
                  },
                }}
                {...field}
                value={field.value}
              />
            )}
          />

          <RHFSelect native name="gender" label="Gender">
            {GENDER_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </RHFSelect>

          <RHFTextField name="streetAddress" label="Street Address" />

          <RHFTextField name="zipCode" label="Zip Code" />

          <RHFTextField name="city" label="City" />

          <RHFSelect native name="country" label="Country">
            <option value="" />
            {countries.map((country) => (
              <option key={country.code} value={country.label}>
                {country.label}
              </option>
            ))}
          </RHFSelect>
        </Box>

        <Stack spacing={3} sx={{ my: 5 }}>
          <Typography variant="h5"> Change Password </Typography>

          <Stack spacing={2.5}>
            <RHFTextField
              name="oldPassword"
              label="Old Password"
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

            <RHFTextField
              name="newPassword"
              label="New Password"
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

            <RHFTextField
              name="confirmNewPassword"
              label="Confirm New Password"
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
          </Stack>
        </Stack>

        <LoadingButton
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Save Changes
        </LoadingButton>
      </FormProvider>
    </AccountLayout>
  );
}
