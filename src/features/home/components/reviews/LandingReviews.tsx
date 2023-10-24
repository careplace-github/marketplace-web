import { useRef, useEffect, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Typography, Container, Stack, Box, Unstable_Grid2 as Grid, Avatar } from '@mui/material';
// types
import { ILandingReviewProps } from 'src/types/landingReviews';
// components
import Carousel, { CarouselArrows, CarouselDots } from 'src/components/carousel';
//
import { LandingReviewItem, ReviewThumbnail } from './LandingReviewItem';

// ----------------------------------------------------------------------

export default function LandingReviews() {
  const theme = useTheme();

  const reviews: ILandingReviewProps[] = [
    {
      id: 0,
      name: 'Gabriel Monteiro',
      review:
        'A Careplace é a minha escolha número um para encontrar apoio domiciliário. Esta plataforma facilita a pesquisa e comparação de serviços e empresas de apoio domiciliário, poupando tempo e garantindo que encontro o que preciso para a minha família.',
    },
    {
      id: 1,
      name: 'Carolina Porfírio',
      review:
        'A Careplace é uma ferramenta essencial na busca por apoio domiciliário. A plataforma permite-me encontrar os cuidadores certos para as necessidades da minha família. Esta é uma escolha inteligente para quem procura apoio domiciliário de qualidade.',
    },
    {
      id: 2,
      name: 'Rodrigo Estrela',
      review:
        'A ajuda personalizada da Careplace permitiu-nos entender as vantagens de um lar de idosos em comparação com uma residência sénior. Esta orientação valiosa permite-nos fazer a escolha mais informada e adequada às necessidades da nossa família.',
    },
    {
      id: 3,
      name: 'Gonçalo Gomes',
      review:
        'O apoio personalizado da Careplace permitiu-me perceber as vantagens de um centro de dia em comparação com um lar de idosos. Esta orientação valiosa torna a escolha mais informada e adequada às necessidades da minha avó.',
    },
    {
      id: 4,
      name: 'David Afonso',
      review:
        'Quando se trata de apoio domiciliário, a Careplace é um recurso indispensável. A Careplace é uma plataforma intuitiva que torna a pesquisa de cuidadores e serviços de apoio domiciliário uma tarefa simples. A Careplace permiti-me economizar tempo e encontrar o apoio que preciso sem qualquer stress.',
    },
  ];

  const [selected, setSelected] = useState(0);

  const [carouselContent, setCarouselContent] = useState<Carousel>();

  const [carouselThumbnail, setCarouselThumbnail] = useState<Carousel>();

  const carouselRef1 = useRef<Carousel | null>(null);

  const carouselRef2 = useRef<Carousel | null>(null);

  useEffect(() => {
    setCarouselContent(carouselRef1.current || undefined);
    setCarouselThumbnail(carouselRef2.current || undefined);
  }, [selected]);

  const carouselContentSettings = {
    dots: true,
    arrows: false,
    autoplay: false,
    slidesToShow: 1,
    draggable: false,
    centerMode: true,
    swipeToSlide: true,
    autoplaySpeed: 3000,
    focusOnSelect: true,
    slidesToScroll: 1,
    centerPadding: '0px',
    adaptiveHeight: true,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current: number, next: number) => setSelected(next),
    ...CarouselDots({
      sx: { mt: '10px', mb: '30px' },
    }),
  };

  const handlePrev = () => {
    carouselRef1.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef1?.current?.slickNext();
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
          textAlign: 'center',
          overflow: 'hidden',
          pt: 10,
          pb: 10,
        }}
      >
        <Container sx={{ position: 'relative' }}>
          <Grid container spacing={3} justifyContent="center">
            <Grid xs={12} md={9} sx={{ maxWidth: { xs: '80vw', md: '100vw' } }}>
              <Typography
                sx={{
                  mb: 5,
                  fontSize: { xs: '22px', sm: '32px' },
                  fontWeight: '800',
                  maxWidth: '80vw',
                }}
              >
                O que as Famílias dizem sobre a Careplace
              </Typography>
              <CarouselArrows
                onNext={handleNext}
                onPrev={handlePrev}
                leftButtonProps={{ sx: { display: { xs: 'none', md: 'inline-flex' } } }}
                rightButtonProps={{ sx: { display: { xs: 'none', md: 'inline-flex' } } }}
              >
                <Carousel
                  {...carouselContentSettings}
                  asNavFor={carouselThumbnail}
                  ref={carouselRef1}
                >
                  {reviews.map((review) => (
                    <LandingReviewItem key={review.id} reviewContent={review} />
                  ))}
                </Carousel>
              </CarouselArrows>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
