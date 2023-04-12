// @mui
import { Container, Unstable_Grid2 as Grid } from '@mui/material';
// _mock
import { _caseStudies as _services } from '../../_mock';
// components
import Image from '../../components/image';
import Markdown from '../../components/markdown';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
//
import { SimilarServicesList, ServiceDetailSummary, ServiceDetailGallery } from '../../sections/services';
 

// ----------------------------------------------------------------------

const _mockService = _services[0];

export default function ServiceDetailView() {
  return (
    <>
      <Container
        sx={{
          overflow: 'hidden',
          pt: 5,
          pb: { xs: 10, md: 15 },
        }}
      >
        <Image alt="hero" src={_mockService.heroImg} ratio="16/9" sx={{ borderRadius: 2 }} />

        <CustomBreadcrumbs
          sx={{ my: 5 }}
          links={[
            { name: 'Home', href: '/' },
            { name: 'Case Studies', href: '/' },
            { name: _mockService.title },
          ]}
        />

        <Grid container spacing={{ xs: 5, md: 8 }} direction={{ md: 'row-reverse' }}>
          <Grid xs={12} md={4}>
            <ServiceDetailSummary service={_services[0]} />
          </Grid>

          <Grid xs={12} md={8}>
            <Markdown content={_mockService.content} />
            <ServiceDetailGallery images={_mockService.galleryImgs} />
          </Grid>
        </Grid>
      </Container>

      <SimilarServicesList services={_services.slice(0, 3)} />
    </>
  );
}
