// hooks
import { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { IScheduleProps } from 'src/types/order';
import { useResponsive } from 'src/hooks';
// paths
import { PATHS } from 'src/routes';
// @mui
import {
  Stack,
  Box,
  Collapse,
  Typography,
  TextField,
  SelectChangeEvent,
  Checkbox,
  Button,
} from '@mui/material';
import { useTheme } from '@emotion/react';
// components
import { Tooltip } from 'src/components/tooltip/Tooltip';
import AvatarDropdown from 'src/components/avatar-dropdown';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import {
  FilterServices,
  FilterWeekdays,
  FilterRecurrency,
} from 'src/features/companies/components';
import { IServiceProps } from 'src/types/utils';
import Weekdays from 'src/data/Weekdays';
import { IRelativeProps } from 'src/types/relative';
import Iconify from 'src/components/iconify/Iconify';
import EmptyState from 'src/components/empty-state/EmptyState';

// ----------------------------------------------------------------------

type Props = {
  services: IServiceProps[];
  relatives: IRelativeProps[];
  onValidChange: Function;
};

export default function OrderQuestionnaireForm({ relatives, onValidChange, services }: Props) {
  const router = useRouter();
  const theme = useTheme();
  const isSmUp = useResponsive('up', 'sm');
  const [filterServices, setFilterServices] = useState<IServiceProps[]>([]);
  const [filterWeekdays, setFilterWeekdays] = useState<number[]>([]);
  const [filterRecurrency, setFilterRecurrency] = useState<number>();
  const [selectedRelative, setSelectedRelative] = useState<IRelativeProps>();
  const [schedule, setSchedule] = useState<IScheduleProps[]>([
    {
      week_day: 1,
      start: null,
      end: null,
      nightService: false,
      valid: null,
    },
    {
      week_day: 2,
      start: null,
      end: null,
      nightService: false,
      valid: null,
    },
    {
      week_day: 3,
      start: null,
      end: null,
      nightService: false,
      valid: null,
    },
    {
      week_day: 4,
      start: null,
      end: null,
      nightService: false,
      valid: null,
    },
    {
      week_day: 5,
      start: null,
      end: null,
      nightService: false,
      valid: null,
    },
    {
      week_day: 6,
      start: null,
      end: null,
      nightService: false,
      valid: null,
    },
    {
      week_day: 7,
      start: null,
      end: null,
      nightService: false,
      valid: null,
    },
  ]);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const handleChangeServices = (keyword: IServiceProps[]) => {
    setFilterServices(keyword);
  };

  useEffect(() => {
    let counter: number = 0;
    schedule.forEach((item) => {
      if (item.valid === true) {
        counter += 1;
      }
    });
    const isScheduleValid = filterWeekdays.length === counter && counter !== 0;
    const auxDate = new Date();
    const dateDay = auxDate.getDate();
    const dateMonth = auxDate.getMonth() + 1;
    const dateYear = auxDate.getFullYear();
    const today = new Date(`${dateYear}-${dateMonth}-${dateDay}`);
    const isInvalid =
      !(filterRecurrency || filterRecurrency === 0) ||
      filterServices.length === 0 ||
      filterWeekdays.length === 0 ||
      (startDate && startDate.getTime() < today.getTime()) ||
      !isScheduleValid ||
      !selectedRelative;
    if (isInvalid) {
      onValidChange(false, null);
      return;
    }

    const servicesIds: string[] = [];
    filterServices.forEach((item) => {
      servicesIds.push(item._id);
    });
    const scheduleToSend: IScheduleProps[] = [];
    schedule.forEach((item) => {
      if (item.valid) {
        scheduleToSend.push({
          week_day: item.week_day,
          start: item.start,
          end: item.end,
        });
      }
    });
    const data = {
      relativeSelected: selectedRelative._id,
      servicesSelected: servicesIds,
      startDateSelected: startDate,
      recurrency: filterRecurrency,
      schedule: scheduleToSend,
    };
    onValidChange(true, data);
  }, [filterRecurrency, filterServices, filterWeekdays, startDate, schedule, selectedRelative]);

  useEffect(() => {
    // show pre selected values for weekdays and services
    if (router.isReady) {
      const query = router.query;
      const weekdaysPreSelected: number[] = [];
      const weekdays = query.weekDay as string;
      if (weekdays) {
        weekdays.split(',').forEach((item) => {
          weekdaysPreSelected.push(parseInt(item, 10));
        });
      }

      const servicesPreSelected: IServiceProps[] = [];
      const queryServices = query?.services as string;

      if (queryServices) {
        services.forEach((service) => {
          queryServices.split(',').forEach((id) => {
            if (service._id === id) {
              servicesPreSelected.push(service);
            }
          });
        });
      }

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
    const newItem = { ...prevState, start: null, end: null, valid: null };
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

  const handleChangeRelativeSelected: (
    event: SelectChangeEvent<string>,
    child: ReactNode
  ) => void = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    const newRelative = value as string;
    console.log(newRelative);
    console.log(JSON.parse(newRelative));
    setSelectedRelative(JSON.parse(newRelative));
  };

  const handleChangeRecurrency = (event: SelectChangeEvent<number>) => {
    const {
      target: { value },
    } = event;
    const newFilter = value as number;
    setFilterRecurrency(newFilter);
  };

  function addOneDay(date: Date): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
  }
  function removeOneDay(date: Date): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    return newDate;
  }

  useEffect(() => {
    console.log(schedule);
  }, [schedule]);

  return (
    <Stack spacing={5}>
      <StepLabel title="Informação do Pedido" step="1" />
      <div>
        <Stack spacing={2.5} sx={{ mb: '24px' }}>
          <Stack gap="16px" direction={{ xs: 'column', md: 'row' }}>
            {/* <RHFTextField name="billingAddress.firstName" label="First Name" /> */}
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
                services={services}
                filterServices={filterServices}
                onChangeServices={handleChangeServices}
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
                filterWeekdays={filterWeekdays}
                onChangeWeekdays={handleChangeWeekdays}
              />
            </Box>
          </Stack>
          <Stack spacing={{ xs: 2.5, md: 2 }} direction={{ xs: 'column', md: 'row' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block' }}>
                Recorrência
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
                value={startDate}
                minDate={new Date()}
              />
            </Box>
          </Stack>
          {filterWeekdays.length > 0 &&
            filterWeekdays
              .sort((a, b) => a - b)
              .map((item) => {
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
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="flex-start"
                      gap="5px"
                    >
                      <Typography
                        variant="overline"
                        sx={{ color: 'text.secondary', display: 'block' }}
                      >
                        {weekdayItem.text}
                      </Typography>
                      <Tooltip
                        tooltipWidth={!isSmUp ? '200px' : undefined}
                        placement="right"
                        text='Caso pretenda que o serviço seja prestado num hórario noturno, por favor selecione a opção "Cuidado Notruno"'
                      />
                    </Stack>
                    <Stack gap="10px" direction="row">
                      <TimePicker
                        ampm={false}
                        sx={{ flex: 1 }}
                        onChange={(value) => {
                          const startHour = value as Date;
                          const prevState = schedule[weekdayItem.value - 1];
                          const newItem = {
                            ...prevState,
                            start: startHour,
                            valid:
                              prevState.nightService === true ||
                              (prevState.end &&
                                startHour &&
                                prevState.end.getTime() > startHour.getTime()),
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
                        skipDisabled
                        ampm={false}
                        sx={{ flex: 1 }}
                        onChange={(value) => {
                          const prevState = schedule[weekdayItem.value - 1];

                          const endHour = prevState.nightService
                            ? addOneDay(value as Date)
                            : (value as Date);
                          const newItem = {
                            ...prevState,
                            end: endHour,
                            valid:
                              prevState.nightService === true ||
                              (endHour &&
                                prevState.start &&
                                endHour.getTime() > prevState.start.getTime()),
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
                    <Stack direction="row" alignItems="center" justifyContent="flex-start">
                      <Checkbox
                        checked={schedule[weekdayItem.value - 1].nightService}
                        size="small"
                        sx={{
                          width: '30px',
                          ml: '-7px',
                          color: 'text.secondary',
                        }}
                        onClick={() => {
                          const newSchedule = schedule;
                          const prevSchedule = newSchedule[weekdayItem.value - 1];
                          const isNightService = !prevSchedule.nightService;
                          const newEndTime = isNightService
                            ? addOneDay(prevSchedule.end as Date)
                            : removeOneDay(prevSchedule.end as Date);

                          newSchedule[weekdayItem.value - 1] = {
                            ...newSchedule[weekdayItem.value - 1],
                            nightService: isNightService,
                            end: newEndTime,
                            valid: isNightService
                              ? true
                              : newEndTime &&
                                prevSchedule.start &&
                                newEndTime.getTime() > prevSchedule.start.getTime(),
                          };
                          setSchedule([...newSchedule]);
                        }}
                      />
                      <Typography sx={{ fontSize: '14px', color: 'text.secondary' }}>
                        Cuidado Noturno
                      </Typography>
                    </Stack>
                  </Box>
                );
              })}
        </Stack>
      </div>

      <StepLabel title="Escolha o Familiar" step="2" />
      <div>
        {relatives.length > 0 ? (
          <>
            <AvatarDropdown
              onChange={handleChangeRelativeSelected}
              selected={JSON.stringify(selectedRelative)}
              options={relatives}
              selectText="Escolha um familiar"
            />
            <Stack width="100%" alignItems="flex-end" justifyContent="flex-start">
              <Button
                variant="text"
                sx={{
                  mt: 2,
                  color: 'primary.main',
                }}
                onClick={() => router.push(PATHS.account.relatives)}
              >
                Adicionar Familiar
              </Button>
            </Stack>
          </>
        ) : (
          <EmptyState
            icon="bi:person-x-fill"
            title="Não tem nenhum familiar associado"
            description="Todos os familiares que adicionar vão ser apresentados nesta página"
            actionComponent={
              <Button
                variant="contained"
                onClick={() => router.push(PATHS.account.relatives)}
                sx={{
                  mt: 3,
                  px: 4,
                  width: '90%',
                  maxWidth: '300px',
                  bgcolor: 'primary.main',
                  color: 'common.white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    color: 'common.white',
                  },
                }}
              >
                Adicionar familiar
              </Button>
            }
          />
        )}

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
    </Stack>
  );
}

// -------------------------------- //

type StepLabelProps = {
  step: string;
  title: string;
};

function StepLabel({ step, title }: StepLabelProps) {
  const theme = useTheme();
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
