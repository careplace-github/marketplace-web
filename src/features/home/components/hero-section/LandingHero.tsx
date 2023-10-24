import { useEffect, useState, useRef } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Stack, Container, Typography, Button, Fab, Grid, Box } from '@mui/material';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { Searchbar } from 'src/components/searchbar';
import Carousel, { CarouselArrows } from 'src/components/carousel';
// router
import { useRouter } from 'next/router';
import { PATHS } from 'src/routes';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, 0.9),
    imgUrl: '/assets/background/overlay_1.jpg',
  }),
  overflow: 'visible',
}));

// ----------------------------------------------------------------------

export default function LandingHero() {
  const isMdUp = useResponsive('up', 'md');
  const router = useRouter();
  const [currentStringIndex, setCurrentStringIndex] = useState<number>(0);
  const [selectedServiceType, setSelectedServiceType] = useState<number>(0);
  const menuOptions = [
    'Apoio Domiciliário',
    'Lares de Idosos',
    'Residências Sénior',
    'Centros de Dia',
    'Equipamentos Médicos',
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentStringIndex((prevStringIndex) => {
        const nextStringIndex = (prevStringIndex + 1) % menuOptions.length;
        return nextStringIndex;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [menuOptions]);

  const carouselRef1 = useRef<any | null>(null);
  const [selected, setSelected] = useState(0);
  const [carouselContent, setCarouselContent] = useState<any>();
  const handlePrev = () => {
    carouselRef1.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef1?.current?.slickNext();
  };

  useEffect(() => {
    console.log('selected', selected);
    setSelectedServiceType(selected);
  }, [selected]);

  const carouselContentSettings = {
    dots: false,
    arrows: false,
    autoplay: false,
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
  };

  const getSearchBarLabel = () => {
    switch (selectedServiceType) {
      case 0:
        return 'receber o serviço de Apoio Domiciliário';
      case 1:
        return 'procurar Lares de Idosos';
      case 2:
        return 'procurar Residências Sénior';
      case 3:
        return 'procurar Centros de Dia';
      case 4:
        return 'receber Equipamentos Médicos';
      default:
        return 'receber o serviço';
    }
  };

  const getUrlToRedirect = () => {
    switch (selectedServiceType) {
      case 0:
        return PATHS.search.homeCare.companies.root;
      case 1:
        return PATHS.search.nursingHome.companies.root;
      case 2:
        return PATHS.search.seniorResidence.companies.root;
      case 3:
        return PATHS.search.dayCenter.companies.root;
      case 4:
        return PATHS.getHelp;
      default:
        return 'receber o serviço';
    }
  };

  return (
    <StyledRoot>
      <Box
        sx={{
          width: '100vw',
          height: '700px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Container
          sx={{
            pt: { xs: 0, sm: 12 },
            pb: 0,
            display: { md: 'flex' },
            alignItems: { md: 'center' },
            height: { md: `auto` },
            maxWidth: '1200px',
            zIndex: 10,
          }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              sx={{
                pb: 8,
                textAlign: { xs: 'center', md: 'left' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
              }}
            >
              <Typography
                sx={{
                  my: 3,
                  fontSize: { xs: '32px', sm: '48px' },
                  fontWeight: '800',
                  color: 'white',
                  width: { xs: '100%', md: '550px' },
                }}
              >
                A plataforma que conecta as famílias portuguesas a
                <Typography
                  sx={{
                    fontSize: { xs: '32px', sm: '48px' },
                    minHeight: { xs: '100px', sm: undefined },
                    fontWeight: '800',
                    color: 'primary.main',
                  }}
                >
                  {menuOptions[currentStringIndex]}
                </Typography>
              </Typography>
              <Box>
                {isMdUp && (
                  <Box
                    sx={{
                      display: 'flex',
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      // px: '20px',
                      borderRadius: '8px 8px 0px 0px',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '800',
                      // mt: '20px',
                    }}
                  >
                    {menuOptions.map((option, index) => {
                      return (
                        <Box
                          onClick={() => {
                            setSelectedServiceType(index);
                          }}
                          sx={{
                            cursor: 'pointer',
                            borderRadius: '8px 8px 0px 0px',
                            py: '20px',
                            px: '30px',
                            color: 'white',
                            textAlign: 'center',

                            backgroundColor:
                              selectedServiceType === index
                                ? 'rgba(46, 158, 221, 0.8)'
                                : 'transparent',
                          }}
                        >
                          {option}
                        </Box>
                      );
                    })}
                  </Box>
                )}

                {!isMdUp && (
                  <Box
                    sx={{
                      display: 'flex',
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      // px: '20px',
                      borderRadius: '8px 8px 0px 0px',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      fontWeight: '800',

                      // mt: '20px',
                    }}
                  >
                    <CarouselArrows
                      onNext={handleNext}
                      onPrev={handlePrev}
                      leftButtonProps={{ sx: { display: 'inline-flex' } }}
                      rightButtonProps={{ sx: { display: 'inline-flex' } }}
                      sx={{
                        maxWidth: { xs: 'calc(100vw - 32px)', sm: 'calc(100vw - 48px)' },
                        height: '50px',
                        borderRadius: '8px 8px 0px 0px',
                        px: '30px',
                        py: '20px',
                        color: 'white',
                        justifyContent: 'center',
                        position: 'relative',
                        textAlign: 'center',
                        backgroundColor: 'rgba(46, 158, 221, 0.8)',
                      }}
                    >
                      <Carousel {...carouselContentSettings} ref={carouselRef1}>
                        {menuOptions.map((option, index) => {
                          return <Box>{option}</Box>;
                        })}
                      </Carousel>
                    </CarouselArrows>
                  </Box>
                )}

                <Box
                  sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    width: '100%',
                    borderRadius: '0px 0px 8px 8px',
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      gap: '30px',
                      pt: '30px',
                      pb: '30px',
                      px: '30px',
                      backgroundColor: 'rgba(46, 158, 221, 0.8)',
                      borderRadius: '0px 0px 8px 8px',
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          mb: '10px',
                          color: 'white',
                          fontWeight: '600',
                          width: '100%',
                          textAlign: 'left',
                        }}
                      >
                        Introduza a morada onde pretende {getSearchBarLabel()}:
                      </Typography>
                      <Searchbar fullWidth urlToRedirect={getUrlToRedirect()} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            position: 'absolute',
            opacity: '0.4',
            left: 0,
            top: 0,
            zIndex: 4,
          }}
        />
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: 'primary.main',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 3,
            backgroundImage: 'url("/assets/illustrations/get_help_banner.jpeg")',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        />
      </Box>
    </StyledRoot>
  );
}
