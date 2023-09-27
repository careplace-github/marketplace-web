// hooks
import { useState, useEffect } from 'react';
import { useResponsive } from 'src/hooks';

// mock
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
// router
import { useRouter } from 'next/router';
// type props
import { IServiceProps } from 'src/types/utils';
import { ICompanyProps } from 'src/types/company';
import { IReviewProps, IReviewsPaginationProps } from 'src/types/review';
// lib
import fetch from 'src/lib/fetch';
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
  recurrency: number | string | undefined;
};

const _socials = [
  {
    value: 'facebook',
    label: 'Facebook',
    icon: 'carbon:logo-facebook',
    color: '#1877F2',
    share(url: string) {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        '_blank'
      );
    },
  },

  {
    value: 'linkedin',
    label: 'Linkedin',
    icon: 'carbon:logo-linkedin',
    color: '#007EBB',
    share(url: string) {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        '_blank'
      );
    },
  },
  {
    value: 'twitter',
    label: 'Twitter',
    icon: 'carbon:logo-twitter',
    color: '#00AAEC',
    share(url: string) {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, '_blank');
    },
  },
  {
    value: 'whatsapp',
    label: 'Whatsapp',
    icon: 'ri:whatsapp-fill',
    color: '#25D366',
    share(url: string) {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`, '_blank');
    },
  },
  {
    value: 'email',
    label: 'Email',
    icon: 'carbon:email',
    color: '#212B36',
    share(url: string) {
      window.open(
        `mailto:?subject=${'Careplace: Simplificando o Apoio Domiciliário'}&body=${encodeURIComponent(
          `Encontrei esta empresa de apoio domiciliário na Careplace! 
          ${url}`
        )}`,

        '_blank'
      );
    },
  },
];

export default function CompanyDetailView() {
  const [loading, setLoading] = useState<boolean>(true);
  const [companiesLoading, setCompaniesLoading] = useState<boolean>(true);
  const [servicesLoading, setServicesLoading] = useState<boolean>(true);
  const [filterQueries, setFilterQueries] = useState<IFilterQueryProps>({
    recurrency: undefined,
    weekdays: undefined,
    services: undefined,
  });
  const [availableServices, setAvailableServices] = useState<IServiceProps[]>([]);
  const [companyServices, setCompanyServices] = useState<string[]>([]);
  const [companySpecialServices, setCompanySpecialServices] = useState<IServiceProps[]>([]);
  const [companyAvailableServices, setCompanyAvailableServices] = useState<IServiceProps[]>([]);
  const [companyReviews, setCompanyReviews] = useState<IReviewProps[]>([]);
  const [reviewsPaginationInfo, setReviewsPaginationInfo] = useState<IReviewsPaginationProps>();
  const [companyInfo, setCompanyInfo] = useState<ICompanyProps>();
  const [similarCompanies, setSimilarCompanies] = useState<ICompanyProps[]>([]);
  const [reviewSort, setReviewSort] = useState<{ sortBy: string; sortOrder: string }>({
    sortBy: 'relevance',
    sortOrder: 'desc',
  });
  const reviewsPerPage = 5;
  const router = useRouter();
  const isSmUp = useResponsive('up', 'sm');

  useEffect(() => {
    const fetchServices = async () => {
      setServicesLoading(true);
      const response = await fetch(
        `/api/services?${new URLSearchParams({
          documentsPerPage: '30',
        })}`,
        {
          method: 'GET',
        }
      );

      console.log('response', response);

      setAvailableServices(response.data);
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
      const response = await fetch('/api/health-units/agencies/search', {
        method: 'GET',
      });
      const allCompanies = response.data;
      const randomIndex: number[] = [];
      if (allCompanies?.length < 3) {
        setSimilarCompanies([]);
        setCompaniesLoading(false);
        return;
      }
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

  const fetchReviews = async (current, sortSelected, companyId) => {
    const responseCompanyReviews = await fetch(
      `/api/reviews/health-units/${companyId}?
      ${new URLSearchParams({
        documentsPerPage: reviewsPerPage.toString(),
        page: current,
        sortBy: sortSelected.sortBy,
        sortOrder: sortSelected.sortOrder,
      })}`,
      {
        method: 'GET',
      }
    );

    const reviewsInfo = responseCompanyReviews.data;

    console.log('reviewsInfo', reviewsInfo);

    setCompanyReviews(reviewsInfo);
    setReviewsPaginationInfo({
      currentPage: reviewsInfo.page,
      pages: reviewsInfo.totalPages,
    });
  };

  useEffect(() => {
    if (router.isReady) {
      setLoading(true);
      const companyId = router.asPath.split('/')[2].split('?')[0];
      const fetchInfo = async () => {
        const responseCompanyInfo = await fetch(`/api/health-units/${companyId}`, {
          method: 'GET',
        });

        console.log('responseCompanyInfo', responseCompanyInfo);

        setCompanyInfo(responseCompanyInfo);
        await fetchReviews(1, reviewSort, companyId);
        setLoading(false);
      };

      fetchInfo();
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
      setCompanyAvailableServices(allCompanyAvailableServices);
    }
    setServicesLoading(false);
  }, [availableServices, companyInfo]);

  if (loading || servicesLoading || companiesLoading) {
    return <LoadingScreen />;
  }

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
            location={companyInfo.business_profile.address.city}
          />
        </Card>

        <Grid container columnSpacing={8} rowSpacing={5} direction="row-reverse">
          <Grid xs={12} md={5} lg={4}>
            <CompanyDetailReserveForm
              onReserveFiltersChange={(weekdaysQuery, servicesQuery) =>
                setFilterQueries({
                  recurrency: router?.query?.recurrency as string | undefined,
                  weekdays: weekdaysQuery,
                  services: servicesQuery,
                })
              }
              services={companyAvailableServices}
              price={companyInfo?.pricing.minimum_hourly_rate}
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
                    onClick={() => social.share(window.location.href)}
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

      {reviewsPaginationInfo && (
        <CompanyDetailReviews
          companyId={companyInfo._id}
          sort={reviewSort}
          onChangeSort={(value) => {
            fetchReviews(reviewsPaginationInfo.currentPage, JSON.parse(value), companyInfo._id);
            setReviewSort(JSON.parse(value));
          }}
          rating={companyInfo.rating}
          reviews={companyReviews}
          numberOfPages={reviewsPaginationInfo.pages}
          currentPage={reviewsPaginationInfo.currentPage}
          onChangeReviewsPage={(newPage) => {
            fetchReviews(newPage, reviewSort, companyInfo._id);
          }}
        />
      )}
      <Divider sx={{ mt: 10 }} />
      {similarCompanies?.length >= 3 && <SimilarCompaniesList companies={similarCompanies} />}
    </>
  ) : (
    <LoadingScreen />
  );
}
