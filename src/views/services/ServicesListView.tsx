// @mui
import { Container, Typography, Stack } from '@mui/material';
// _mock
import { _caseStudies, _blogMarketingPosts, _testimonials } from '../../_mock';
//
import { ServicesList } from '../../sections/services';
 

// ----------------------------------------------------------------------

export default function MarketingCaseStudiesView() {
  return (
    <>
      <Container>
        <Stack
          spacing={3}
          sx={{
            py: 5,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h2">Our Case Studies</Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Nullam tincidunt adipiscing enim.
            <br /> Mauris sollicitudin fermentum libero.
          </Typography>
        </Stack>

        <ServicesList caseStudies={_caseStudies} />
      </Container>
    </>
  );
}
