import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import axios from 'src/lib/axios';
import { CompanyListItem } from 'src/features/companies/components';
import { useRouter } from 'next/router';
import { PATHS } from 'src/routes';
import Iconify from 'src/components/iconify/Iconify';
import { useResponsive } from 'src/hooks';
import Carousel, { CarouselArrows, CarouselDots } from 'src/components/carousel';
import { ICompanyProps } from 'src/types/company';

function LandingFindHealthUnits() {
  const [companies, setCompanies] = useState<ICompanyProps[]>([]);
  const [companiesLoading, setCompaniesLoading] = useState<boolean>(true);
  const isMdUp = useResponsive('up', 'md');
  const router = useRouter();

  const carouselRef1 = useRef<any | null>(null);

  const [selected, setSelected] = useState(0);

  const handlePrev = () => {
    carouselRef1.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef1?.current?.slickNext();
  };

  const carouselContentSettings = {
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaTime: '3000',
    slidesToShow: 1,
    draggable: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    slidesToScroll: 1,
    centerPadding: '0px',
    adaptiveHeight: true,
    rtl: false,
    beforeChange: (current: number, next: number) => setSelected(next),
    ...CarouselDots({ sx: { mt: '30px' } }),
  };

  useEffect(() => {
    setCompaniesLoading(true);
    function getRandomNumber(max) {
      return Math.floor(Math.random() * max + 1);
    }

    const fetchCompanies = async () => {
      const response = await axios.get('/health-units/agencies/search', {
        headers: {
          'x-client-id': process.env.NEXT_PUBLIC_CLIENT_ID,
        },
      });
      const allCompanies = response.data.data;
      const randomIndex: number[] = [];
      if (allCompanies?.length < 3) {
        setCompanies([]);
        setCompaniesLoading(false);
        return;
      }
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < allCompanies.length - 1; i++) {
        let randomNumber = getRandomNumber(allCompanies.length - 1);
        let maxTries = 0;
        while (randomIndex.includes(randomNumber) && maxTries < 100) {
          randomNumber = getRandomNumber(allCompanies.length - 1);
          // eslint-disable-next-line no-plusplus
          maxTries++;
        }
        randomIndex.push(randomNumber);
      }

      setCompanies([
        allCompanies[randomIndex[0]],
        allCompanies[randomIndex[1]],
        allCompanies[randomIndex[2]],
      ]);
      setCompaniesLoading(false);
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    console.log('selected companies', companies);
  }, [companies]);

  return (
    <Box
      sx={{
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9f9',
      }}
    >
      <Box
        sx={{
          width: '100%',
          px: { xs: '30px', lg: 0 },
          pt: 8,
          pb: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
          maxWidth: '1200px',
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '22px', sm: '32px' },
            fontWeight: '700',
            width: '100%',
            textAlign: 'center',
          }}
        >
          Conheça as Empresas de Apoio Domiciliário
        </Typography>
        {companiesLoading ? (
          <Box
            sx={{
              height: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {isMdUp ? (
              <Box
                sx={{
                  gap: 4,
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(1, 1fr)',
                    md: 'repeat(3, 1fr)',
                  },
                }}
              >
                {companies.map((company) => (
                  <CompanyListItem lightVersion key={company._id} company={company} vertical />
                ))}
              </Box>
            ) : (
              <CarouselArrows
                onNext={handleNext}
                onPrev={handlePrev}
                leftButtonProps={{ sx: { display: 'none' } }}
                rightButtonProps={{ sx: { display: 'none' } }}
                sx={{
                  maxWidth: 'calc(100vw)',
                  pt: '20px',
                  color: 'white',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <Carousel {...carouselContentSettings} ref={carouselRef1}>
                  {companies.map((company, index) => {
                    return (
                      <Box sx={{ p: '30px' }}>
                        <CompanyListItem
                          lightVersion
                          key={company._id}
                          company={company}
                          vertical
                        />
                      </Box>
                    );
                  })}
                </Carousel>
              </CarouselArrows>
            )}
            <Button
              variant="contained"
              size="large"
              sx={{ zIndex: '1' }}
              onClick={() => {
                router.push(PATHS.search.homeCare.companies.root);
              }}
            >
              Ver Mais
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

export default LandingFindHealthUnits;
