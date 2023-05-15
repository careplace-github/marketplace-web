import { useEffect, useState } from 'react';
// next
// @mui
import {
  Stack,
  Drawer,
  Typography,
  TextField,
  InputAdornment,
  SelectChangeEvent,
  Slider,
  Box,
} from '@mui/material';

// hooks
import useResponsive from 'src/hooks/useResponsive';
// config
import { NAV } from 'src/layouts';
// types
import { IServiceProps } from 'src/types/utils';
import { ICompanyFiltersProps } from 'src/types/company';
// components
import Iconify from 'src/components/iconify';
// next
import { useRouter } from 'next/router';
//
import Weekdays from 'src/data/Weekdays';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import { FilterWeekdays, FilterServices } from './components';

// ----------------------------------------------------------------------

const defaultValues = {
  filterWeekdays: [],
  filterServices: [],
};

type FiltersProps = {
  lat: string | null;
  lng: string | null;
  query: string | null;
};

type Props = {
  mobileOpen: boolean;
  onMobileClose: VoidFunction;
  services: Array<IServiceProps>;
  whenLoading: Function;
};

export default function CompaniesFilters({
  whenLoading,
  services,
  mobileOpen,
  onMobileClose,
}: Props) {
  const isMdUp = useResponsive('up', 'md');
  const [filters, setFilters] = useState<ICompanyFiltersProps>(defaultValues);
  const [weekDaysSelected, setWeekDaysSelected] = useState<number[]>([]);
  const [servicesSelected, setServicesSelected] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sliderValue, setSliderValue] = useState<number[]>([0, 50]);
  const { pathname, push, query } = useRouter();
  const router = useRouter();
  const [filterQuerys, setFilterQuerys] = useState<FiltersProps>({
    lat: null,
    lng: null,
    query: '',
  });

  const setDefaultFilterValues = (queryValues) => {
    const labels: IServiceProps[] = [];
    const days: number[] = [];
    let minPrice = sliderValue[0];
    let maxPrice = sliderValue[1];
    if (queryValues.services) {
      const idArray = queryValues.services.split(',');
      services.forEach((item) => {
        if (idArray.includes(item._id)) {
          labels.push(item);
        }
      });
    }
    if (queryValues.weekDay) {
      const idArray = queryValues.weekDay.split(',');

      Weekdays.forEach((item) => {
        if (idArray.includes(`${item.value}`)) {
          days.push(item.value);
        }
      });
    }
    if (queryValues.minPrice) {
      minPrice = queryValues.minPrice;
    }
    if (queryValues.maxPrice) {
      maxPrice = queryValues.maxPrice;
    }
    setFilters({
      ...filters,
      filterServices: labels,
      filterWeekdays: days,
    });
    setSliderValue([minPrice, maxPrice]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (router.isReady) {
      if (router.query) {
        setFilterQuerys({
          lat: router.query.lat as string,
          lng: router.query.lng as string,
          query: router.query.query as string,
        });
        setIsLoading(true);
        setDefaultFilterValues(router.query);
      }
    }
  }, [router.isReady]);

  const handleChangeLevel = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;

    const newFilter = value as number[];
    setFilters({
      ...filters,
      filterWeekdays: newFilter,
    });
    const currentQuery = router.query;
    whenLoading(true);
    router.push({
      pathname: '/companies',
      query: {
        ...currentQuery,
        weekDay: newFilter.join(','),
        page: 1,
      },
    });
  };

  const handleChangeLanguage = (keyword: IServiceProps[]) => {
    const auxId: any[] = [];
    keyword.forEach((item) => auxId.push(item._id));
    setFilters({
      ...filters,
      filterServices: keyword,
    });
    const currentQuery = router.query;
    whenLoading(true);
    router.push({
      pathname: '/companies',
      query: {
        ...currentQuery,
        services: auxId.join(','),
        page: 1,
      },
    });
  };

  useEffect(() => {
    const delay = 700;

    const timeoutId = setTimeout(() => {
      const currentQuery = router.query;
      whenLoading(true);
      router.push({
        pathname: '/companies',
        query: {
          ...currentQuery,
          minPrice: sliderValue[0],
          maxPrice: sliderValue[1],
          page: 1,
        },
      });
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [sliderValue]);

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  function valuetext(value: number) {
    return `${value}`;
  }

  const sliderMarks = [
    { value: 0, label: '0€/h' },
    { value: 50, label: '50€/h' },
  ];

  function valueLabelFormatPrice(value: number) {
    return `${value}€/h`;
  }

  const renderContent = (
    <Stack
      spacing={2.5}
      sx={{
        mb: '50px',
        flexShrink: 0,
        width: { xs: 1, md: NAV.W_DRAWER },
      }}
    >
      {!isMdUp && (
        <Stack direction="row" justifyContent="flex-end" sx={{ width: '100%' }}>
          <Iconify icon="carbon:close" width="30px" height="30px" onClick={onMobileClose} />
        </Stack>
      )}

      <Block title="Dias da semana">
        <FilterWeekdays filterWeekdays={filters.filterWeekdays} onChangeLevel={handleChangeLevel} />
      </Block>

      <Block title="Serviços">
        <FilterServices
          services={services}
          filterServices={filters.filterServices}
          onChangeLanguage={handleChangeLanguage}
        />
      </Block>

      <Block title="Preço">
        <Box sx={{ width: '100%', padding: isMdUp ? '0px 10px' : '0px 20px' }}>
          <Slider
            sx={{
              '& .MuiSlider-markLabel': {
                pointerEvents: 'none', // Disable pointer events on active (clicked) markers
              },
              '& .MuiSlider-mark': {
                backgroundColor: 'transparent',
              },
            }}
            getAriaLabel={() => 'Temperature range'}
            value={sliderValue}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            getAriaValueText={(text) => valuetext(text)}
            valueLabelFormat={(text) => valueLabelFormatPrice(text)}
            max={50}
            marks={sliderMarks}
          />
        </Box>
      </Block>
    </Stack>
  );

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      {isMdUp ? (
        renderContent
      ) : (
        <Drawer
          anchor="bottom"
          open={mobileOpen}
          onClose={onMobileClose}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              pt: '20px',
              px: 3,
              width: '100%',
              height: '80%',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

type BlockProps = {
  title: string;
  children: React.ReactNode;
};

function Block({ title, children }: BlockProps) {
  return (
    <Stack spacing={1.5}>
      <Typography variant="overline" sx={{ color: 'text.disabled' }}>
        {title}
      </Typography>

      {children}
    </Stack>
  );
}
