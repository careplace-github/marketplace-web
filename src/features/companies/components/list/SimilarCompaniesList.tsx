// next
import NextLink from 'next/link';
// @mui
import { Container, Stack, Button, Typography, Box } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import Iconify from 'src/components/iconify';
// types
import { ICompanyProps } from 'src/types/company';

import CompanyListItem from '../item/CompanyListItem';

// ----------------------------------------------------------------------

type Props = {
  companies: ICompanyProps[];
};

export default function SimilarCompaniesList({ companies }: Props) {
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
    <Box
      sx={{
        bgcolor: 'background.neutral',
        py: { xs: 10, md: 15 },
      }}
    >
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{
            mb: { xs: 8, md: 10 },
          }}
        >
          <Typography variant="h3">Similar companies</Typography>

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
          {companies.map((company) => (
            <CompanyListItem key={company._id} company={company} vertical />
          ))}
        </Box>

        {!isMdUp && (
          <Stack alignItems="center" sx={{ mt: 8 }}>
            {viewAllBtn}
          </Stack>
        )}
      </Container>
    </Box>
  );
}
