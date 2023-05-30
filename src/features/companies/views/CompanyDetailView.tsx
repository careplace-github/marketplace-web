// hooks
import { useState, useEffect } from 'react';
import { useResponsive } from 'src/hooks';
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
// data
import { otherServices } from 'src/data';
// type props
import { IServiceProps } from 'src/types/utils';
import { ICompanyProps } from 'src/types/company';
// components
import Iconify from 'src/components/iconify';
import LoadingScreen from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import CompanyProfileCover from '../components/companyDetails/CompanyProfileCover';

//
import {
  CompanyDetailSummary,
  CompanyDetailReserveForm,
  SimilarCompaniesList,
  CompanyDetailReviews,
} from '../components';

// ----------------------------------------------------------------------

type IFilterQueryProps = {
  weekdays: string | undefined;
  services: string | undefined;
};
export default function CompanyDetailView() {
  const [loading, setLoading] = useState<boolean>(true);
  const [companiesLoading, setCompaniesLoading] = useState<boolean>(true);
  const [servicesLoading, setServicesLoading] = useState<boolean>(true);
  const [filterQueries, setFilterQueries] = useState<IFilterQueryProps>({
    weekdays: undefined,
    services: undefined,
  });
  const [availableServices, setAvailableServices] = useState<IServiceProps[]>([]);
  const [companyServices, setCompanyServices] = useState<string[]>([]);
  const [companySpecialServices, setCompanySpecialServices] = useState<IServiceProps[]>([]);
  const [companyAvailableServices, setCompanyAvailableServices] = useState<IServiceProps[]>([]);
  const [companyInfo, setCompanyInfo] = useState<ICompanyProps>();
  const [similarCompanies, setSimilarCompanies] = useState<ICompanyProps[]>([]);
  const router = useRouter();
  const isSmUp = useResponsive('up', 'sm');

  useEffect(() => {
    const fetchServices = async () => {
      setServicesLoading(true);
      const response = await axios.get('/services');
      setAvailableServices(response.data.data);
      console.log('all services:', response.data);
      setServicesLoading(false);
    };

    fetchServices();
  }, []);

  useEffect(() => {
    setCompaniesLoading(true);
    function getRandomNumber(max) {
      return Math.floor(Math.random() * max + 1);
    }

    const fetchCompanies = async () => {
      const companyId = router.asPath.split('/')[2].split('?')[0];
      const response = await axios.get('/companies/search');
      const allCompanies = response.data.data;
      const randomIndex: number[] = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < allCompanies.length - 1; i++) {
        let randomNumber = getRandomNumber(allCompanies.length - 1);
        let maxTries = 0;
        while (
          (companyId === allCompanies[randomNumber]._id || randomIndex.includes(randomNumber)) &&
          maxTries < 100
        ) {
          randomNumber = getRandomNumber(allCompanies.length - 1);
          // eslint-disable-next-line no-plusplus
          maxTries++;
        }
        randomIndex.push(randomNumber);
      }

      setSimilarCompanies([
        allCompanies[randomIndex[0]],
        allCompanies[randomIndex[1]],
        allCompanies[randomIndex[2]],
      ]);
      setCompaniesLoading(false);
    };
    fetchCompanies();
  }, [router.asPath, router.isReady]);

  useEffect(() => {
    if (router.isReady) {
      setLoading(true);
      const companyId = router.asPath.split('/')[2].split('?')[0];
      const fetchCompany = async () => {
        const response = await axios.get(`/companies/${companyId}`);
        setCompanyInfo(response.data);
        setLoading(false);
      };

      fetchCompany();
    }
  }, [router.asPath, router.isReady]);

  useEffect(() => {
    setServicesLoading(true);
    if (availableServices.length > 0 && companyInfo && companyInfo.services) {
      const aux: string[] = [];
      const auxSpecials: IServiceProps[] = [];
      availableServices.forEach((availableService) => {
        companyInfo.services.forEach((item) => {
          if (availableService._id === item && availableService.type === 'normal') {
            aux.push(availableService.name);
          } else if (availableService._id === item && availableService.type === 'special') {
            console.log('IS SPECIAL');
            auxSpecials.push(availableService);
          }
        });
      });
      setCompanyServices(aux);
      setCompanySpecialServices(auxSpecials);
      // get all services that the company can do to list them in the dropdown
      const allCompanyAvailableServices: IServiceProps[] = [];
      availableServices.forEach((item) => {
        companyInfo.services.forEach((service) => {
          if (item._id === service) {
            allCompanyAvailableServices.push(item);
          }
        });
      });
      console.log(allCompanyAvailableServices);
      setCompanyAvailableServices(allCompanyAvailableServices);
    }
    setServicesLoading(false);
  }, [availableServices, companyInfo]);

  if (loading || servicesLoading || companiesLoading) {
    return <LoadingScreen />;
  }

  console.log('services: ', companyServices);

  const handleGoBackClick = () => {
    if (router.isReady) {
      const currentQuery = router.query;
      delete currentQuery.id;
      router.push({
        pathname: '/companies',
        query: {
          ...currentQuery,
          weekDay: filterQueries.weekdays,
          services: filterQueries.services,
        },
      });
    }
  };

  return companyInfo ? (
    <>
      <Container sx={{ overflow: 'hidden' }}>
        <Stack
          direction="row"
          sx={{ width: '100%', mt: 3, mb: isSmUp ? 5 : 3 }}
          alignItems="center"
          justifyContent="space-between"
        >
          {isSmUp && (
            <CustomBreadcrumbs
              sx={{ mb: 0 }}
              links={[
                { name: 'Home', href: '/' },
                { name: 'Empresas SAD', href: '/' },
                { name: companyInfo.business_profile.name },
              ]}
            />
          )}
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
            mb: isSmUp ? 8 : 2.8,
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
            <CompanyDetailReserveForm
              onReserveFiltersChange={(weekdaysQuery, servicesQuery) =>
                setFilterQueries({ weekdays: weekdaysQuery, services: servicesQuery })
              }
              services={companyAvailableServices}
              price={companyInfo.pricing.minimum_hourly_rate}
              companyId={companyInfo._id}
            />
          </Grid>

          <Grid xs={12} md={7} lg={8}>
            <CompanyDetailSummary
              extraServices={companySpecialServices}
              description={companyInfo.business_profile.about}
              name={companyInfo.business_profile.name}
              services={companyServices}
            />

            <Stack direction="row" flexWrap="wrap" sx={{ mt: 12 }}>
              <Typography variant="subtitle2" sx={{ mt: 0.75, mr: 1.5 }}>
                Partilhar:
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

      <SimilarCompaniesList companies={similarCompanies} />
    </>
  ) : (
    <LoadingScreen />
  );
}
