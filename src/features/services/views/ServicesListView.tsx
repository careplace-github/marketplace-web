// @mui
import { Container, Typography, Stack } from '@mui/material';
// _mock
import { _caseStudies as _services } from 'src/_mock';
//
import { ServicesList } from '../components';
 

// ----------------------------------------------------------------------

export default function ServicesListView() {
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

        <ServicesList services={_services} />
      </Container>
    </>
  );
}
