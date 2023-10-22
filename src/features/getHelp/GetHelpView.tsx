import React, { useEffect, useState } from 'react';
// mui
import {
  Box,
  Grid,
  Typography,
  Link,
  TextField,
  Button,
  Checkbox,
  Stack,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Iconify from 'src/components/iconify/Iconify';
// form
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RHFPhoneField } from 'src/components/hook-form';
// axios
import axios from 'src/lib/axios';
// routes
import { PATHS } from 'src/routes';
// utils
import { DISTRICTS } from 'src/utils/districts';
// types
import { ISnackbarProps } from 'src/types/snackbar';

function GetHelpView() {
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState<ISnackbarProps>({
    show: false,
    severity: 'success',
    message: '',
  });

  const schema = yup.object({
    name: yup.string().required(),
    lastName: yup.string().required(),
    patientName: yup.string().required(),
    email: yup.string().email().required(),
    startDate: yup.date().required(),
    district: yup.string().required(),
    type: yup.string().required(),
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
    watch,
    setValue,
    formState: { isValid },
    control,
  } = methods;
  const orderType = watch('type');
  const startDate = watch('startDate');

  useEffect(() => {
    console.log('startDate: ', startDate);
  }, [startDate]);

  const onSubmit = async (data) => {
    console.log('data to submit', data);
    const payload = {
      type: data.type,
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
    } catch (error) {
      setShowSnackbar({
        show: true,
        severity: 'error',
        message: 'Algo correu mal, tente novamente.',
      });
      setSubmitSuccess(false);
      console.log('error', error);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
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
      <Box
        sx={{
          width: '100vw',
          height: { xs: '300px', sm: '200px' },
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ zIndex: 5, width: '100%', maxWidth: '1200px', px: '20px' }}>
          <Typography
            sx={{
              color: 'white',
              fontSize: { xs: '22px', md: '42px' },
              fontWeight: '800',
              width: '100%',
              textAlign: 'center',
            }}
          >
            Descubra o Melhor Apoio para o seu Familiar
          </Typography>
          <Typography
            sx={{
              color: 'white',
              fontSize: { xs: '14px', md: '18px' },
              fontWeight: '600',
              width: '100%',
              textAlign: 'center',
              mt: '10px',
            }}
          >
            Obtenha ajuda personalizada para escolher os serviços de Apoio Domiciliário, Lares de
            Idosos, Residências Sénior, Centros de Dia ou Equipamentos Médicos mais adequados ao seu
            caso e às necessidades do seu familiar de forma segura, rápida e personalizada, sem
            custos adicionais.
          </Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: 'primary.main',
            position: 'absolute',
            opacity: '0.6',
            left: 0,
            top: 0,
            zIndex: 4,
          }}
        />
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: 'primary.main',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 3,
            backgroundImage: 'url("/assets/illustrations/get_help_banner.jpeg")',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        />
      </Box>
      <Box
        sx={{
          maxWidth: '1200px',
          width: '100%',
          px: '20px',
          py: '50px',
          '& .MuiFormLabel-root': {
            pr: '5px',
            backgroundColor: 'white',
          },
        }}
      >
        <Grid container spacing={5}>
          <Grid item md={6}>
            <Box sx={{ width: '100%' }}>
              <Typography
                sx={{ fontSize: { xs: '26px', md: '36px' }, fontWeight: '600', textAlign: 'left' }}
              >
                Preencha o formulário e aguarde o nosso contacto
              </Typography>
              {/* Topic 1 */}
              <Typography
                sx={{
                  fontSize: '14px',
                  color: 'primary.main',
                  fontWeight: '600',
                  textAlign: 'left',
                  mt: '20px',
                }}
              >
                O que acontece a seguir a preencher o formulário?
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '600',
                  textAlign: 'left',
                  mt: '10px',
                }}
              >
                Após preencher o formulário, a equipa da Careplace entra em ação. A sua informação é
                cuidadosamente avaliada para compreender as suas necessidades específicas. Em
                seguida, iremos entrar em contato consigo para fornecer orientação personalizada e
                assistência contínua. O nosso objetivo é ajudá-lo a encontrar as melhores soluções
                de Apoio Domiciliário, Lares de Idosos, Residências Sénior, Centros de Dia ou
                Equipamentos Médicos que atendam às suas necessidades. Pode contar com o nosso apoio
                e compromisso ao longo de todo o processo.
              </Typography>
              {/* Topic 2 */}
              <Typography
                sx={{
                  fontSize: '14px',
                  color: 'primary.main',
                  fontWeight: '600',
                  textAlign: 'left',
                  mt: '20px',
                }}
              >
                Como é que o serviço pode ser gratuito?
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '600',
                  textAlign: 'left',
                  mt: '10px',
                }}
              >
                A nossa consultoria independente é fornecida sem custos para as famílias. Para
                tornar isto possível, a Careplace conta com o apoio de uma rede de prestadores de
                serviços de Apoio Domiciliário, Lares de Idosos, Residências Sénior, Centros de Dia
                e aluguer de Equipamentos Médicos. A nossa plataforma garante a imparcialidade dos
                nossos serviços, e o nosso principal foco é auxiliá-lo a fazer uma escolha segura
                que atenda sempre às suas necessidades.
              </Typography>
              {/* Topic 3 */}
              <Typography
                sx={{
                  fontSize: '14px',
                  color: 'primary.main',
                  fontWeight: '600',
                  textAlign: 'left',
                  mt: '20px',
                }}
              >
                Vou ficar com algum compromisso ao preencher o formulário?
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '600',
                  textAlign: 'left',
                  mt: '10px',
                }}
              >
                Não, o preenchimento do formulário de apoio personalizado da Careplace não implica
                qualquer compromisso. É uma etapa inicial que nos permite entender as suas
                necessidades e fornecer orientação personalizada. Não há obrigações associadas, e a
                decisão de prosseguir com serviços é inteiramente sua. Estamos aqui para ajudar sem
                qualquer vínculo.
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              mt: '20px',
              '& .MuiPaper-root-MuiMenu-paper-MuiPopover-paper': {
                maxHeight: '100px',
              },
            }}
          >
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
                <Iconify
                  icon="bxs:check-circle"
                  sx={{ color: 'green' }}
                  width="100px"
                  height="100px"
                />
                <Stack spacing={1} sx={{ my: 5 }}>
                  <Typography variant="h3">O seu pedido foi submetido com sucesso!</Typography>

                  <Typography sx={{ color: 'text.secondary' }}>
                    A sua informação será avaliada para entender as suas necessidades. Entraremos em
                    contato brevemente para fornecer orientação personalizada. O nosso objetivo é
                    ajudá-lo a encontrar as melhores soluções em Apoio Domiciliário, Lares de
                    Idosos, Residências Sénior, Centros de Dia ou Equipamentos Médicos.
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
                            const newValue = `${value.slice(0, 8)} ${value.slice(
                              8,
                              11
                            )} ${value.slice(11, 14)}`;
                            setValue('phone', newValue);
                            return;
                          }

                          // Limit the phone to 16 digits. (eg: +351 912 345 678 -> 16 digits)
                          if (value.length > 16) {
                            return;
                          }

                          setValue('phone', value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        name="startDate"
                        render={({ field, fieldState: { error } }) => (
                          // <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
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

                    <Grid item xs={12}>
                      <Controller
                        name="type"
                        control={control}
                        render={({ field }: any) => (
                          <TextField
                            {...field}
                            select
                            onChange={(e) => {
                              setValue('type', e.target.value);
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
                              {...field}
                              label="Email"
                              value={getValues('allowContact')}
                              variant="outlined"
                            />
                            <Typography
                              sx={{ fontSize: '14px', color: 'text.disabled', mt: '7px' }}
                            >
                              Aceito ser contatado(a) e o uso dos meus dados para os fins a que se
                              destina o formulário, assim como, a{' '}
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

                    <Grid item xs={12}>
                      <Button
                        sx={{ width: '100%', height: '53px' }}
                        disabled={!isValid}
                        type="submit"
                        variant="contained"
                      >
                        Confirmar
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </FormProvider>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default GetHelpView;
