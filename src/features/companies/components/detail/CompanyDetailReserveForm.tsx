import { useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { useTheme } from '@mui/material/styles';
import { Typography, Stack, Box, Button, Divider, Card } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
// utils
import { fCurrency } from 'src/utils/formatNumber';

// types
import { IServiceProps } from 'src/types/utils';
//
import { FilterServices, FilterWeekdays } from '../filters/components';

// ----------------------------------------------------------------------

type Props = {
  price: number;
  services: IServiceProps[];
  companyId: string;
  onReserveFiltersChange: Function;
};

export default function CompanyDetailReserveForm({
  onReserveFiltersChange,
  price,
  services,
  companyId,
}: Props) {
  const { push } = useRouter();
  const router = useRouter();
  const theme = useTheme();
  const [filterServices, setFilterServices] = useState<IServiceProps[]>([]);
  const [filterWeekdays, setFilterWeekdays] = useState<number[]>([]);

  useEffect(() => {
    const weekdayQueryAux = router.query.services as string;
    const serviceQueryAux = router.query.weekDay as string;
    const preSelectedServices = weekdayQueryAux?.split(',');
    const preSelectedWeekdays = serviceQueryAux?.split(',');
    if (preSelectedWeekdays && services.length > 0) {
      const weekdaysSelected: number[] = [];
      preSelectedWeekdays.forEach((item) => {
        if (item) {
          weekdaysSelected.push(parseInt(item, 10));
        }
      });
      console.log('weekdays selected:', weekdaysSelected);
      if (weekdaysSelected.length > 0) {
        setFilterWeekdays(weekdaysSelected);
      }
    }
    if (preSelectedServices && services.length > 0) {
      const servicesSelected: IServiceProps[] = [];
      console.log(services);
      services.forEach((service: IServiceProps) => {
        preSelectedServices.forEach((preSelected) => {
          if (service._id === preSelected) {
            servicesSelected.push(service);
          }
        });
      });
      if (servicesSelected.length > 0) {
        setFilterServices(servicesSelected);
      }
    }
  }, [router.isReady, services]);

  const handleClickContinue = () => {
    // const currentQuery = router.query;
    const servicesIds: string[] = [];
    filterServices.forEach((service) => {
      servicesIds.push(service._id);
    });

    router.push({
      pathname: '/orders/questionnaire',
      query: {
        weekDay: filterWeekdays.join(','),
        services: servicesIds.join(','),
        id: companyId,
      },
    });
  };

  const handleChangeWeekdays = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;

    const newFilter = value as number[];
    setFilterWeekdays(newFilter);
    const ids: string[] = [];
    filterServices.forEach((item) => ids.push(item._id));
    onReserveFiltersChange(newFilter.join(','), ids.join(','));
  };

  const handleChangeServices = (keyword: IServiceProps[]) => {
    setFilterServices(keyword);
    const ids: string[] = [];
    keyword.forEach((item) => ids.push(item._id));
    onReserveFiltersChange(filterWeekdays.join(','), ids.join(','));
  };

  return (
    <Card>
      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack spacing={1} direction="row" alignItems="center" sx={{ typography: 'h4' }}>
          Desde {fCurrency(price)}€
          <Typography variant="body2" component="span" sx={{ color: 'text.disabled', ml: 1 }}>
            / Hora
          </Typography>
        </Stack>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            Serviços
            <FilterServices
              services={services}
              filterServices={filterServices}
              onChangeServices={handleChangeServices}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            Dias da semana
            <FilterWeekdays
              filterWeekdays={filterWeekdays}
              onChangeWeekdays={handleChangeWeekdays}
            />
          </Box>
        </Stack>
      </Stack>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <Stack spacing={3} sx={{ p: 3 }}>
        <Button
          size="large"
          variant="contained"
          color="inherit"
          onClick={handleClickContinue}
          sx={{
            px: 4,
            bgcolor: 'primary.main',
            color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
            '&:hover': {
              bgcolor: 'primary.dark',
              color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
            },
          }}
        >
          Continuar
        </Button>
      </Stack>
    </Card>
  );
}
