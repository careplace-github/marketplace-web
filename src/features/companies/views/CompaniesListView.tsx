// react
import { useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Container, Stack, Typography, Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// config
import { NAV } from 'src/layouts/config';
// axios
import axios from 'src/lib/axios';
// components
import Iconify from 'src/components/iconify';
import EmptyState from 'src/components/empty-state/EmptyState';
// Routes
import { PATHS } from 'src/routes';
//
import { animateScroll } from 'react-scroll';
//
import { useResponsive } from 'src/hooks';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import { ICompanyProps } from 'src/types/company';
import { IServiceProps } from 'src/types/utils';
import CompaniesList from '../components/list/CompaniesList';
import CompaniesFilters from '../components/filters/CompaniesFilters';
import CompaniesFiltersHead from '../components/filters/components/CompaniesFiltersHead';
// ----------------------------------------------------------------------

type props = {
  searchType: 'homeCare' | 'nursingHome' | 'seniorResidence' | 'dayCenter';
};

export default function CompaniesListView({ searchType }: props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [companies, setCompanies] = useState<ICompanyProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState();
  const [servicesLoading, setServicesLoading] = useState(true);
  const [availableServices, setAvailableServices] = useState<IServiceProps[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState('relative');
  const router = useRouter();
  const isMdUp = useResponsive('up', 'md');
  const theme = useTheme();

  const searchTypes = [
    { text: 'Apoio Domiciliário', value: 'homeCare', url: PATHS.search.homeCare.companies.root },
    { text: 'Lares de Idosos', value: 'nursingHome', url: PATHS.search.nursingHome.companies.root },
    {
      text: 'Residências Sénior',
      value: 'seniorResidence',
      url: PATHS.search.seniorResidence.companies.root,
    },
    { text: 'Centros de Dia', value: 'dayCenter', url: PATHS.search.dayCenter.companies.root },
  ];

  const sortHead = [
    { id: 'relevance', label: 'Relevância', width: '100%', textAlign: 'center' },
    { id: 'rating', label: 'Avaliação', width: '100%', textAlign: 'center' },
    { id: 'pricing', label: 'Preço', width: '100%', textAlign: 'center' },
  ];

  // get available services
  useEffect(() => {
    const fetchServices = async () => {
      setServicesLoading(true);
      const response = await axios.get('/services', { params: { documentsPerPage: 30 } });
      setAvailableServices(response.data.data);
      setServicesLoading(false);
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      if (!router.isReady) return;
      const currentQuery = router.query;

      const response = await axios.get('/health-units/agencies/search', {
        params: {
          ...currentQuery,
          documentsPerPage: 5,
          headers: {
            'x-client-id': process.env.NEXT_PUBLIC_CLIENT_ID,
          },
        },
      });
      setCompanies(response.data.data);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    };
    fetchCompanies();
  }, [router.isReady, router.query]);

  const setDefaultFilterValues = (queryValues) => {
    if (queryValues.sortBy) {
      setSortBy(queryValues.sortBy);
    } else {
      setSortBy('relevance');
    }
    if (queryValues.sortOrder) {
      setSortOrder(queryValues.sortOrder);
    } else {
      setSortOrder('asc');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (router.isReady) {
      if (router.query) {
        console.log('hello', router.query);
        setLoading(true);
        setDefaultFilterValues(router.query);
      }
    }
  }, [router.isReady]);

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
      pathname: PATHS.search.homeCare.companies.root,
      query: {
        ...currentQuery,
        page: newPage,
      },
    });
  };

  const handleSort = (attribute: string) => {
    const sort = sortBy === attribute && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(sort);
    setSortBy(attribute);
    if (!router.isReady) return;
    const currentQuery = router.query;
    scrollToTop();
    setLoading(true);

    router.push({
      pathname: PATHS.search.homeCare.companies.root,
      query: {
        ...currentQuery,
        sortBy: attribute,
        sortOrder: sort,
        page: 1,
      },
    });
  };

  return servicesLoading ? (
    <LoadingScreen />
  ) : (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          py: 5,
        }}
      >
        <Typography variant="h2">
          {searchTypes?.find((type) => type?.value === searchType)?.text}
        </Typography>

        <Button
          color="inherit"
          variant="contained"
          startIcon={<Iconify icon="carbon:filter" width={18} />}
          onClick={handleMobileOpen}
          sx={{
            display: { md: 'none' },
            mt: '2px',
            bgcolor: 'primary.main',
            color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
            '&:hover': {
              bgcolor: 'primary.dark',
              color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
            },
          }}
        >
          Filtros
        </Button>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }}>
        <CompaniesFilters
          searchType={searchType}
          whenLoading={(isLoading) => setLoading(isLoading)}
          services={availableServices}
          mobileOpen={mobileOpen}
          onMobileClose={handleMobileClose}
        />

        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            pl: { md: 8 },
            width: { md: `calc(100% - ${NAV.W_DRAWER}px)` },
          }}
        >
          <CompaniesFiltersHead
            order={sortOrder}
            orderBy={sortBy}
            onSort={handleSort}
            headCells={sortHead}
          />
          {companies.length > 0 && searchType === 'homeCare' ? (
            <CompaniesList
              onPageChange={handlePageChange}
              totalPages={totalPages}
              companies={companies}
              loading={loading}
            />
          ) : (
            <EmptyState
              icon="clarity:building-line"
              title="Sem resultados"
              description="Por favor altere os filtros de pesquisa ou tente mais tarde"
              actionComponent={
                <Button
                  sx={{ height: '48px', mt: '20px' }}
                  onClick={() => router.push(PATHS.getHelp)}
                  variant="contained"
                >
                  Obtenha Ajuda Gratuita
                </Button>
              }
            />
          )}
        </Box>
      </Stack>
    </Container>
  );
}
