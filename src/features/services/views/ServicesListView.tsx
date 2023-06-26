// react
import { useState, useEffect, useRef } from 'react';
// components
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
// @mui
import { Container, Typography, Stack } from '@mui/material';
// types
import { IServiceProps } from 'src/types/utils';
// axios
import axios from 'src/lib/axios';
//
import { ServicesList } from '../components';

// ----------------------------------------------------------------------

export default function ServicesListView() {
  const [servicesLoading, setServicesLoading] = useState<boolean>(true);
  const [availableServices, setAvailableServices] = useState<IServiceProps[]>();
  const topRef = useRef();
  useEffect(() => {
    setServicesLoading(true);
    const fetchServices = async () => {
      const response = await axios.get('/services', { params: { documentsPerPage: 6, page: 1 } });
      console.log(response.data);
      const normalServices: IServiceProps[] = [];
      response.data.data.forEach((service) => {
        if (service.type === 'normal') {
          normalServices.push(service);
        }
      });
      setAvailableServices(response.data.data);
      setServicesLoading(false);
    };

    fetchServices();
  }, []);

  return servicesLoading ? (
    <LoadingScreen />
  ) : (
    <Container>
      <Stack
        spacing={3}
        sx={{
          py: 5,
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography id="services_title" variant="h2">
          Serviços
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          Conheça todos os serviços de geriatria disponíveis na Careplace.
        </Typography>
      </Stack>

      {availableServices && <ServicesList services={availableServices} />}
    </Container>
  );
}
