// @mui
import { Container, Unstable_Grid2 as Grid } from '@mui/material';
// _mock
import { _caseStudies, _testimonials } from '../../_mock';
// components
import Image from '../../components/image';
import Markdown from '../../components/markdown';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
//
import { SimilarServicesList, ServiceDetailSummary, ServiceDetailGallery } from '../../sections/services';
 

// ----------------------------------------------------------------------

const _mockCaseStudy = _caseStudies[0];

export default function MarketingCaseStudyView() {
  return (
    <>
      <Container
        sx={{
          overflow: 'hidden',
          pt: 5,
          pb: { xs: 10, md: 15 },
        }}
      >
        <Image alt="hero" src={_mockCaseStudy.heroImg} ratio="16/9" sx={{ borderRadius: 2 }} />

        <CustomBreadcrumbs
          sx={{ my: 5 }}
          links={[
            { name: 'Home', href: '/' },
            { name: 'Case Studies', href: '/' },
            { name: _mockCaseStudy.title },
          ]}
        />

        <Grid container spacing={{ xs: 5, md: 8 }} direction={{ md: 'row-reverse' }}>
          <Grid xs={12} md={4}>
            <ServiceDetailSummary caseStudy={_caseStudies[0]} />
          </Grid>

          <Grid xs={12} md={8}>
            <Markdown content={_mockCaseStudy.content} />
            <ServiceDetailGallery images={_mockCaseStudy.galleryImgs} />
          </Grid>
        </Grid>
      </Container>

      <SimilarServicesList caseStudies={_caseStudies.slice(0, 3)} />
    </>
  );
}
