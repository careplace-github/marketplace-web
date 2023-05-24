// hooks
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// @mui
import {
  Stack,
  Box,
  Switch,
  Collapse,
  Typography,
  FormControlLabel,
  TextField,
  Button,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// components
import { RHFTextField } from 'src/components/hook-form';
import RelativeSelector from 'src/components/relative-selector/RelativeSelector';
import {
  FilterServices,
  FilterWeekdays,
  FilterRecurrency,
} from 'src/features/companies/components';
import { IServiceProps } from 'src/types/utils';
import Weekdays from 'src/data/Weekdays';
import { IRelativeProps } from 'src/types/relative';

// ----------------------------------------------------------------------

// "schedule_information": {
//   "start_date": "2023-01-05T00:00:00.000Z",
//   "recurrency": 0,
//   "schedule": [
//     {
//       "week_day": 1,
//       "start": "08:00",
//       "end": "11:00",
//       "_id": "6407b425a86c23453036d6a6"
//     }
//   ],
//   "end_date": null
// },

type Props = {
  services: IServiceProps[];
  relatives: IRelativeProps[];
  sameBilling: boolean;
  onChangeSameBilling: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type IScheduleProps = {
  weekDay: number;
  start: date | undefined;
  end: date | undefined;
  valid: boolean | undefined;
};

export default function OrderQuestionnaireShippingForm({
  sameBilling,
  relatives,
  onChangeSameBilling,
  services,
}: Props) {
  const router = useRouter();
  const [filterServices, setFilterServices] = useState<IServiceProps[]>([]);
  const [filterWeekdays, setFilterWeekdays] = useState<number[]>([]);
  const [filterRecurrency, setFilterRecurrency] = useState<number>();
  const [selectedRelative, setSelectedRelative] = useState<IRelativeProps>();
  const [schedule, setSchedule] = useState<IScheduleProps[]>([
    {
      weekday: 1,
      start: undefined,
      end: undefined,
      valid: undefined,
    },
    {
      weekday: 2,
      start: undefined,
      end: undefined,
      valid: undefined,
    },
    {
      weekday: 3,
      start: undefined,
      end: undefined,
      valid: undefined,
    },
    {
      weekday: 4,
      start: undefined,
      end: undefined,
      valid: undefined,
    },
    {
      weekday: 5,
      start: undefined,
      end: undefined,
      valid: undefined,
    },
    {
      weekday: 6,
      start: undefined,
      end: undefined,
      valid: undefined,
    },
    {
      weekday: 7,
      start: undefined,
      end: undefined,
      valid: undefined,
    },
  ]);
  const [startDate, setStartDate] = useState<Date>();
  const handleChangeServices = (keyword: IServiceProps[]) => {
    setFilterServices(keyword);
  };

  useEffect(() => {
    // show pre selected values for weekdays and services
    if (router.isReady) {
      const query = router.query;
      const weekdaysPreSelected = [];

      if (query.weekDay) {
        query.weekDay.split(',').forEach((item) => {
          weekdaysPreSelected.push(parseInt(item, 10));
        });
      }

      const servicesPreSelected = [];

      services.forEach((service) => {
        query.services.split(',').forEach((id) => {
          if (service._id === id) {
            servicesPreSelected.push(service);
          }
        });
      });

      if (weekdaysPreSelected.length > 0) {
        setFilterWeekdays(weekdaysPreSelected);
      }
      if (servicesPreSelected.length > 0) {
        setFilterServices(servicesPreSelected);
      }
    }
  }, [router.isReady]);

  const removeFromSchedule = (weekdayId) => {
    const prevState = schedule[weekdayId - 1];
    const newItem = { ...prevState, start: undefined, end: undefined, valid: undefined };
    const newSchedule = schedule;
    newSchedule[weekdayId - 1] = newItem;
    setSchedule([...newSchedule]);
  };

  const handleChangeWeekdays = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;
    const newFilter = value as number[];
    if (newFilter.length < filterWeekdays.length) {
      const toRemove = filterWeekdays.filter((element) => !newFilter.includes(element))[0];
      removeFromSchedule(toRemove);
    }
    setFilterWeekdays(newFilter);
  };

  const handleChangeRelativeSelected = (event: SelectChangeEvent<IRelativeProps>) => {
    const {
      target: { value },
    } = event;
    const newRelative = value as IRelativeProps;
    setSelectedRelative(newRelative);
  };

  const handleChangeRecurrency = (event: SelectChangeEvent<number>) => {
    const {
      target: { value },
    } = event;
    const newFilter = value as number;
    setFilterRecurrency(newFilter);
  };

  const getMinDate = (weekdayId) => {
    let weekdayItem;

    schedule.forEach((item) => {
      if (item.weekday === weekdayId) {
        weekdayItem = item;
      }
    });

    return weekdayItem.start ? weekdayItem.start : undefined;
  };

  return (
    <Stack spacing={5}>
      <StepLabel title="Informação do Pedido" step="1" />
      <div>
        <Stack spacing={2.5} sx={{ mb: '24px' }}>
          <Stack spacing={{ xs: 2.5, md: 2 }} direction={{ xs: 'column', md: 'row' }}>
            {/* <RHFTextField name="billingAddress.firstName" label="First Name" /> */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block' }}>
                Serviços
              </Typography>
              <FilterServices
                services={services}
                filterServices={filterServices}
                onChangeServices={handleChangeServices}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block' }}>
                Dias da semana
              </Typography>
              <FilterWeekdays
                filterWeekdays={filterWeekdays}
                onChangeWeekdays={handleChangeWeekdays}
              />
            </Box>
          </Stack>
          <Stack spacing={{ xs: 2.5, md: 2 }} direction={{ xs: 'column', md: 'row' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block' }}>
                Recurrência
              </Typography>
              <FilterRecurrency
                filterRecurrency={filterRecurrency}
                onChangeRecurrency={handleChangeRecurrency}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block' }}>
                Data de ínicio
              </Typography>
              <DatePicker
                slotProps={{
                  textField: {
                    hiddenLabel: true,
                  },
                }}
                onChange={(newDate) => setStartDate(newDate)}
                format="dd-MM-yyyy"
                value={new Date()}
                minDate={new Date()}
              />
            </Box>
          </Stack>
          {filterWeekdays.length > 0 &&
            filterWeekdays.map((item) => {
              let weekdayItem;
              Weekdays.forEach((weekday) => {
                if (weekday.value === item) {
                  weekdayItem = weekday;
                }
              });
              return (
                <Box
                  key={item}
                  sx={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}
                >
                  <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block' }}>
                    {weekdayItem.text}
                  </Typography>

                  <Stack gap="10px" direction="row">
                    <TimePicker
                      ampm={false}
                      seconds={false}
                      sx={{ flex: 1 }}
                      minTime={new Date(0, 0, 0, 9, 0)}
                      maxTime={new Date(0, 0, 0, 18, 0)}
                      onChange={(startHour) => {
                        const prevState = schedule[weekdayItem.value - 1];
                        const newItem = {
                          ...prevState,
                          start: startHour,
                          valid:
                            startHour && prevState.end
                              ? startHour.getTime() < prevState.end.getTime()
                              : undefined,
                        };
                        const newSchedule = schedule;
                        newSchedule[weekdayItem.value - 1] = newItem;
                        setSchedule([...newSchedule]);
                      }}
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
                      minTime={new Date(0, 0, 0, 9, 0)}
                      maxTime={new Date(0, 0, 0, 18, 0)}
                      skipDisabled
                      ampm={false}
                      seconds={false}
                      sx={{ flex: 1 }}
                      onChange={(endHour) => {
                        const prevState = schedule[weekdayItem.value - 1];

                        const newItem = {
                          ...prevState,
                          end: endHour,
                          valid:
                            endHour && prevState.start
                              ? endHour.getTime() > prevState.start.getTime()
                              : undefined,
                        };
                        const newSchedule = schedule;
                        newSchedule[weekdayItem.value - 1] = newItem;
                        setSchedule([...newSchedule]);
                      }}
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

      <StepLabel title="Escolha o Familiar" step="2" />

      <div>
        <RelativeSelector
          onChangeRelative={handleChangeRelativeSelected}
          relativeSelected={selectedRelative}
          relatives={relatives}
        />

        <Collapse
          in={!!selectedRelative}
          unmountOnExit
          sx={{
            ...(!sameBilling && { mt: 3 }),
          }}
        >
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
    </Stack>
  );
}

// -------------------------------- //

type StepLabelProps = {
  step: string;
  title: string;
};

function StepLabel({ step, title }: StepLabelProps) {
  return (
    <Stack direction="row" alignItems="center" sx={{ mb: 3, typography: 'h5' }}>
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
  );
}
