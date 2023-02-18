import { useState } from 'react';
// icons
import filterIcon from '@iconify/icons-carbon/filter';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Stack, Typography, Button, Box } from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT, DRAWER_WIDTH } from '../../../src/config';
// hooks
import { useRequest } from '../../../src/hooks';
// layouts
import Layout from '../../../src/layouts';
// components
import { Page, ErrorScreen, Iconify } from '../../../src/components';
// sections
import { NewsletterElearning } from '../../../src/sections/newsletter';
import { ElearningCourseList, ElearningCourseBarFilters } from '../../../src/sections/@e-learning';
import axios from '../../../src/utils/axios';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

export default function ElearningCoursesPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  let services = []
  let error=false
  let isLoading = false
  const onLoad = async () => {
    try {
      const response = await axios.get('/api/v1/services');
      services = response.data.services;
      console.log(services);
    } catch (bug) {
      error=true
    }
  };
  //const { data: courses = [], error, isLoading } = localStorage.getItem('services')
  const handleMobileOpen = () => {
    setMobileOpen(true);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };
  onLoad()
  if (error) {
    return <ErrorScreen />;
  }

  return (
    <Page title="Serviços de Apoio ao Domicílio">
      <RootStyle>
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              my: 5,
              mb: { md: 8 },
            }}
          >
            <Typography variant="h2">Empresas de Apoio ao Domicílio</Typography>
            <Button
              color="inherit"
              variant="contained"
              startIcon={<Iconify icon={filterIcon} sx={{ width: 18, height: 18 }} />}
              onClick={handleMobileOpen}
              sx={{
                display: { md: 'none' },
              }}
            >
              Filtrar
            </Button>
          </Stack>

          <Stack direction={{ xs: 'column', md: 'row' }}>
            <ElearningCourseBarFilters mobileOpen={mobileOpen} onMobileClose={handleMobileClose} />
            <Box
              sx={{
                flexGrow: 1,
                pl: { md: 8 },
                width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
              }}
            >
              <ElearningCourseList courses={services} loading={isLoading} />
            </Box>
          </Stack>
        </Container>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

ElearningCoursesPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
