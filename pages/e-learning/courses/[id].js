import { useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Stack, Container, Typography, Divider } from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../../src/config';
// hooks
import { useRequest, useResponsive } from '../../../src/hooks';
// _data
import _mock, { _reviews } from '../../../_data/mock';
// layouts
import Layout from '../../../src/layouts';
// components
import {
  Page,
  ErrorScreen,
  LoadingScreen,
  DialogAnimate,
  SocialsButton,
} from '../../../src/components';
// sections
import { NewsletterElearning } from '../../../src/sections/newsletter';
import { Advertisement01 } from '../../../src/sections/advertisement';
import {
  ReviewForm,
  ReviewSummary,
  ReviewElearningCourseList,
  ReviewElearningToolbar,
} from '../../../src/sections/reviews';
import {
  ElearningCourseHero,
  ElearningCourseInfo,
  ElearningCourseSimilar,
  ElearningCourseDetails,
  ElearningCourseTeachersInfo,
} from '../../../src/sections/@e-learning';

// next
import dynamic from 'next/dynamic';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));
  const ContactMap = dynamic(() => import('../../../src/components/map/ContactMap'));
// ----------------------------------------------------------------------

export default function ElearningCoursePage() {
  const router = useRouter();

  const isDesktop = useResponsive('up', 'md');

  const [sort, setSort] = useState('latest');
  const [openForm, setOpenForm] = useState(false);
  const [filter, setFilter] = useState(null);

  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };

  const handleChangeFilters = (event) => {
    setFilter(event.target.value);
  };

  const { id } = router.query;

  const { data: courses = [] } = useRequest('/api/e-learning/courses');

  const {
    data: course,
    error: courseError,
    isLoading: courseLoading,
  } = useRequest(id ? `/api/e-learning/courses/${id}` : '');

  if (courseError) {
    return <ErrorScreen />;
  }

  if (courseLoading) {
    return <LoadingScreen />;
  }

  const  locationMap= [
    {
      address: 'Portugal',
      phoneNumber: '1234567',
      email: 'email',
      latlng: [33, 65],
    },
  ];

  return (
    <Page title={`${course.slug}`}>
      <RootStyle>
        <ElearningCourseHero course={course} />

        <Container
          sx={{
            pt: { xs: 10, md: 10 },
            pb: { xs: 15, md: 10 },
          }}
        >
          <Grid container spacing={8}>
            {!isDesktop && (
              <Grid item xs={12}>
                <ElearningCourseInfo course={course} />
              </Grid>
            )}

            <Grid item xs={12} md={7} lg={8}>
              <ElearningCourseDetails course={course} />
            </Grid>

            <Grid item xs={12} md={5} lg={4}>
              <Stack spacing={5}>
                {/*{isDesktop && <ElearningCourseInfo course={course} />}*/}
                <section>
                  <Typography variant="h4" sx={{ mb: 3 }}>
                    Localização
                  </Typography>
                  <ContactMap offices={locationMap} sx={{ borderRadius: 2 }} />
                </section>
              </Stack>
            </Grid> 
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

ElearningCoursePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};


/*
 <Divider sx={{ my: 5 }} />
              <ElearningCourseTeachersInfo teachers={course.teachers} />

        <NewsletterElearning />
        <Advertisement01
    advertisement={{
      title: 'Advertisement',
      description: 'Duis leo. Donec orci lectus, aliquam ut, faucibus non',
      imageUrl: _mock.image.course(7),
      path: '#',
    }}
  />


  <Divider
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
        />

        <Container
          sx={{
            pt: { md: 10 },
          }}
        >
          <Grid item xs={12} md={7} lg={8}>
            <ReviewElearningToolbar sort={sort} onChangeSort={handleChangeSort} />
          </Grid>

          <Grid container spacing={8} direction="row-reverse">
            <Grid item xs={12} md={5} lg={4}>
              <ReviewSummary
                reviews={course.reviews}
                ratings={course.ratings}
                filter={filter}
                onChangeFilters={handleChangeFilters}
                onOpenForm={() => setOpenForm(true)}
              />
              <DialogAnimate open={openForm} onClose={() => setOpenForm(false)}>
                <ReviewForm onClose={() => setOpenForm(false)} />
              </DialogAnimate>
            </Grid>

            <Grid item xs={12} md={7} lg={8}>
              <ReviewElearningCourseList reviews={_reviews} />
            </Grid>
          </Grid>
        </Container>
        <ElearningCourseSimilar courses={courses.slice(-3)} />

*/