import { useState } from 'react';
// @mui
import { Container, Unstable_Grid2 as Grid, SelectChangeEvent } from '@mui/material';
// _mock
import { _reviews } from 'src/_mock';
//
import { ReviewList, ReviewToolbar, ReviewSummary} from 'src/features/reviews';

// ----------------------------------------------------------------------

export default function CompanyDetailReviews() {
  const [sort, setSort] = useState('latest');

  const handleChangeSort = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  return (
    <>

      <Container sx={{ overflow: 'hidden', pt: 10 }}>
        <Grid xs={12} md={7} lg={8}>
          <ReviewToolbar sort={sort} onChangeSort={handleChangeSort} />
        </Grid>

        <Grid container spacing={8} direction="row-reverse">
          <Grid xs={12} md={5} lg={4}>
            <ReviewSummary
              ratingsNumber={4.1}
              reviewsNumber={123456}
            />
          </Grid>

          <Grid xs={12} md={7} lg={8}>
            <ReviewList reviews={_reviews} />
          </Grid>
        </Grid>
      </Container>




    </>
  );
}
