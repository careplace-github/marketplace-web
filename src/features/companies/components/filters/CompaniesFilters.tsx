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
} from '@mui/material';

// hooks
import useResponsive from 'src/hooks/useResponsive';
// config
import { NAV } from 'src/layouts';
// types
import { ICountriesProps } from 'src/types/utils';
import { ICompanyFiltersProps } from 'src/types/company';
// components
import Iconify from 'src/components/iconify';
// next
import { useRouter } from 'next/router';
//
import { FilterLevel, FilterLanguage } from './components';
import Weekdays from 'src/data/Weekdays';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';

// ----------------------------------------------------------------------

const defaultValues = {
  filterLevel: [],
  filterLanguage: [],
};

type ServiceProps = {
  _id: string;
  description: string;
  image: string;
  name: string;
  short_description: string;
};

type Props = {
  mobileOpen: boolean;
  onMobileClose: VoidFunction;
  services: Array<ServiceProps>;
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
    const labels = [];
    const days = [];
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
          days.push(item.text);
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
      filterLanguage: labels,
      filterLevel: days,
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

  const handleChangeLevel = (event: SelectChangeEvent<typeof filters.filterLevel>) => {
    const {
      target: { value },
    } = event;

    let auxLabels;
    let auxValues;

    const newItem = value[value.length - 1];
    if (filters.filterLevel.includes(newItem.text)) {
      auxLabels = filters.filterLevel.filter((item) => item !== newItem.text);
      auxValues = weekDaysSelected.filter((item) => item !== newItem.value);
    } else {
      auxLabels = [...filters.filterLevel, newItem.text];
      auxValues = [...weekDaysSelected, newItem.value];
    }

    setFilters({
      ...filters,
      filterLevel: auxLabels,
    });
    setWeekDaysSelected(auxValues);

    const currentQuery = router.query;
    whenLoading(true);
    router.push({
      pathname: '/companies',
      query: {
        ...currentQuery,
        weekDay: auxValues.join(','),
        page: 1,
      },
    });
  };

  const handleChangeLanguage = (keyword: ICountriesProps[]) => {
    const auxId = [];
    keyword.forEach((item) => auxId.push(item._id));
    setFilters({
      ...filters,
      filterLanguage: keyword,
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
    console.log(event);
    setSliderValue(newValue);
  };

  function valuetext(value: number) {
    return `${value}`;
  }

  const sliderMarks = [
    { value: 2, label: '0€/h' },
    { value: 47, label: '50€/h' },
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
        <FilterLevel filterLevel={filters.filterLevel} onChangeLevel={handleChangeLevel} />
      </Block>

      <Block title="Serviços">
        <FilterLanguage
          services={services}
          filterLanguage={filters.filterLanguage}
          onChangeLanguage={handleChangeLanguage}
        />
      </Block>

      <Block title="Preço">
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
          getAriaValueText={valuetext}
          valueLabelFormat={valueLabelFormatPrice}
          max={50}
          marks={sliderMarks}
        />
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
              maxHeight: '80%',
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
