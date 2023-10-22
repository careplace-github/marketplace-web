import React, { useEffect, useState, useRef } from 'react';
// mui
import { Box, Typography, Button, Stack } from '@mui/material';
// routes
import { useRouter } from 'next/router';
import { PATHS } from 'src/routes';
// components
import Carousel, { CarouselArrows, CarouselDots } from 'src/components/carousel';
import { ServiceItem } from 'src/features/services/components';
// hooks
import { useResponsive } from 'src/hooks';
// axios
import axios from 'src/lib/axios';
import { IServiceProps } from 'src/types/utils';

function LandingServices() {
  const router = useRouter();
  const [servicesLoading, setServicesLoading] = useState<boolean>(true);
  const [availableServices, setAvailableServices] = useState<IServiceProps[]>();
  const isSmUp = useResponsive('up', 'sm');

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
    setServicesLoading(true);
    const fetchServices = async () => {
      const response = await axios.get('/services', { params: { documentsPerPage: 60, page: 1 } });
      const normalServices: IServiceProps[] = [];

      const servicesArr = response.data.data;
      setAvailableServices([servicesArr[0], servicesArr[1], servicesArr[2], servicesArr[3]]);
      setServicesLoading(false);
    };

    fetchServices();
  }, []);
  return (
    <Box
      sx={{
        width: '100%',
        pb: 8,
        pt: 8,
        px: { xs: '30px', lg: 0 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
        Serviços de Apoio Domiciliário
      </Typography>
      {isSmUp ? (
        <Box
          sx={{
            pt: 5,
            gap: 4,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          }}
        >
          {availableServices?.map((service) => (
            <ServiceItem landingVersion key={service._id} service={service} />
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
            justifyContent: 'center',
          }}
        >
          <Carousel {...carouselContentSettings} ref={carouselRef1}>
            {availableServices?.map((service, index) => {
              return (
                <Box sx={{ padding: '30px' }}>
                  <ServiceItem landingVersion key={service._id} service={service} />
                </Box>
              );
            })}
          </Carousel>
        </CarouselArrows>
      )}
      <Button
        variant="contained"
        size="large"
        sx={{ zIndex: '1', mt: { xs: 5, md: 10 } }}
        onClick={() => {
          router.push(PATHS.services.root);
        }}
      >
        Ver todos
      </Button>
    </Box>
  );
}

export default LandingServices;
