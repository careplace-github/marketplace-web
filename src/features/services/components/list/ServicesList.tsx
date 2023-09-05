import { useEffect, useState } from 'react';
// @mui
import { Pagination, Tabs, Tab, Box, Stack, Button } from '@mui/material';
// types
import { IServiceProps } from 'src/types/utils';
//
import { PATHS } from 'src/routes/paths';
import { useResponsive } from 'src/hooks';
// router
import { useRouter } from 'next/router';
// components
import Iconify from 'src/components/iconify/Iconify';
import ServiceItem from '../item/ServiceItem';

// ----------------------------------------------------------------------

type Props = {
  services: IServiceProps[];
};

export default function ServicesList({ services }: Props) {
  const isSmUp = useResponsive('up', 'sm');
  const [tab, setTab] = useState('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();
  const [servicesSelected, setServicesSelected] = useState<string[]>([]);
  const servicesPerPage = 6;
  const startIndex = (currentPage - 1) * servicesPerPage;
  const endIndex = startIndex + servicesPerPage;

  const categories = [
    { text: 'Todos', value: 'all' },
    { text: 'Apoio Domiciliário', value: 'normal' },
    { text: 'Especializados', value: 'special' },
  ];

  const [filtered, setFiltered] = useState<IServiceProps[]>([]);
  useEffect(() => {
    const auxFiltered = applyFilter(services, tab);
    setFiltered(auxFiltered);
    setCurrentPage(1);
  }, [services, tab]);

  applyFilter(services, tab);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <>
      <Stack
        direction={isSmUp ? 'row' : 'column'}
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Tabs
          value={tab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={handleChangeTab}
          sx={{ width: '100%' }}
        >
          {categories.map((category) => (
            <Tab key={category.value} value={category.value} label={category.text} />
          ))}
        </Tabs>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          gap="10px"
          sx={{ mt: isSmUp ? '0px' : '20px', width: '100%' }}
        >
          {servicesSelected.length > 0 && (
            <Button
              variant="contained"
              color="inherit"
              onClick={() => setServicesSelected([])}
              sx={{
                height: '40px',
                width: '40px',
                px: 4,
                bgcolor: 'rgb(238, 75, 43)',
                color: 'common.white',
                '&:hover': {
                  bgcolor: 'rgb(238, 75, 43,0.8)',
                },
              }}
            >
              <Iconify icon="tabler:trash" color="white" />
            </Button>
          )}
          <Button
            variant="contained"
            color="inherit"
            onClick={() => {
              router.push({
                pathname: PATHS.companies.root,
                query: { services: servicesSelected.join(',') },
              });
            }}
            sx={{
              height: '40px',
              width: isSmUp ? 'contained' : '100%',
              px: 4,
              bgcolor: 'primary.main',
              color: 'common.white',
              '&:hover': {
                bgcolor: 'primary.dark',
                color: 'common.white',
              },
            }}
          >
            Encontrar Cuidador
          </Button>
        </Stack>
      </Stack>

      <Box
        sx={{
          pt: 5,
          pb: 10,
          gap: 4,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {filtered.slice(startIndex, endIndex).map((service) => (
          <ServiceItem
            key={service._id}
            service={service}
            selected={!!servicesSelected.includes(service._id)}
            onItemSelect={(add) => {
              if (add) {
                setServicesSelected((prev) => [...prev, service._id]);
              } else {
                const newArray: string[] = servicesSelected.filter((item) => {
                  return service._id !== item;
                });
                setServicesSelected(newArray);
              }
            }}
          />
        ))}
      </Box>

      <Pagination
        count={Math.ceil(filtered.length / 6) || 1}
        page={currentPage}
        onChange={(event, value) => {
          const element = document.getElementById('services_title');
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth', // Scroll with smooth animation
              block: 'start', // Scroll to the top of the element
            });
          }
          setCurrentPage(value);
        }}
        color="primary"
        size="large"
        sx={{
          pb: 10,
          '& .MuiPagination-ul': {
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter(arr: IServiceProps[], category: string) {
  if (category !== 'all') {
    arr = arr.filter((service) => service.type === category);
  }
  return arr;
}
