import { useState, useEffect } from 'react';
// @mui
import { Container, Stack, Typography, Button, Box } from '@mui/material';
// config
import { NAV } from 'src/layouts/config';
// axios
import axios from 'src/lib/axios';
// components
import Iconify from 'src/components/iconify';
//
import CompaniesList from '../components/list/CompaniesList';
import CompaniesFilters from '../components/filters/CompaniesFilters';
//
import { animateScroll } from 'react-scroll';

// ----------------------------------------------------------------------

export default function CompaniesListView() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [companies, setCompanies] = useState();
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await axios.get('/companies/search', {
        params: { documentsPerPage: 5 },
      });
      setCompanies(response.data.data);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    };
    fetchCompanies();
  }, []);

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
    scrollToTop();
    setLoading(true);
    setCompanies([]);
    const response = await axios.get('/companies/search', {
      params: { documentsPerPage: 5, page: newPage },
    });
    setCompanies(response.data.data);
    setTotalPages(response.data.totalPages);
    setLoading(false);
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
