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
import { ICourseProps } from '../../../types/course';
 
import { CompanyListItem } from '../item';

// ----------------------------------------------------------------------

type Props = {
  courses: ICourseProps[];
};

export default function ElearningCourseListSimilar({ courses }: Props) {
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
          <Typography variant="h3">Similar Courses</Typography>

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
          {courses.map((course) => (
            <CompanyListItem key={course.id} course={course} vertical />
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
