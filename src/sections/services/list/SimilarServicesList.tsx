import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import { Container, Stack, Button, Typography, Box } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Iconify from '../../../components/iconify';
// types
import { ICaseStudyProps } from '../../../types/case-study'
//
import { ServiceItem } from '../item';
 

// ----------------------------------------------------------------------

type Props = {
  caseStudies: ICaseStudyProps[];
};

export default function MarketingCaseStudyListSimilar({ caseStudies }: Props) {
  const isMdUp = useResponsive('up', 'md');

  const viewAllBtn = (
    <Button
      component={NextLink}
      href="/"
      color="inherit"
      endIcon={<Iconify icon="carbon:chevron-right" />}
    >
      View All
    </Button>
  );

  return (
    <Container
      sx={{
        py: { xs: 10, md: 15 },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={{ xs: 'center', md: 'space-between' }}
        sx={{
          mb: { xs: 8, md: 10 },
        }}
      >
        <Typography variant="h3">You Might Like</Typography>

        {isMdUp && viewAllBtn}
      </Stack>

      <Box
        sx={{
          gap: 4,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {caseStudies.map((project) => (
          <ServiceItem key={project.id} project={project} />
        ))}
      </Box>

      {!isMdUp && (
        <Stack alignItems="center" sx={{ mt: 8 }}>
          {viewAllBtn}
        </Stack>
      )}
    </Container>
  );
}
