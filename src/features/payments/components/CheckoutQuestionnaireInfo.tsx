// hooks
import { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { IScheduleProps } from 'src/types/order';
// react
import { useForm } from 'react-hook-form';
// lib
import axios from 'src/lib/axios';
// yup
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { SelectChangeEvent } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
  Stack,
  Box,
  Switch,
  Collapse,
  Typography,
  FormControlLabel,
  Divider,
  TextField,
  Button,
} from '@mui/material';
import { useResponsive } from 'src/hooks';
import { useTheme } from '@mui/material/styles';
// contexts
import { useAuthContext } from 'src/contexts';
// components
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import AvatarDropdown from 'src/components/avatar-dropdown';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Iconify from 'src/components/iconify/Iconify';
import {
  FilterServices,
  FilterWeekdays,
  FilterRecurrency,
} from 'src/features/companies/components';
import { IServiceProps } from 'src/types/utils';
import Weekdays from 'src/data/Weekdays';
import { IRelativeProps } from 'src/types/relative';
import CheckoutPaymentMethod from './CheckoutPaymentMethod';

// ----------------------------------------------------------------------

type Props = {
  services: IServiceProps[];
  relatives: IRelativeProps[];
  onValidChange: Function;
  checkoutVersion?: boolean;
  selectedRelative: IRelativeProps;
  selectedWeekdays: number[];
  selectedServices: IServiceProps[];
  selectedRecurrency: number;
  schedule: IScheduleProps[];
  startDate: Date | null;
};

const PAYMENT_OPTIONS = [
  {
    label: 'Paypal',
    value: 'paypal',
    description: '**** **** **** 1234',
  },
  {
    label: 'MasterCard',
    value: 'mastercard',
    description: '**** **** **** 3456',
  },
  {
    label: 'Visa',
    value: 'visa',
    description: '**** **** **** 6789',
  },
];

