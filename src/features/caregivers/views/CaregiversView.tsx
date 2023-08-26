import { useState } from 'react';
// YUP
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Typography, Container, Stack, Grid, Snackbar, Alert } from '@mui/material';
// axios
import axios from 'src/lib/axios';
// components
import LoadingButton from 'src/components/loading-button/LoadingButton';
import FormProvider, { RHFTextField, RHFPhoneField } from 'src/components/hook-form';
// data
import { countries } from 'src/data';
// types
import { ISnackbarProps } from 'src/types/snackbar';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
};

const CaregiversView = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState<ISnackbarProps>({
    show: false,
    severity: 'success',
    message: '',
  });

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
    phoneNumber: '+351',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    getValues,
    setValue,
    reset,
    formState: { isValid },
  } = methods;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const values = getValues();
      const data = {
        name: `${values.firstName.replaceAll(' ', '')} ${values.lastName.replaceAll(' ', '')}`,
        email: values.email,
        phone: values.phoneNumber,
      };
      await axios.post('/leads/caregiver', data);
      setShowSnackbar({
        show: true,
        severity: 'success',
        message: 'Os seus dados foram enviados com sucesso.',
      });
    } catch (error) {
      if (error?.error?.message === 'Lead already exists') {
        setShowSnackbar({
          show: true,
          severity: 'warning',
          message: 'Os seus dados já foram enviados.',
        });
      } else {
        setShowSnackbar({
          show: true,
          severity: 'error',
          message: 'Algo correu mal, tente novamente.',
        });
      }
    }
    reset();
    setIsSubmitting(false);
  };

  return (
    <Container component="main">
      <Snackbar
        open={showSnackbar.show}
        autoHideDuration={5000}
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
      <Stack
        sx={{
          py: 9,
          m: 'auto',
          maxWidth: 600,
          minHeight: '80vh',
          height: 'auto',
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h3">Quer se tornar um Cuidador?</Typography>

        <Typography variant="body2" sx={{ mt: 2, mb: 5, color: 'text.secondary' }}>
          Introduza os seus dados em baixo. Entraremos em contacto consigo assim que possível.
        </Typography>

        <FormProvider methods={methods}>
          <Stack direction="column" gap="20px">
            <Grid container sx={{ justifyContent: 'space-between' }}>
              <Grid sm={5.8} xs={12}>
                <RHFTextField name="firstName" label="Nome" />
              </Grid>
              <Grid sm={5.8} xs={12}>
                <RHFTextField name="lastName" label="Apelido" />
              </Grid>
            </Grid>
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
              }}
            />
            <LoadingButton
              disabled={!isValid}
              label="Confirmar"
              isSubmitting={isSubmitting}
              onClick={handleSubmit}
            />
          </Stack>
        </FormProvider>
      </Stack>
    </Container>
  );
};

export default CaregiversView;
