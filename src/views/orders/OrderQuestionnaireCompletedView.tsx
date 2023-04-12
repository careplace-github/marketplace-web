// next
import NextLink from 'next/link';
// @mui
import { Container, Typography, Stack, Button } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
// _mock
import { _tours } from 'src/_mock';
//
import { OrderQuestionnaireCompletedInfo, OrderQuestionnaireCompletedSummary } from '../../sections/orders';

// ----------------------------------------------------------------------

const _mockTour = _tours[1];

export default function TravelOrderCompletedView() {
  const isMdUp = useResponsive('up', 'md');

  return (
    <Container
      sx={{
        pt: 5,
        pb: { xs: 8, md: 15 },
        gap: 10,
        display: 'grid',
        alignItems: 'flex-start',
        gridTemplateColumns: { md: 'repeat(2, 1fr)' },
      }}
    >
      {isMdUp && (
        <Image alt="cover" src={_mockTour.coverImg} ratio="3/4" sx={{ borderRadius: 2 }} />
      )}

      <Stack spacing={5}>
        <Typography variant="h2">Completed 🎉</Typography>

        <OrderQuestionnaireCompletedInfo tour={_mockTour} />

        <OrderQuestionnaireCompletedSummary />

        <Stack spacing={2.5} direction={{ xs: 'column', md: 'row' }} justifyContent="center">
          <Button
            component={NextLink}
            href="/"
            variant="outlined"
            size="large"
            color="inherit"
            startIcon={<Iconify icon="carbon:chevron-left" />}
          >
            Back Home
          </Button>

          <Button
            variant="contained"
            size="large"
            color="inherit"
            startIcon={<Iconify icon="carbon:package" />}
          >
            Download Invoice
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
