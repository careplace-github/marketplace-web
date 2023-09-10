import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { PATHS } from 'src/routes';

// auth
import { useSession } from 'next-auth/react';
// @mui
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
import { Box, Avatar, Typography, Stack, Snackbar, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// assets
import { countries, genders } from 'src/data';
// hooks
import useResponsive from 'src/hooks/useResponsive';
import { useRouter } from 'next/router';
// types
import { ISnackbarProps } from 'src/types/snackbar';
// components
import Iconify from 'src/components/iconify';
import RHFPhoneField from 'src/components/hook-form/RHFPhoneField';
import FormProvider, { RHFTextField, RHFSelect } from 'src/components/hook-form';
import UploadPictureModal from '../components/UploadPictureModal';
//
import { AccountLayout } from '../components';

// ----------------------------------------------------------------------

type props = {
  updatedUser: Object;
};

export default function AccountPersonalView({ updatedUser }: props) {
  const [openModal, setOpenModal] = useState(false);
  const isMdUp = useResponsive('up', 'md');
  const { data: user } = useSession();
  const [customIsDirty, setCustomIsDirty] = useState<boolean>(false);
  const [customIsValid, setCustomIsValid] = useState<boolean>(true);
  const router = useRouter();

  const [showSnackbar, setShowSnackbar] = useState<ISnackbarProps>({
    show: false,
    severity: 'success',
    message: '',
  });
  const theme = useTheme();

  const AccountPersonalSchema = Yup.object().shape({
    firstName: Yup.string().required('O nome é obrigatório.'),
    lastName: Yup.string().required('O apelido é obrigatório.'),
    emailAddress: Yup.string().required('O email é obrigatório.'),
    birthdate: Yup.string().nullable(),
    gender: Yup.string().nullable(),
    streetAddress: Yup.string().nullable().max(100, 'O número máximo de caracteres é 100'),
    city: Yup.string().nullable().max(15, 'O número máximo de caracteres é 15'),
    zipCode: Yup.string()
      .nullable()
      .test('zipCode', 'Insira um código de postal válido (XXXX-XXX)', (value) => {
        if (value) {
          const showErrorMessage = value.includes('-') && value.length === 8;
          return showErrorMessage;
        }
        return true;
      }),
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
    firstName: user?.name ? user.name.split(' ')[0] : '',
    lastName: user?.name ? user.name.split(' ').pop() : '',
    emailAddress: user?.email ? user.email : '',
    phoneNumber: user?.phone ? user.phone : '',
    birthdate: user?.birthdate ? user.birthdate : '',
    gender: user?.gender ? user.gender : '',
    streetAddress: user && user.address && user.address.street ? user.address.street : '',
    zipCode: user && user.address && user.address.postal_code ? user.address.postal_code : '',
    city: user && user.address && user.address.city ? user.address.city : '',
    country: user && user.address && user.address.country ? user.address.country : '',
  };

  const methods = useForm<typeof defaultValues>({
    mode: 'onChange',
    resolver: yupResolver(AccountPersonalSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    getValues,
    formState: { isSubmitting, isDirty, isValid },
  } = methods;

  const onSubmit = async (data: typeof defaultValues) => {
    try {
      if (user) {
        user.name = `${data.firstName.split(' ')[0]} ${data?.lastName?.split(' ')[0]}`;
        user.email = data.emailAddress;
        user.phone = data.phoneNumber;
        user.birthdate = data.birthdate;
        if (data.gender) {
          user.gender = data.gender;
        }
        user.address.street = data.streetAddress;
        user.address.postal_code = data.zipCode;
        user.address.city = data.city;
        user.address.country = data.country;

        await fetch('/api/account', {
          method: 'PUT',
          body: JSON.stringify(user),
        });

        setShowSnackbar({
          show: true,
          severity: 'success',
          message: 'Os seus dados foram atualizados com sucesso.',
        });
        reset(data);
        setCustomIsDirty(false);
      }
    } catch (error) {
      setShowSnackbar({
        show: true,
        severity: 'error',
        message: 'Algo correu mal, tente novamente.',
      });
      console.error(error);
    }
  };

  const handleConfirmPhoneClick = async () => {
    try {
      await fetch('/api/account/phone/verify', {
        method: 'POST',
      });
    } catch (error) {
      console.error(error);
    }
    router.push(PATHS.auth.verifyPhone);
  };

  return (
    <>
      <Snackbar
        open={showSnackbar.show}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() =>
          setShowSnackbar({
            show: false,
            severity: 'success',
            message: '',
          })
        }
      >
        <Alert
          onClose={() =>
            setShowSnackbar({
              show: false,
              severity: 'success',
              message: '',
            })
          }
          severity={showSnackbar.severity}
          sx={{ width: '100%' }}
        >
          {showSnackbar.message}
        </Alert>
      </Snackbar>
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
              <RHFTextField
                name="firstName"
                label="Nome"
                onChange={(e) => {
                  const { value } = e.target;

                  if (!/^[a-zA-Z-]*$/.test(value)) {
                    return;
                  }

                  if (value.length > 20) {
                    return;
                  }

                  setValue('firstName', value);
                  setCustomIsDirty(true);
                }}
              />

              <RHFTextField
                name="lastName"
                label="Apelido"
                onChange={(e) => {
                  const { value } = e.target;

                  if (!/^[a-zA-Z-]*$/.test(value)) {
                    return;
                  }
                  if (value.length > 20) {
                    return;
                  }
                  setValue('lastName', value);
                  setCustomIsDirty(true);
                }}
              />

              <Box>
                <RHFTextField
                  name="emailAddress"
                  label="Email"
                  disabled
                  tooltip={{
                    tooltipWidth: '200px',
                    icon: user?.email_verified === true ? 'simple-line-icons:check' : 'ep:warning',
                    text:
                      user?.email_verified === true
                        ? 'O seu email foi verificado com sucesso!'
                        : 'O seu email não está verificado.',
                    iconColor: user?.email_verified === true ? 'green' : 'orange',
                  }}
                />
                {user?.email_verified !== true && (
                  <Typography
                    onClick={() => {}}
                    sx={{
                      color: 'text.disabled',
                      width: 'fit-content',
                      fontSize: '12px',
                      pl: '5px',
                      pt: '5px',
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    Confirmar email
                  </Typography>
                )}
              </Box>
              <Box>
                <RHFPhoneField
                  name="phoneNumber"
                  label="Telemóvel"
                  defaultCountry="PT"
                  forceCallingCode
                  disabled
                  tooltip={{
                    tooltipWidth: '200px',
                    icon: user?.phone_verified === true ? 'simple-line-icons:check' : 'ep:warning',
                    text:
                      user?.phone_verified === true
                        ? 'O seu telemóvel foi verificado com sucesso!'
                        : 'O seu telemóvel não está verificado.',
                    iconColor: user?.phone_verified === true ? 'green' : 'orange',
                  }}
                  onChange={(value: string) => {
                    /**
                     * Portuguese Number Validation
                     */

                    // If the value is +351 9123456780 -> 15 digits and has no spaces, add the spaces. (eg: +351 9123456780 -> +351 912 345 678)
                    if (value.length === 15 && value[8] !== ' ' && value[12] !== ' ') {
                      // (eg: +351 9123456780 -> +351 912 345 678)
                      const newValue = `${value.slice(0, 8)} ${value.slice(8, 11)} ${value.slice(
                        11,
                        14
                      )}`;
                      setValue('phoneNumber', newValue);
                      return;
                    }

                    // Limit the phone to 16 digits. (eg: +351 912 345 678 -> 16 digits)
                    if (value.length > 16) {
                      return;
                    }

                    setValue('phoneNumber', value);
                    setCustomIsDirty(true);
                  }}
                />
                {user?.phone_verified !== true && (
                  <Typography
                    onClick={() => {
                      handleConfirmPhoneClick();
                    }}
                    sx={{
                      color: 'text.disabled',
                      width: 'fit-content',
                      fontSize: '12px',
                      pl: '5px',
                      pt: '5px',
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    Confirmar telemóvel
                  </Typography>
                )}
              </Box>

              <Controller
                name="birthdate"
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

              <RHFTextField
                name="zipCode"
                label="Código Postal"
                onChange={(e) => {
                  const { value } = e.target;

                  /**
                   * Only allow numbers and dashes
                   */
                  if (!/^[0-9-]*$/.test(value)) {
                    return;
                  }

                  /**
                   * Portugal Zip Code Validation
                   */
                  if (getValues('country') === 'PT' || getValues('country') === '') {
                    // Add a dash to the zip code if it doesn't have one. Format example: XXXX-XXX
                    if (value.length === 5 && value[4] !== '-') {
                      setValue(
                        'zipCode',
                        `${value[0]}${value[1]}${value[2]}${value[3]}-${value[4]}`
                      );
                      return;
                    }

                    // Do not allow the zip code to have more than 8 digits (XXXX-XXX -> 8 digits)
                    if (value.length > 8) {
                      return;
                    }
                  }

                  if (value.length === 8 && value[4] === '-') {
                    setCustomIsValid(true);
                  } else {
                    setCustomIsValid(false);
                  }
                  setValue('zipCode', value);
                  setCustomIsDirty(true);
                }}
              />

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
                disabled={(!isDirty && !customIsDirty) || !isValid || !customIsValid}
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
    </>
  );
}
