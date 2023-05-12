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
};

export default function CompaniesFilters({ services, mobileOpen, onMobileClose }: Props) {
  const isMdUp = useResponsive('up', 'md');
  const [filters, setFilters] = useState<ICompanyFiltersProps>(defaultValues);
  const [sliderValue, setSliderValue] = useState<number[]>([0, 50]);
  const { pathname, push, query } = useRouter();
  const router = useRouter();
  const [filterQuerys, setFilterQuerys] = useState<FiltersProps>({
    lat: null,
    lng: null,
    query: '',
  });

  useEffect(() => {
    if (router.isReady) {
      if (router.query) {
        setFilterQuerys({
          lat: router.query.lat as string,
          lng: router.query.lng as string,
          query: router.query.query as string,
        });
      }
    }
  }, [router.isReady]);

  const handleChangeLevel = (event: SelectChangeEvent<typeof filters.filterLevel>) => {
    const {
      target: { value },
    } = event;

    let aux;

    const newItem = value[value.length - 1];
    if (filters.filterLevel.includes(newItem.text)) {
      aux = filters.filterLevel.filter((item) => item !== newItem.text);
    } else {
      aux = [...filters.filterLevel, newItem.text];
    }

    setFilters({
      ...filters,
      filterLevel: aux,
    });

    const currentQuery = router.query;
    console.log('query:', currentQuery);
    router.push({
      pathname: '/companies',
      query: {
        ...currentQuery,
        weekDay: newItem.value,
      },
    });

    console.log(aux);
  };

  const handleChangeLanguage = (keyword: ICountriesProps[]) => {
    setFilters({
      ...filters,
      filterLanguage: keyword,
    });
  };

  useEffect(() => {
    const delay = 700;

    const timeoutId = setTimeout(() => {
      console.log(sliderValue);
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

  return (
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
