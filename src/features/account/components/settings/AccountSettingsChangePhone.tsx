// react
import { useState } from 'react';
// Yup
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// types
import { ISnackbarProps } from 'src/types/snackbar';
// routes
import { useRouter } from 'next/router';
import { PATHS } from 'src/routes';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Typography, Snackbar, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// contexts
import { useAuthContext } from 'src/contexts';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// data
import { countries } from 'src/data';
// axios
import axios from 'src/lib/axios';
// components
import FormProvider, { RHFPhoneField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function AccountSettingsChangePhone() {
  const isMdUp = useResponsive('up', 'md');
  const theme = useTheme();
  const router = useRouter();
  const [showSnackbar, setShowSnackbar] = useState<ISnackbarProps>({
    show: false,
    severity: 'success',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { fetchUser } = useAuthContext();

  const ChangePhoneSchema = Yup.object().shape({
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
    phoneNumber: '+351',
  };

  const methods = useForm<typeof defaultValues>({
    mode: 'onBlur',
    resolver: yupResolver(ChangePhoneSchema),
    defaultValues,
  });

  const {
    setValue,
    getValues,
    formState: { isValid },
  } = methods;

  const changeUserPhoneNumber = async (newPhone) => {
    try {
      await axios.post('/auth/account/change-phone', {
        phone: newPhone,
      });
      fetchUser();
      router.push(PATHS.auth.verifyPhone);
    } catch (error) {
      setShowSnackbar({
        show: true,
        severity: 'error',
        message: 'Algo correu mal, tente novamente.',
      });
      console.error('error', error);
    }
  };

  const handleOnSubmit = async () => {
    setIsSubmitting(true);
    const data = getValues();
    // Remove spaces from the phone number
    const newPhone = data.phoneNumber.replace(/\s/g, '') as string;
    try {
      await changeUserPhoneNumber(newPhone);
    } catch (error) {
      console.error('error', error);
    }
    setIsSubmitting(false);
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
    </>
  );
}
