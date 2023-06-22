import { useState } from 'react';
// @mui
import { Container, Button, Unstable_Grid2 as Grid, SelectChangeEvent } from '@mui/material';
// _mock
import { _reviews } from 'src/_mock';
// next
import { useRouter } from 'next/router';
//
import { ReviewList, ReviewToolbar, ReviewSummary } from 'src/features/reviews';
import Iconify from 'src/components/iconify/Iconify';

// ----------------------------------------------------------------------

type Props = {
  rating: any;
};

export default function CompanyDetailReviews({ rating }: Props) {
  const [sort, setSort] = useState('latest');
  const router = useRouter();
  const companyReviewUrl = `${router.asPath.split('?')[0]}/review`;

  const handleChangeSort = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  return (
    <Container sx={{ overflow: 'hidden' }}>
      <Grid xs={12} md={7} lg={8}>
        <ReviewToolbar sort={sort} onChangeSort={handleChangeSort} />
      </Grid>

      <Grid container spacing={8} direction="row-reverse">
        <Grid xs={12} md={5} lg={4}>
          <ReviewSummary
            ratingsNumber={rating.average}
            reviewsNumber={rating.count}
            countStars={rating.count_stars}
          />
          <Button
            sx={{ width: '100%', height: '48px', mt: 3 }}
            onClick={() => router.push(companyReviewUrl)}
            color="inherit"
            variant="contained"
            startIcon={<Iconify icon="ph:star" />}
          >
            Adicionar avaliação
          </Button>
        </Grid>

        <Grid xs={12} md={7} lg={8}>
          <ReviewList reviews={[]} />
        </Grid>
      </Grid>
    </Container>
  );
}
