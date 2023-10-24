import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Button, Stack, Grid } from '@mui/material';
import { CompanyListItem } from 'src/features/companies/components';
import { useResponsive } from 'src/hooks';
import { useRouter } from 'next/router';
import { PATHS } from 'src/routes';
import Iconify from 'src/components/iconify/Iconify';
import Carousel, { CarouselArrows, CarouselDots } from 'src/components/carousel';
import HowItWorksItem from './HowItWorksItem';
import HowItWorksStepper from './HowItWorksStepper';

function LandingHowItWorks() {
  const router = useRouter();
  const isMdUp = useResponsive('up', 'md');

  const carouselRef1 = useRef<any | null>(null);
  const [selected, setSelected] = useState(0);
  const [carouselContent, setCarouselContent] = useState<any>();

  const steps = [
    {
      title: 'Pesquisar, Comparar & Orçamento',
      description:
        'Navegue pela nossa plataforma, compare diferentes opções de apoio domiciliário, lares de idosos, residências sénior, centros de dia e equipamentos médicos, e escolha o que melhor se adaptar às suas necessidades. Solicite um orçamento gratuitamente e obtenha detalhes sobre os serviços oferecidos, incluindo a disponibilidade, custos e especificidades dos serviços proporcionados. Se precisar de mais informações, estamos aqui para ajudar.',
      icon: 'radix-icons:magnifying-glass',
    },
    {
      title: 'Visita de Avaliação',
      description:
        'Após o pedido de orçamento, as empresas ou instituições correspondentes irão agendar uma visita de avaliação. Esta visita pode incluir a apresentação das instalações (para lares de idosos, centros de dia e residências sénior) ou a apresentação do cuidador (para apoio domiciliário), bem como a avaliação das necessidades específicas e a discussão de quaisquer detalhes adicionais.',
      icon: 'solar:home-outline',
    },
    {
      title: 'Confirmação & Início dos Cuidados',
      description:
        'Reveja as informações fornecidas, confirme a sua escolha e prossiga para o pagamento através da nossa plataforma de forma segura e sem quaisquer custos adicionais. Uma vez confirmado o pagamento, o processo de cuidados será iniciado. A nossa plataforma facilita a comunicação e o ajuste de detalhes, assegurando que os cuidados fornecidos estejam alinhados com as suas expectativas e necessidades.',
      icon: 'lucide:heart-handshake',
    },
  ];

  const handlePrev = () => {
    carouselRef1.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef1?.current?.slickNext();
  };

  useEffect(() => {
    setCarouselContent(carouselRef1.current || undefined);
  }, [selected]);

  const carouselContentSettings = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    draggable: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    slidesToScroll: 1,
    centerPadding: '0px',
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
    rtl: false,
    beforeChange: (current: number, next: number) => setSelected(next),
    ...CarouselDots({
      sx: { mt: '10px', mb: '30px' },
    }),
  };

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
          px: { xs: '30px', lg: 0 },
          width: '100%',
          pt: 8,
          pb: 8,
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
            mb: '50px',
          }}
        >
          Como Funciona
        </Typography>
        <HowItWorksStepper />
        {isMdUp ? (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              width: '100%',
              justifyContent: 'space-between',
              gap: '10px',
              py: '30px',
            }}
          >
            {steps.map((step, index) => {
              return (
                <HowItWorksItem
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                />
              );
            })}
          </Box>
        ) : (
          <CarouselArrows
            onNext={handleNext}
            onPrev={handlePrev}
            sx={{ minHeight: '350px', width: '100%', maxWidth: '85vw', mt: '30px' }}
            leftButtonProps={{ sx: { display: 'none' } }}
            rightButtonProps={{ sx: { display: 'none' } }}
          >
            <Carousel {...carouselContentSettings} ref={carouselRef1}>
              {steps.map((step, index) => {
                return (
                  <HowItWorksItem
                    title={step.title}
                    description={step.description}
                    icon={step.icon}
                  />
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
          Encontrar Apoio Domiciliário
          <Iconify icon="solar:health-broken" sx={{ ml: '10px' }} />
        </Button>
      </Box>
    </Box>
  );
}

export default LandingHowItWorks;
