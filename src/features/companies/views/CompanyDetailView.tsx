import { useState, useEffect } from 'react';
// axios
import axios from 'src/lib/axios';
// @mui
import { alpha } from '@mui/material/styles';
import {
  Stack,
  Button,
  Divider,
  Container,
  Typography,
  Card,
  Unstable_Grid2 as Grid,
} from '@mui/material';
// _mock
import { _socials, _courses as _companies } from 'src/_mock';
// router
import { useRouter } from 'next/router';
// components
import Iconify from 'src/components/iconify';
import LoadingScreen from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import CompanyProfileCover from '../components/companyDetails/CompanyProfileCover';

//
import {
  CompanyDetailHeader,
  CompanyDetailGallery,
  CompanyDetailSummary,
  CompanyDetailReserveForm,
  SimilarCompaniesList,
  CompanyDetailReviews,
} from '../components';

// ----------------------------------------------------------------------

export default function CompanyDetailView() {
  const [loading, setLoading] = useState(true);
  const [companyInfo, setCompanyInfo] = useState();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const companyId = router.asPath.split('/')[2].split('?')[0];
      const fetchCompany = async () => {
        const response = await axios.get(`/companies/${companyId}`);
        setCompanyInfo(response.data);
        console.log(response.data);
        setLoading(false);
      };

      fetchCompany();
    }
  }, [router.isReady]);

  if (loading) {
    return <LoadingScreen />;
  }

  const handleGoBackClick = () => {
    const currentQuery = router.query;
    router.push({
      pathname: '/companies',
      query: currentQuery,
    });
  };

  return (
    <>
      <Container sx={{ overflow: 'hidden' }}>
        <Stack
          direction="row"
          sx={{ width: '100%', mt: 3, mb: 5 }}
          alignItems="center"
          justifyContent="space-between"
        >
          <CustomBreadcrumbs
            sx={{ mb: 0 }}
            links={[
              { name: 'Home', href: '/' },
              { name: 'Empresas SAD', href: '/' },
              { name: companyInfo.business_profile.name },
            ]}
          />
          <Stack
            direction="row"
            gap="3px"
            alignItems="center"
            sx={{ cursor: 'pointer' }}
            onClick={handleGoBackClick}
          >
            <Iconify icon="material-symbols:arrow-back-rounded" color="#212B36" />
            <Typography>Voltar</Typography>
          </Stack>
        </Stack>
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <CompanyProfileCover
            name={companyInfo.business_profile.name}
            image={companyInfo.business_profile.logo}
            location={companyInfo.addresses[0].city}
          />
        </Card>

        <Grid container columnSpacing={8} rowSpacing={5} direction="row-reverse">
          <Grid xs={12} md={5} lg={4}>
            {/* <CompanyDetailReserveForm company={_mockCompany} /> */}
          </Grid>

          <Grid xs={12} md={7} lg={8}>
            {/* <CompanyDetailHeader company={_mockCompany} /> */}

            <Divider sx={{ borderStyle: 'dashed', my: 5 }} />

            {/* <CompanyDetailSummary company={_mockCompany} /> */}

            <Stack direction="row" flexWrap="wrap" sx={{ mt: 5 }}>
              <Typography variant="subtitle2" sx={{ mt: 0.75, mr: 1.5 }}>
                Share:
              </Typography>

              <Stack direction="row" alignItems="center" flexWrap="wrap">
                {_socials.map((social) => (
                  <Button
                    key={social.value}
                    size="small"
                    variant="outlined"
                    startIcon={<Iconify icon={social.icon} />}
                    sx={{
                      m: 0.5,
                      flexShrink: 0,
                      color: social.color,
                      borderColor: social.color,
                      '&:hover': {
                        borderColor: social.color,
                        bgcolor: alpha(social.color, 0.08),
                      },
                    }}
                  >
                    {social.label}
                  </Button>
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Divider sx={{ my: 10 }} />

      <CompanyDetailReviews />

      {/* <SimilarCompaniesList companies={_companies.slice(-3)} /> */}
    </>
  );
}
