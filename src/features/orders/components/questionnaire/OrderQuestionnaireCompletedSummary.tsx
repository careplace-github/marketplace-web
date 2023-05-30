// @mui
import { Typography, Stack, Divider, Avatar } from '@mui/material';
// utils
import { fDate } from 'src/utils/formatTime';
import { fCurrency } from 'src/utils/formatNumber';
// components
import Iconify, { IconifyProps } from 'src/components/iconify';
import { IRelativeProps } from 'src/types/relative';
import { recurrency as availableRecurrencyValues } from 'src/data';
import { IScheduleInformationResponseProps } from 'src/types/order';
import Weekdays from 'src/data/Weekdays';
import { IServiceProps } from 'src/types/utils';
import { useResponsive } from 'src/hooks';
// ----------------------------------------------------------------------

type IOrderQuestionnaireCompletedSummary = {
  scheduleInformation: IScheduleInformationResponseProps;
  relative: IRelativeProps;
  recurrency: number;
  services: IServiceProps[];
};

export default function OrderQuestionnaireCompletedSummary({
  scheduleInformation,
  relative,
  recurrency,
  services,
}: IOrderQuestionnaireCompletedSummary) {
  const startDate = scheduleInformation.start_date
    ? new Date(scheduleInformation?.start_date)
    : new Date();
  const isSmUp = useResponsive('up', 'sm');
  // const servicesLabels = getAvailableServices(services);
  console.log(services);

  const getRecurrency = (value) => {
    let recurrencyLabel = '';
    availableRecurrencyValues.forEach((item) => {
      if (value === item.value) {
        recurrencyLabel = item.text;
      }
    });
    return recurrencyLabel;
  };

  const getServices = () => {
    const servicesLabels: string[] = [];
    services.forEach((service) => servicesLabels.push(service.name));
    return servicesLabels;
  };

  const getWeekdayLabels = () => {
    // recurrency
    const auxWeekdays: number[] = [];
    const auxLabels: string[] = [];
    scheduleInformation.schedule.forEach((item) => {
      auxWeekdays.push(item.week_day);
    });
    Weekdays.forEach((weekday) => {
      auxWeekdays.forEach((item) => {
        if (item === weekday.value) {
          const splitLabel = weekday.text.split('-');
          let label;
          if (recurrency !== 0) {
            if (splitLabel.length === 1) {
              label = `${splitLabel[0]}s`;
            } else {
              label = `${splitLabel[0]}s-${splitLabel[1]}`;
            }
          } else {
            label = weekday.text;
          }
          auxLabels.push(label);
        }
      });
    });

    return auxLabels;
  };

  return (
    <Stack
      spacing={3}
      sx={{
        p: 5,
        borderRadius: 2,
        border: (theme) => `dashed 1px ${theme.palette.divider}`,
      }}
    >
      <Typography variant="h5">Detalhes</Typography>

      <LineItem
        displayColumn={!isSmUp}
        icon="carbon:events"
        label="Familiar"
        value={
          <Stack
            gap="10px"
            direction="row"
            alignItems="center"
            justifyContent={!isSmUp ? 'flex-start' : 'flex-end'}
          >
            <Avatar src={relative.profile_picture} sx={{ height: '30px', width: '30px' }} />
            <Typography variant="subtitle2" component="span">
              {relative.name}
            </Typography>
          </Stack>
        }
      />

      <LineItem
        displayColumn={!isSmUp}
        icon="majesticons:calendar-line"
        label="Data de início"
        value={new Intl.DateTimeFormat('pt').format(startDate)}
      />

      <Divider sx={{ borderStyle: 'dashed' }} />

      <LineItem
        displayColumn={!isSmUp}
        multiline
        icon="material-symbols:medical-services-outline-rounded"
        label="Serviços"
        value={
          <Stack
            sx={{ width: '100%' }}
            direction="column"
            alignItems="flex-end"
            justifyContent="flex-start"
          >
            {getServices().map((service) => (
              <Typography
                variant="subtitle2"
                sx={{
                  width: '100%',
                  color: 'text.primary',
                  flexGrow: 1,
                  textAlign: !isSmUp ? 'left' : 'right',
                }}
              >
                {service}
              </Typography>
            ))}
          </Stack>
        }
      />

      <LineItem
        displayColumn={!isSmUp}
        icon="material-symbols:event-repeat-outline-rounded"
        label="Recorrência"
        value={getRecurrency(recurrency)}
      />

      <LineItem
        displayColumn={!isSmUp}
        icon="material-symbols:edit-calendar-outline"
        label="Dias da semana"
        multiline
        value={
          <Stack
            sx={{ width: '100%' }}
            direction="column"
            alignItems={isSmUp ? 'flex-end' : 'flex-start'}
            justifyContent="flex-start"
          >
            {getWeekdayLabels().map((weekday) => (
              <Typography
                variant="subtitle2"
                sx={{
                  color: 'text.primary',
                  flexGrow: 1,
                  textAlign: !isSmUp ? 'left' : 'right',
                  maxWidth: '50%',
                }}
              >
                {weekday}
              </Typography>
            ))}
          </Stack>
        }
      />
    </Stack>
  );
}

// ----------------------------------------------------------------------

type LineItemProps = {
  icon: IconifyProps;
  label: string;
  value: any;
  multiline?: boolean;
  displayColumn?: boolean;
};

function LineItem({ icon, label, value, multiline, displayColumn }: LineItemProps) {
  return (
    <Stack
      direction={displayColumn ? 'column' : 'row'}
      alignItems={multiline || displayColumn ? 'flex-start' : 'center'}
      justifyContent={displayColumn ? 'flex-start' : 'space-between'}
      sx={{ typography: 'body2', color: 'text.secondary' }}
    >
      <Stack direction="row" alignItems="center">
        <Iconify icon={icon} width={24} sx={{ mr: 1 }} /> {label}
      </Stack>
      <Typography
        variant="subtitle2"
        sx={{
          mt: displayColumn ? '20px' : 0,
          width: '100%',
          color: 'text.primary',
          flexGrow: 1,
          textAlign: displayColumn ? 'left' : 'right',
          maxWidth: !displayColumn ? '60%' : '95%',
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
}
