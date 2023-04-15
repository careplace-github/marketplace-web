 
import { useState } from 'react';
// @mui
import { Pagination, Tabs, Tab, Box } from '@mui/material';
// types
import { IServiceProps } from 'src/types/service';
//
import ServiceItem from '../item/ServiceItem';
 

// ----------------------------------------------------------------------

type Props = {
  services: IServiceProps[];
};

export default function ServicesList({ services }: Props) {
  const [tab, setTab] = useState('All');

  const getCategories = services.map((service) => service.category);

  const categories = ['All', ...Array.from(new Set(getCategories))];

  const filtered = applyFilter(services, tab);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <>
      <Tabs
        value={tab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={handleChangeTab}
      >
        {categories.map((category) => (
          <Tab key={category} value={category} label={category} />
        ))}
      </Tabs>

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
        {filtered.map((service) => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </Box>

      <Pagination
        count={10}
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
  if (category !== 'All') {
    arr = arr.filter((service) => service.category === category);
  }
  return arr;
}
