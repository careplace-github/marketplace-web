import React, { useRef, useState } from 'react';
// mui
import { Box, Typography, Button, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { PATHS } from 'src/routes';
// hooks
import { useResponsive } from 'src/hooks';
// components
import Carousel, { CarouselArrows, CarouselDots } from 'src/components/carousel';
import MedicalEquipmentItem from './MedicalEquipmentItem';

function LandingMedicalEquipments() {
  const router = useRouter();
  const isMdUp = useResponsive('up', 'md');
  const equipments = [
    {
      name: 'Cama Articulada',
      price: { daily: '3.48', monthly: '99.99' },
      description:
        'As camas articuladas permitem dar mais conforto a pessoas acamadas e facilitar as tarefas diárias aos seus cuidadores.',
      image: '/assets/images/landing/medical-equipments/cama articulada.322c3c208abe60e980b5.png',
    },
    {
      name: 'Cadeira de Rodas',
      price: { daily: '0.99', monthly: '24.99' },
      description:
        'A opção pelo aluguer de cadeiras de rodas reduz o seu investimento em situações pontuais em que só vai precisar do equipamento por um determinado período de tempo',
      image: '/assets/images/landing/medical-equipments/cadeira de rodas.7b63c1d1b5a548eb469a.png',
    },
    {
      name: 'Grua de Transferência',
      price: { daily: '1.49', monthly: '39.99' },
      description:
        'O aluguer de gruas de transferência vem responder à necessidade de acamados para uma mobilidade mais simples e ágil no dia a dia.',
      image:
        '/assets/images/landing/medical-equipments/grua de transferencia.bccec8bab45781076d76.png',
    },
  ];

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

  return (
    <Box
      sx={{
        width: '100%',
        py: 8,
        px: { xs: '30px', lg: 0 },
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '50px',
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '22px', sm: '32px' },
          fontWeight: '800',
          width: '100%',
          textAlign: 'center',
        }}
      >
        Equipamentos Médicos
      </Typography>
      {isMdUp ? (
        <Grid container xs={12} spacing={4}>
          {equipments.map((item) => {
            return (
              <Grid item xs={12} md={4}>
                <MedicalEquipmentItem item={item} />
              </Grid>
            );
          })}
        </Grid>
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
            {equipments.map((item, index) => {
              return (
                <Box sx={{ padding: '30px' }}>
                  <MedicalEquipmentItem item={item} />
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
          router.push(PATHS.getHelp);
        }}
      >
        Requisitar Equipamentos Médicos
      </Button>
    </Box>
  );
}

export default LandingMedicalEquipments;
