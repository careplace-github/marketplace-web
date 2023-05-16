import { useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { Typography, Stack, Box, Button, Divider, Card } from '@mui/material';
// utils
import { fCurrency } from 'src/utils/formatNumber';
//
import { FilterServices, FilterWeekdays } from '../filters/components';
import { FilterTime, FilterGuests } from 'src/features/orders';
// types
import { IServiceProps } from 'src/types/utils';

// ----------------------------------------------------------------------

type Props = {
  price: number;
  services: IServiceProps[];
  companyId: string;
};

export default function CompanyDetailReserveForm({ price, services, companyId }: Props) {
  const { push } = useRouter();
  const router = useRouter();
  const theme = useTheme();
  const [filterServices, setFilterServices] = useState([]);
  const [filterWeekdays, setFilterWeekdays] = useState([]);

  useEffect(() => {
    const preSelectedServices = router.query.services;
    const preSelectedWeekdays = router.query.weekDay;
    console.log(preSelectedServices);
    console.log(preSelectedWeekdays);
  }, [router.isReady]);

  const handleClickReserve = () => {
    push('/');
  };

  const handleChangeWeekdays = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;

    const newFilter = value as number[];
    setFilterWeekdays(newFilter);
    const currentQuery = router.query;
    router.push({
      pathname: `/companies/${companyId}`,
      query: {
        ...currentQuery,
        weekDay: newFilter.join(','),
        page: 1,
      },
    });
  };

  const handleChangeServices = (keyword: IServiceProps[]) => {
    const auxId: any[] = [];
    keyword.forEach((item) => auxId.push(item._id));
    setFilterServices(keyword);
    const currentQuery = router.query;
    router.push({
      pathname: `/companies/${companyId}`,
      query: {
        ...currentQuery,
        services: auxId.join(','),
        page: 1,
      },
    });
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
              onChangeLanguage={handleChangeServices}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            Dias da semana
            <FilterWeekdays filterWeekdays={filterWeekdays} onChangeLevel={handleChangeWeekdays} />
          </Box>
        </Stack>
      </Stack>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <Stack spacing={3} sx={{ p: 3 }}>
        <Button
          size="large"
          variant="contained"
          color="inherit"
          onClick={handleClickReserve}
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
