import React, { useState } from 'react';
// components
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { Box, Grid, Typography, Link, TextField, Checkbox, Stack, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { RHFPhoneField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify/Iconify';
// dependencies
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DISTRICTS } from 'src/utils/districts';
import { PATHS } from 'src/routes';
import axios from 'src/lib/axios';
import Button from 'src/component-lib/Button/Button';

type props = {
  onSubmitError?: () => void;
  onSubmitSuccess?: () => void;
  readOnly?: boolean;
  healthUnit?: {
    _id: string;
    type: string;
  };
};

function GetHelpForm({ onSubmitError, onSubmitSuccess, readOnly, healthUnit }: props) {
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const schema = yup.object({
    name: yup.string().required(),
    lastName: yup.string().required(),
    patientName: yup.string().required(),
    email: yup.string().email().required(),
    startDate: yup.date().required(),
    district: yup.string().required(),
    type: yup.string().test((value) => {
      console.log('VALUE', value);
      if (healthUnit?.type) {
        return true;
      }
      return !!value;
    }),
    allowContact: yup.bool().oneOf([true], ''),
    phone: yup
      .string()
      .test('phoneNumber', 'O número de telemóvel introduzido não é válido.', (value) => {
        // Portuguese phone number verification
        if (value?.startsWith('+351')) {
          // Remove spaces and the +351 sign
          value = value?.replace(/\s/g, '').replace('+351', '');

          // Check if the phone number is valid
          return value?.length === 9;
        }

        return true;
      })
      .required(),
    // priority: yup.string().required(),
  });

  const today = new Date();

  const orderTypeOptions = [
    { text: 'Apoio Domiciliário', value: 'home_care' },
    { text: 'Lar de Idosos', value: 'nursing_home' },
    { text: 'Residência Sénior', value: 'senior_residence' },
    { text: 'Centro de Dia', value: 'day_center' },
    { text: 'Equipamento Médico', value: 'medical_equipment' },
  ];

  const methods = useForm({
    defaultValues: {
      name: '',
      lastName: '',
      patientName: '',
      district: '',
      type: '',
      email: '',
      phone: '',
      startDate: today,
      allowContact: false,
      //   priority: '',
    },
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { isValid },
    control,
  } = methods;

  const onSubmit = async (data) => {
    const payload = {
      type: healthUnit?.type || data?.type,
      health_unit: healthUnit?._id || undefined,
      source: 'lead',
      customer: {
        name: `${data.name} ${data.lastName}`,
        email: data.email,
        phone: data.phone.replaceAll(' ', ''),
      },
      patient: {
        name: data.patientName,
      },
      schedule_information: {
        start_date: data.startDate,
      },
      additional_information: {
        location: data.district,
      },
    };
    try {
      await axios.post('/customers/orders/help', { ...payload });
      setSubmitSuccess(true);
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      if (onSubmitError) onSubmitError();
      console.log('error', error);
    }
  };

  return (
    <>
      {submitSuccess ? (
        <Box
          sx={{
            height: '100%',
            width: '100%',
            p: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Iconify icon="bxs:check-circle" sx={{ color: 'green' }} width="100px" height="100px" />
          <Stack spacing={1} sx={{ my: 5 }}>
            <Typography variant="h3">O seu pedido foi submetido com sucesso!</Typography>

            <Typography sx={{ color: 'text.secondary' }}>
              A sua informação será avaliada para entender as suas necessidades. Entraremos em
              contato brevemente para fornecer orientação personalizada. O nosso objetivo é ajudá-lo
              a encontrar as melhores soluções em Apoio Domiciliário, Lares de Idosos, Residências
              Sénior, Centros de Dia ou Equipamentos Médicos.
            </Typography>
          </Stack>
        </Box>
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }: any) => (
                    <TextField
                      disabled={readOnly}
                      {...field}
                      label="Nome"
                      value={getValues('name')}
                      variant="outlined"
                      sx={{ width: '100%' }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }: any) => (
                    <TextField
                      disabled={readOnly}
                      {...field}
                      label="Apelido"
                      value={getValues('lastName')}
                      variant="outlined"
                      sx={{ width: '100%' }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="patientName"
                  control={control}
                  render={({ field }: any) => (
                    <TextField
                      disabled={readOnly}
                      {...field}
                      label="Nome do Familiar"
                      value={getValues('patientName')}
                      variant="outlined"
                      sx={{ width: '100%' }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }: any) => (
                    <TextField
                      disabled={readOnly}
                      {...field}
                      label="Email"
                      value={getValues('email')}
                      variant="outlined"
                      sx={{ width: '100%' }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <RHFPhoneField
                  disabled={readOnly}
                  name="phone"
                  sx={{
                    width: '100%',
                    '& > div': {
                      width: '100%',
                    },
                  }}
                  label="Telemóvel"
                  defaultCountry="PT"
                  forceCallingCode
                  variant="outlined"
                  fullWidth
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
                      setValue('phone', newValue, { shouldDirty: true });
                      return;
                    }

                    // Limit the phone to 16 digits. (eg: +351 912 345 678 -> 16 digits)
                    if (value.length > 16) {
                      return;
                    }

                    setValue('phone', value, { shouldDirty: true });
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="startDate"
                  render={({ field, fieldState: { error } }) => (
                    // <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disabled={readOnly}
                      {...field}
                      format="dd-MM-yyyy"
                      value={new Date(getValues('startDate'))}
                      minDate={new Date()}
                      label="Estimativa de Início"
                      slotProps={{ textField: { variant: 'outlined' } }}
                      sx={{ width: '100%' }}
                    />
                    // </LocalizationProvider>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="district"
                  control={control}
                  render={({ field }: any) => (
                    <TextField
                      disabled={readOnly}
                      {...field}
                      select
                      label="Distrito"
                      value={getValues('district')}
                      variant="outlined"
                      sx={{
                        width: '100%',
                      }}
                    >
                      {DISTRICTS.map((district) => (
                        <MenuItem value={district.value}>{district.text}</MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              {!healthUnit?.type && (
                <Grid item xs={12}>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }: any) => (
                      <TextField
                        disabled={readOnly}
                        {...field}
                        select
                        onChange={(e) => {
                          setValue('type', e.target.value, { shouldDirty: true });
                        }}
                        label="Tipo de Apoio"
                        value={getValues('type')}
                        variant="outlined"
                        sx={{
                          width: '100%',
                          '& > ul': {
                            maxWidth: '250px',
                          },
                        }}
                      >
                        {orderTypeOptions.map((type) => (
                          <MenuItem value={type.value}>{type.text}</MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Typography sx={{ color: 'text.disabled', fontSize: '14px' }}>
                  * Todos os campos são obrigatórios.
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="allowContact"
                  control={control}
                  render={({ field }: any) => (
                    <Stack display="inline-flex" direction="row" alignItems="flex-start">
                      <Checkbox
                        disabled={readOnly}
                        {...field}
                        label="Email"
                        value={getValues('allowContact')}
                        variant="outlined"
                      />
                      <Typography sx={{ fontSize: '14px', color: 'text.disabled', mt: '7px' }}>
                        Aceito ser contatado(a) e o uso dos meus dados para os fins a que se destina
                        o formulário, assim como, a{' '}
                        <Link target="_blank" href={PATHS.privacyPolicy}>
                          Política de Privacidade
                        </Link>{' '}
                        e os{' '}
                        <Link target="_blank" href={PATHS.termsAndConditions}>
                          Termos e Condições
                        </Link>
                        .
                      </Typography>
                    </Stack>
                  )}
                />
              </Grid>

              {!readOnly && (
                <Grid item xs={12}>
                  <Button
                    sx={{ width: '100%', height: '53px' }}
                    disabled={!isValid}
                    type="submit"
                    variant="contained"
                    text="Confirmar"
                  />
                </Grid>
              )}
            </Grid>
          </form>
        </FormProvider>
      )}
    </>
  );
}

export default GetHelpForm;
