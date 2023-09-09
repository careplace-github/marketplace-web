// hooks
import { useEffect, useState } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { Container, Typography, Stack, Button, Card, Avatar, Box } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// axios
import axios from 'src/lib/axios';
// components
import Image from 'src/components/image';

import Iconify from 'src/components/iconify';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
//
import CompanyPicture from 'src/features/orders/components/questionnaire/completed/CompanyPicture';
import { OrderQuestionnaireCompletedSummary } from '../components';

// ----------------------------------------------------------------------

export default function OrderQuestionnaireCompletedView() {
  const isMdUp = useResponsive('up', 'md');
  const router = useRouter();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const orderId = router.asPath.split('/').at(-1);
      const response = await axios.get(`/customers/orders/home-care/${orderId}`);
      setData(response.data);
      setLoading(false);
    };
    if (router.isReady) {
      fetchData();
    }
  }, [router.isReady]);

  return loading ? (
    <LoadingScreen />
  ) : (
    <Container
      sx={{
        pt: 5,
        pb: { xs: 8, md: 15 },
        gap: 10,
        display: 'grid',
        alignItems: 'flex-start',
        gridTemplateColumns: { md: 'repeat(2, 1fr)' },
      }}
    >
      {isMdUp && (
        // <Image
        //   alt="cover"
        //   src={data.company.business_profile.logo}
        //   ratio="3/4"
        //   sx={{ borderRadius: 2 }}
        // />
        <Card
          sx={{
            mb: 8,
            height: '100%',
            position: 'relative',
          }}
        >
          <CompanyPicture
            name={data?.health_unit.business_profile.name}
            image={data?.health_unit.business_profile.logo}
            location={data?.health_unit.addresses[0].city}
          />
        </Card>
      )}

      <Stack spacing={5}>
        <Typography variant="h2">Pedido Efetuado!</Typography>
        {!isMdUp && (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Avatar
              src={data?.company.business_profile.logo}
              sx={{ width: '160px', height: '160px' }}
            />
            <Typography variant="h3" sx={{ fontSize: '26px', fontWeight: '600' }}>
              {data?.company.business_profile.name}
            </Typography>
          </Box>
        )}
        <OrderQuestionnaireCompletedSummary
          relative={data.patient}
          services={data.services}
          scheduleInformation={data.schedule_information}
          recurrency={data.schedule_information.recurrency}
        />

        <Stack spacing={2.5} direction={{ xs: 'column', md: 'row' }} justifyContent="center">
          <Button
            component={NextLink}
            href="/"
            variant="outlined"
            size="large"
            color="inherit"
            startIcon={<Iconify icon="carbon:chevron-left" />}
          >
            Voltar
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
