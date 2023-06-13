// hooks
import { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { IScheduleProps } from 'src/types/order';
// react

// lib
import axios from 'src/lib/axios';

// @mui
import { SelectChangeEvent } from '@mui/material';
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
import AddNewCardForm from './AddNewCardForm';
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
  onPaymentMethodSelect: Function;
};

type PaymentMethodProps = {
  label: string;
  value: string;
  brand: string;
  description: string;
};

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
  onPaymentMethodSelect,
}: Props) {
  const [openAddCardForm, setOpenAddCardForm] = useState<boolean>(false);
  const [openRelativeInfo, setOpenRelativeInfo] = useState<boolean>(false);
  const [openOrderInfo, setOpenOrderInfo] = useState<boolean>(false);
  const theme = useTheme();
  const { palette } = theme;
  const isMdUp = useResponsive('up', 'md');
  const [CARDS, setCARDS] = useState<PaymentMethodProps[]>([]);

  async function getCards() {
    const response = await axios.get('/payments/payment-methods');
    return response.data;
  }

  useEffect(() => {
    getCards()
      .then((data) => {
        const auxCards: PaymentMethodProps[] = [];
        data.forEach((card) => {
          auxCards.push({
            label: card.card.brand.toUpperCase(),
            value: JSON.stringify(card),
            brand: card.card.brand,
            description: `**** **** **** ${card.card.last4}`,
          });
        });
        setCARDS(auxCards);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleAddCard = async () => {
    setOpenAddCardForm(false);
    getCards()
      .then((data) => {
        const auxCards: PaymentMethodProps[] = [];
        data.forEach((card) => {
          auxCards.push({
            label: card.card.brand.toUpperCase(),
            value: JSON.stringify(card),
            brand: card.card.brand,
            description: `**** **** **** ${card.card.last4}`,
          });
        });
        setCARDS(auxCards);
        console.log(data);
      })
      .catch((error) => console.log(error));
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
                  format="dd-MM-yyyy"
                  value={startDate}
                  minDate={new Date()}
                />
              </Box>
            </Stack>
            {schedule.length > 0 &&
              schedule
                .sort((a: IScheduleProps, b: IScheduleProps) => a - b)
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
        <CheckoutPaymentMethod options={CARDS} onPaymentMethodSelect={onPaymentMethodSelect} />
        <Divider sx={{ mt: '20px', mb: '20px' }} />
        <Stack width="100%" alignItems="flex-end" justifyContent="flex-start">
          <Button
            variant="text"
            sx={{
              color: openAddCardForm ? 'red' : 'primary.main',
            }}
            onClick={() => setOpenAddCardForm((prev) => !prev)}
          >
            {!openAddCardForm ? 'Adicionar Cartão' : 'Cancelar'}
          </Button>
        </Stack>
        <Collapse in={openAddCardForm} unmountOnExit>
          <AddNewCardForm onAddCard={() => handleAddCard()} />
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