export default function CheckoutQuestionnaireInfo({
  relatives,
  onValidChange,
  services,
  checkoutVersion = false,
  selectedRelative,
  selectedWeekdays,
  selectedRecurrency,
  schedule,
  startDate,
  selectedServices,
}: Props) {
  const [openAddCardForm, setOpenAddCardForm] = useState<boolean>(false);
  const [openRelativeInfo, setOpenRelativeInfo] = useState<boolean>(false);
  const [openOrderInfo, setOpenOrderInfo] = useState<boolean>(false);
  const theme = useTheme();
  const { palette } = theme;
  const isMdUp = useResponsive('up', 'md');
  const [CARDS, setCARDS] = useState([]);

  async function getCards() {
    const response = await axios.get('/payments/payment-methods');
    return response.data;
  }

  useEffect(() => {
    getCards().then((data) => {
      const auxCards = [];
      data.forEach((card) => {
        const label = card.card.brand.toUpperCase();
        const value = card.card.brand;
        const description = `**** **** **** ${card.card.last4}`;
        auxCards.push({ label: label, value: value, description: description });
      });
      setCARDS(auxCards);
      console.log(data);
    });
  }, []);

  const { user } = useAuthContext();
  const { pathname, push } = useRouter();

  const CardSchema = Yup.object().shape({
    cardHolder: Yup.string().required('Nome do titular é obrigatório.'),
    cardNumber: Yup.string()
      .required('Número do cartão é obrigatório.')
      .test('cardNumber', 'Insira um número de cartão válido.', (value) => value.length === 19),
    cardExpirationDate: Yup.string().required('Data de validade é obrigatória.'),
    cardCVV: Yup.string().required('CVV é obrigatório.'),
  });

  const defaultValues = {
    cardHolder: user?.name || undefined,
    cardNumber: undefined,
    cardExpirationDate: undefined,
    cardCVV: undefined,
  };

  const methods = useForm<FormValuesProps>({
    mode: 'onChange',
    resolver: yupResolver(CardSchema),
    defaultValues,
  });

  const {
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isDirty },
  } = methods;

  const close = () => {
    reset();
    openAddCardForm(false);
    getCards();
  };

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const cardData = {
        card: {
          number: data.cardNumber,
          // first 2 digits of the expiration month
          exp_month: data.cardExpirationDate.substring(0, 2),
          exp_year: data.cardExpirationDate.substring(3, 5),
          cvc: data.cardCVV,
        },
        billing_details: {
          name: data.cardHolder,
        },
      };

      const card_token = (
        await axios.post('/payments/tokens/card', {
          card: cardData.card,
          billing_details: cardData.billing_details,
        })
      ).data;

      await axios.post('/payments/payment-methods', {
        payment_method_token: card_token.id,
      });
      close();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack spacing={5}>
      <StepLabel
        title="Informação do Pedido"
        step="1"
        droppable
        opened={openOrderInfo}
        onOpenClick={() => setOpenOrderInfo((prev) => !prev)}
      />
      <Collapse in={openOrderInfo} unmountOnExit>
        <div>
          <Stack spacing={2.5} sx={{ mb: '24px' }}>
            <Stack gap="16px" direction={{ xs: 'column', md: 'row' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  flex: 1,
                  width: { md: 'calc(50% - 8px)', xs: '100%' },
                }}
              >
                <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block' }}>
                  Serviços
                </Typography>
                <FilterServices
                  readOnly={checkoutVersion}
                  services={services}
                  filterServices={selectedServices}
                  onChangeServices={(keyword: IServiceProps[]) => {}}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  flex: 1,
                  width: { md: 'calc(50% - 8px)', xs: '100%' },
                }}
              >
                <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block' }}>
                  Dias da semana
                </Typography>
                <FilterWeekdays
                  readOnly={checkoutVersion}
                  filterWeekdays={selectedWeekdays}
                  onChangeWeekdays={(event: SelectChangeEvent<number[]>) => {}}
                />
              </Box>
            </Stack>
            <Stack spacing={{ xs: 2.5, md: 2 }} direction={{ xs: 'column', md: 'row' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block' }}>
                  Recorrência
                </Typography>
                <FilterRecurrency
                  readOnly={checkoutVersion}
                  filterRecurrency={selectedRecurrency}
                  onChangeRecurrency={(event: SelectChangeEvent<number>) => {}}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block' }}>
                  Data de ínicio
                </Typography>
                <DatePicker
                  readOnly={checkoutVersion}
                  slotProps={{
                    textField: {
                      hiddenLabel: true,
                    },
                  }}
                  onChange={(newDate) => setStartDate(newDate)}
                  format="dd-MM-yyyy"
                  value={startDate}
                  minDate={new Date()}
                />
              </Box>
            </Stack>
            {schedule.length > 0 &&
              schedule
                .sort((a, b) => a - b)
                .map((item) => {
                  let weekdayItem;
                  Weekdays.forEach((weekday) => {
                    if (weekday.value === item.week_day) {
                      weekdayItem = weekday;
                    }
                  });
                  return (
                    <Box
                      key={item}
                      sx={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}
                    >
                      <Typography
                        variant="overline"
                        sx={{ color: 'text.secondary', display: 'block' }}
                      >
                        {weekdayItem.text}
                      </Typography>

                      <Stack gap="10px" direction="row">
                        <TimePicker
                          readOnly={checkoutVersion}
                          ampm={false}
                          sx={{ flex: 1 }}
                          value={new Date(item.start)}
                          slotProps={{
                            textField: {
                              hiddenLabel: true,
                            },
                          }}
                        />
                        <Typography
                          variant="overline"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'text.secondary',
                          }}
                        >
                          -
                        </Typography>
                        <TimePicker
                          readOnly={checkoutVersion}
                          skipDisabled
                          ampm={false}
                          sx={{ flex: 1 }}
                          value={new Date(item.end)}
                          slotProps={{
                            textField: {
                              hiddenLabel: true,
                            },
                          }}
                        />
                      </Stack>
                      {schedule[weekdayItem.value - 1].valid === false && (
                        <Box sx={{ color: 'red', fontSize: '12px' }}>Este horário não é válido</Box>
                      )}
                    </Box>
                  );
                })}
          </Stack>
        </div>
      </Collapse>
      <StepLabel
        title={checkoutVersion ? 'Familiar' : 'Escolha o Familiar'}
        step="2"
        droppable
        opened={openRelativeInfo}
        onOpenClick={() => setOpenRelativeInfo((prev) => !prev)}
      />
      <Collapse sx={{ mt: '0px' }} in={openRelativeInfo} unmountOnExit>
        <div>
          <AvatarDropdown
            readOnly={checkoutVersion}
            selected={JSON.stringify(selectedRelative)}
            options={relatives}
            selectText="Escolha um familiar"
          />

          <Collapse in={!!selectedRelative} unmountOnExit>
            <Stack spacing={2.5}>
              <Stack
                sx={{ mt: '24px' }}
                spacing={3}
                direction={{ xs: 'column', md: 'row' }}
                justifyContent={{ md: 'space-between' }}
                alignItems={{ xs: 'flex-start', md: 'center' }}
              >
                <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                  Informações relativas
                </Typography>
              </Stack>
              <Stack spacing={{ xs: 2.5, md: 2 }} direction={{ xs: 'column', md: 'row' }}>
                <TextField
                  value={selectedRelative?.name.split(' ')[0]}
                  InputProps={{
                    readOnly: true,
                  }}
                  label="Nome"
                  sx={{ flex: 1 }}
                />
                <TextField
                  value={selectedRelative?.name.split(' ')[1]}
                  InputProps={{
                    readOnly: true,
                  }}
                  label="Apelido"
                  sx={{ flex: 1 }}
                />
              </Stack>
              <Stack spacing={{ xs: 2.5, md: 2 }} direction={{ xs: 'column', md: 'row' }}>
                <TextField
                  value={selectedRelative?.address.city}
                  InputProps={{
                    readOnly: true,
                  }}
                  label="Cidade"
                  sx={{ flex: 1 }}
                />
                <TextField
                  value={selectedRelative?.address.postal_code}
                  InputProps={{
                    readOnly: true,
                  }}
                  label="Código Postal"
                  sx={{ flex: 1 }}
                />
              </Stack>
              <TextField
                value={selectedRelative?.address.street}
                InputProps={{
                  readOnly: true,
                }}
                label="Morada"
                sx={{ flex: 1 }}
              />
              {selectedRelative?.medical_conditions && (
                <TextField
                  value={selectedRelative?.medical_conditions}
                  multiline
                  minRows={4}
                  InputProps={{
                    readOnly: true,
                  }}
                  label="Condições médicas"
                  sx={{ flex: 1 }}
                />
              )}
            </Stack>
          </Collapse>
        </div>
      </Collapse>
      <StepLabel title="Método de Pagamento" step="3" />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CheckoutPaymentMethod options={CARDS} />
        <Divider sx={{ mt: '20px', mb: '20px' }} />
        <Stack width="100%" alignItems="flex-start" justifyContent="flex-start">
          <Button
            size="large"
            variant="contained"
            color="inherit"
            onClick={() => setOpenAddCardForm((prev) => !prev)}
            sx={{
              width: !isMdUp ? '100%' : 'contain',
              px: 4,
              bgcolor: openAddCardForm ? 'red' : 'primary.main',
              color: palette.mode === 'light' ? 'common.white' : 'grey.800',
              '&:hover': {
                bgcolor: openAddCardForm ? 'red' : 'primary.dark',
                color: palette.mode === 'light' ? 'common.white' : 'grey.800',
              },
            }}
          >
            {!openAddCardForm ? 'Adicionar Cartão' : 'Cancelar'}
          </Button>
        </Stack>
        <Collapse in={openAddCardForm} unmountOnExit>
          <Box
            sx={{
              outline: 'none',
              width: '100%',
              height: 'auto',
              bgcolor: 'white',
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'flex-start',
              mt: '20px',
              gap: '10px',
              '& > form': {
                width: '100%',
              },
            }}
          >
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack direction="column" spacing={2} sx={{ pb: 2 }}>
                <RHFTextField
                  name="cardHolder"
                  label="Nome do Titular"
                  placeholder="Nome"
                  InputLabelProps={{ shrink: true }}
                />

                <RHFTextField
                  name="cardNumber"
                  label="Número do Cartão"
                  placeholder="XXXX XXXX XXXX XXXX"
                  InputLabelProps={{ shrink: true }}
                  // Max 19 characters
                  inputProps={{ maxLength: 19 }}
                  onChange={(e) => {
                    // Only allow 0-9
                    // After typing 4 characters, add a space

                    const { value } = e.target;
                    const onlyNums = value.replace(/[^0-9]/g, '');
                    const cardNumber = onlyNums
                      .split('')
                      .reduce((acc, curr, i) => acc + curr + (i % 4 === 3 ? ' ' : ''), '')
                      .trim();

                    setValue('cardNumber', cardNumber);
                  }}
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <RHFTextField
                  name="cardExpirationDate"
                  fullWidth
                  label="Validade"
                  placeholder="MM/YY"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    // Only allow 0-9
                    // After typing 2 characters, add a slash

                    const { value } = e.target;
                    const onlyNums = value.replace(/[^0-9]/g, '');
                    const month = onlyNums.slice(0, 2);
                    const year = onlyNums.slice(2, 4);

                    if (onlyNums.length <= 2) {
                      setValue('cardExpirationDate', month);

                      // convert onlyNums to a number
                      // if it's greater than 12, set the value to 12
                      // otherwise, set the value to the onlyNums

                      if (Number(onlyNums) > 12) {
                        setValue('cardExpirationDate', '12');
                      }
                    } else {
                      setValue('cardExpirationDate', `${month}/${year}`);
                    }
                  }}
                />
                <RHFTextField
                  name="cardCVV"
                  fullWidth
                  label="CVV/CVC"
                  placeholder="***"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 3 }}
                  onChange={(e) => {
                    const { value } = e.target;
                    const onlyNums = value.replace(/[^0-9]/g, '');
                    setValue('cardCVV', onlyNums);
                  }}
                />
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                sx={{ typography: 'caption', color: 'text.disabled', mt: 2 }}
              >
                <Iconify icon="carbon:locked" sx={{ mr: 0.5 }} />
                Transações seguras com encriptação SSL
              </Stack>

              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  sx={{
                    width: '100%',
                    pt: 1.5,
                    pb: 1.5,
                    mt: 2,
                    alignSelf: 'center',
                    bgcolor: 'primary.main',
                    color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                      color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                    },
                  }}
                >
                  Guardar
                </LoadingButton>
              </Stack>
            </FormProvider>
          </Box>
        </Collapse>
      </Box>
    </Stack>
  );
}

// -------------------------------- //

type StepLabelProps = {
  step: string;
  title: string;
  onOpenClick?: Function;
  droppable?: boolean;
  opened?: boolean;
};

function StepLabel({ step, title, onOpenClick, droppable, opened }: StepLabelProps) {
  const theme = useTheme();
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="center" sx={{ typography: 'h5' }}>
        <Box
          sx={{
            mr: 1.5,
            width: 28,
            height: 28,
            flexShrink: 0,
            display: 'flex',
            typography: 'h6',
            borderRadius: '50%',
            alignItems: 'center',
            bgcolor: 'primary.main',
            justifyContent: 'center',
            color: 'primary.contrastText',
          }}
        >
          {step}
        </Box>
        {title}
      </Stack>

      {droppable && (
        <Box
          sx={{
            cursor: 'pointer',
            transform: opened ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: '500ms',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Iconify icon="ep:arrow-down" onClick={onOpenClick} />
        </Box>
      )}
    </Stack>
  );
}
