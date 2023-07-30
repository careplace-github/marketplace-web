// hooks
import { useState, useEffect, MouseEventHandler } from 'react';
import { IScheduleProps } from 'src/types/order';
import { ISnackbarProps } from 'src/types/snackbar';
import { countries } from 'src/data';
// react

// lib
import axios from 'src/lib/axios';

// @mui
import {
  Stack,
  Box,
  Collapse,
  Typography,
  Divider,
  TextField,
  Button,
  SelectChangeEvent,
  FormControl as Form,
  Snackbar,
  Alert,
} from '@mui/material';
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
import { useAuthContext } from 'src/contexts';
import AddNewCardForm from './AddNewCardForm';
import CheckoutPaymentMethod from './CheckoutPaymentMethod';

// ----------------------------------------------------------------------

type BillingDetailsProps = {
  name: string;
  nif: string;
  address: {
    street: string;
    postal_code: string;
    city: string;
    country: string;
  };
};

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
  onBillingDetailsChange: Function;
  isOrderView?: boolean;
  orderBillingDetails?: BillingDetailsProps;
  orderStatus?: string;
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
  orderBillingDetails,
  services,
  checkoutVersion = false,
  selectedRelative,
  selectedWeekdays,
  selectedRecurrency,
  schedule,
  startDate,
  selectedServices,
  onPaymentMethodSelect,
  onBillingDetailsChange,
  isOrderView,
  orderStatus,
}: Props) {
  const [openAddCardForm, setOpenAddCardForm] = useState<boolean>(false);
  const [openRelativeInfo, setOpenRelativeInfo] = useState<boolean>(!!isOrderView);
  const [billingDetails, setBillingDetails] = useState<BillingDetailsProps>({
    name: '',
    nif: '',
    address: {
      street: '',
      postal_code: '',
      city: '',
      country: '',
    },
  });
  const [openOrderInfo, setOpenOrderInfo] = useState<boolean>(!!isOrderView);
  const [openBillingInfo, setOpenBillingInfo] = useState<boolean>(true);
  const [openPaymentInfo, setOpenPaymentInfo] = useState<boolean>(true);
  const [CARDS, setCARDS] = useState<PaymentMethodProps[]>([]);
  const [showSnackbar, setShowSnackbar] = useState<ISnackbarProps>({
    show: false,
    severity: 'success',
    message: '',
  });
  const { user } = useAuthContext();
  useEffect(() => {
    if (user && !isOrderView) {
      let countryLabel = '';
      countries.forEach((item) => {
        if (item.code === user?.address?.country) {
          countryLabel = item.label;
        }
      });
      setBillingDetails((prev) => {
        return {
          ...prev,
          address: {
            city: user.address?.city || '',
            postal_code: user.address?.postal_code || '',
            street: user.address?.street || '',
            country: countryLabel,
          },
          name: user.name || '',
        };
      });
    }
  }, [user]);

  useEffect(() => {
    if (!isOrderView) {
      onBillingDetailsChange(billingDetails);
    }
  }, [billingDetails]);

  useEffect(() => {
    if (isOrderView && !!orderBillingDetails) {
      setBillingDetails(orderBillingDetails);
    }
  }, [isOrderView, orderBillingDetails]);

  async function getCards() {
    const response = await axios.get('/payments/payment-methods');
    return response.data.data;
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
      })
      .catch((error) => console.log(error));
  }, []);

  const handleAddCard = async (result: 'error' | 'success') => {
    setOpenAddCardForm(false);
    setShowSnackbar({
      show: true,
      severity: result,
      message:
        result === 'error'
          ? 'Algo correu mal, tente novamente.'
          : 'O seu cartão foi adicionado com sucesso.',
    });
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
      })
      .catch((error) => console.log(error));
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
      </Snackbar>{' '}
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
                  />
                </Box>
              </Stack>
              {schedule.length > 0 &&
                schedule
                  .sort((a, b) => a.week_day - b.week_day)
                  .map((item) => {
                    let weekdayItem;
                    Weekdays.forEach((weekday) => {
                      if (weekday.value === item.week_day) {
                        weekdayItem = weekday;
                      }
                    });
                    return (
                      <Box
                        key={JSON.stringify(item)}
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
                            value={item.start ? new Date(item.start) : new Date()}
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
                            value={item.end ? new Date(item.end) : new Date()}
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
        {orderStatus !== 'new' && (
          <>
            <StepLabel
              title="Dados de Faturação"
              step="3"
              droppable={isOrderView}
              opened={openBillingInfo}
              onOpenClick={() => setOpenBillingInfo((prev) => !prev)}
            />
            <Collapse sx={{ mt: '0px' }} in={openBillingInfo} unmountOnExit>
              <Form sx={{ width: '100%' }}>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <Stack sx={{ width: '100%', display: 'flex', flexDirection: 'row', gap: '16px' }}>
                    <TextField
                      InputProps={{
                        readOnly: isOrderView,
                      }}
                      value={billingDetails.name}
                      onChange={(e) =>
                        setBillingDetails((prev) => {
                          return { ...prev, name: e.target.value };
                        })
                      }
                      label="Nome *"
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      InputProps={{
                        readOnly: isOrderView,
                      }}
                      value={billingDetails.nif}
                      onChange={(e) => {
                        const { value } = e.target;

                        /**
                         * Only allow numbers and dashes
                         */
                        if (!/^[0-9 ]*$/.test(value)) {
                          return;
                        }

                        /**
                         * Portugal Zip Code Validation
                         */

                        // Add a dash to the zip code if it doesn't have one. Format example: XXXX-XXX

                        if (value.length === 4 && value[3] !== ' ') {
                          setBillingDetails((prev) => {
                            return {
                              ...prev,
                              nif: `${value[0]}${value[1]}${value[2]} ${value[3]}`,
                            };
                          });
                          return;
                        }
                        if (value.length === 8 && value[7] !== ' ') {
                          setBillingDetails((prev) => {
                            return {
                              ...prev,
                              nif: `${value[0]}${value[1]}${value[2]}${value[3]}${value[4]}${value[5]}${value[6]} ${value[7]}`,
                            };
                          });
                          return;
                        }

                        // // Do not allow the zip code to have more than 8 digits (XXXX-XXX -> 8 digits)
                        if (value.length > 11) {
                          return;
                        }

                        setBillingDetails((prev) => {
                          return { ...prev, nif: value };
                        });
                      }}
                      label="NIF"
                      sx={{ flex: 1 }}
                    />
                  </Stack>
                  <Stack sx={{ width: '100%', display: 'flex', flexDirection: 'row', gap: '16px' }}>
                    <TextField
                      InputProps={{
                        readOnly: isOrderView,
                      }}
                      value={billingDetails.address.street}
                      onChange={(e) =>
                        setBillingDetails((prev) => {
                          return { ...prev, address: { ...prev.address, street: e.target.value } };
                        })
                      }
                      label="Morada *"
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      InputProps={{
                        readOnly: isOrderView,
                      }}
                      value={billingDetails.address.postal_code}
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
                        if (
                          billingDetails.address.country === 'Portugal' ||
                          billingDetails.address.country === ''
                        ) {
                          // Add a dash to the zip code if it doesn't have one. Format example: XXXX-XXX
                          if (value.length === 5 && value[4] !== '-') {
                            setBillingDetails((prev) => {
                              return {
                                ...prev,
                                address: {
                                  ...prev.address,
                                  postal_code: `${value[0]}${value[1]}${value[2]}${value[3]}-${value[4]}`,
                                },
                              };
                            });
                            return;
                          }

                          // Do not allow the zip code to have more than 8 digits (XXXX-XXX -> 8 digits)
                          if (value.length > 8) {
                            return;
                          }
                        }
                        setBillingDetails((prev) => {
                          return { ...prev, address: { ...prev.address, postal_code: value } };
                        });
                      }}
                      label="Código Postal *"
                      sx={{ flex: 1 }}
                    />
                  </Stack>
                  <Stack sx={{ width: '100%', display: 'flex', flexDirection: 'row', gap: '16px' }}>
                    <TextField
                      InputProps={{
                        readOnly: isOrderView,
                      }}
                      value={billingDetails.address.city}
                      onChange={(e) =>
                        setBillingDetails((prev) => {
                          return { ...prev, address: { ...prev.address, city: e.target.value } };
                        })
                      }
                      label="Cidade *"
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      InputProps={{
                        readOnly: isOrderView,
                      }}
                      value={billingDetails.address.country}
                      onChange={(e) =>
                        setBillingDetails((prev) => {
                          return { ...prev, address: { ...prev.address, country: e.target.value } };
                        })
                      }
                      label="País *"
                      sx={{ flex: 1 }}
                    />
                  </Stack>
                  <Typography sx={{ fontSize: '12px', color: '#91A0AD' }}>
                    * Campo obrigatório
                  </Typography>
                </Box>
              </Form>
            </Collapse>
          </>
        )}
        {orderStatus !== 'new' && (
          <>
            <StepLabel
              title="Método de Pagamento"
              step="4"
              droppable={isOrderView}
              opened={openPaymentInfo}
              onOpenClick={() => setOpenPaymentInfo((prev) => !prev)}
            />
            <Collapse sx={{ mt: '0px' }} in={openPaymentInfo} unmountOnExit>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CheckoutPaymentMethod
                  options={CARDS}
                  onPaymentMethodSelect={onPaymentMethodSelect}
                />
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
                  <AddNewCardForm onAddCard={(result) => handleAddCard(result)} />
                </Collapse>
              </Box>
            </Collapse>
          </>
        )}
      </Stack>
    </>
  );
}

// -------------------------------- //

type StepLabelProps = {
  step: string;
  title: string;
  onOpenClick?: MouseEventHandler<HTMLDivElement>;
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
