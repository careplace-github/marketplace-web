import { useState } from 'react';
// YUP
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, TextField, Typography, Container, Stack } from '@mui/material';
// routes
import { PATHS } from 'src/routes/paths';
// components
import Logo from 'src/components/logo/Logo';
import LoadingButton from 'src/components/loading-button/LoadingButton';
import FormProvider, { RHFTextField, RHFPhoneField } from 'src/components/hook-form';
// data
import { countries } from 'src/data';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  phoneNumber: string;
};

const ContactUsView = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const RegisterSchema = Yup.object().shape({
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
    formState: { isValid },
  } = methods;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const data = getValues();
    console.log('submit:', data);
    setIsSubmitting(false);
  };

  return (
    <Container component="main">
      <Stack
        sx={{
          py: 9,
          m: 'auto',
          maxWidth: 480,
          minHeight: '80vh',
          height: 'auto',
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 10,
          }}
        >
          <Logo
            disabledLink
            single
            logoWidth="80px"
            sx={{ width: '500px', height: '500px', align: 'center' }}
          />
        </Box>

        <Typography variant="h3">Entre em contacto connosco</Typography>

        <Typography variant="body2" sx={{ mt: 2, mb: 5, color: 'text.secondary' }}>
          Introduza os seus dados em baixo. Entraremos em contacto consigo assim que possivel.
        </Typography>

        <FormProvider methods={methods}>
          <Stack direction="column" gap="20px">
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

export default ContactUsView;
