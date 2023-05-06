// react
import { useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Container, Stack, Typography, Button, Box } from '@mui/material';
// config
import { NAV } from 'src/layouts/config';
// axios
import axios from 'src/lib/axios';
// components
import Iconify from 'src/components/iconify';
//
import { animateScroll } from 'react-scroll';
//
import { useResponsive } from 'src/hooks';
import { ICompanyProps } from 'src/types/company';
import CompaniesList from '../components/list/CompaniesList';
import CompaniesFilters from '../components/filters/CompaniesFilters';
// ----------------------------------------------------------------------

export default function CompaniesListView() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [companies, setCompanies] = useState<ICompanyProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState();
  const router = useRouter();
  const isMdUp = useResponsive('up', 'md');

  useEffect(() => {
    const fetchCompanies = async () => {
      if (!router.isReady) return;
      const currentQuery = router.query;

      const response = await axios.get('/companies/search', {
        params: {
          ...currentQuery,
          documentsPerPage: 5,
        },
      });
      setCompanies(response.data.data);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    };
    fetchCompanies();
  }, [router.isReady, router.query]);

  const handleMobileOpen = () => {
    setMobileOpen(true);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  const scrollToTop = () => {
    animateScroll.scrollToTop({
      duration: 700, // Animation duration in milliseconds
      smooth: true, // Enable smooth scrolling
    });
  };

  const handlePageChange = async (newPage) => {
    if (!router.isReady) return;
    const currentQuery = router.query;
    scrollToTop();
    setLoading(true);

    router.push({
      pathname: '/companies',
      query: {
        ...currentQuery,
        page: newPage,
      },
    });
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          py: 5,
        }}
      >
        <Typography variant="h2">Empresas SAD</Typography>

        <Button
          color="inherit"
          variant="contained"
          startIcon={<Iconify icon="carbon:filter" width={18} />}
          onClick={handleMobileOpen}
          sx={{
            display: { md: 'none' },
          }}
        >
          Filtros
        </Button>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }}>
        <CompaniesFilters mobileOpen={mobileOpen} onMobileClose={handleMobileClose} />

        <Box
          sx={{
            flexGrow: 1,
            pl: { md: 8 },
            width: { md: `calc(100% - ${NAV.W_DRAWER}px)` },
          }}
        >
          <CompaniesList
            onPageChange={handlePageChange}
            totalPages={totalPages}
            companies={companies}
            loading={loading}
          />
        </Box>
      </Stack>
    </Container>
  );
}
