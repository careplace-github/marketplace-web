import { useState, useEffect } from 'react';
// @mui
import { Container, Button, Unstable_Grid2 as Grid, SelectChangeEvent } from '@mui/material';
// axios
import axios from 'src/lib/axios';
// next
import { useRouter } from 'next/router';
//
import { ReviewList, ReviewToolbar, ReviewSummary } from 'src/features/reviews';
import Iconify from 'src/components/iconify/Iconify';
import { IReviewProps } from 'src/types/review';

// ----------------------------------------------------------------------

type Props = {
  rating: any;
  reviews: IReviewProps[];
  numberOfPages: number;
  currentPage: number;
  onChangeReviewsPage: Function;
  sort: { sortBy: string; sortOrder: string };
  companyId: string;
  onChangeSort: (event: SelectChangeEvent) => void;
};

export default function CompanyDetailReviews({
  rating,
  reviews,
  numberOfPages,
  currentPage,
  onChangeReviewsPage,
  sort,
  onChangeSort,
  companyId,
}: Props) {
  const router = useRouter();
  const [buttonType, setButtonType] = useState<'create' | 'edit'>();
  const companyReviewUrl = `${router.asPath.split('?')[0]}/review`;
  const companyUpdateReviewUrl = `${router.asPath.split('?')[0]}/review/update`;

  const fetchReviewEligibilty = async () => {
    const response = await axios.get(`/companies/${companyId}/reviews/eligibility`);
    if (response.data.eligible) {
      setButtonType(response.data.type);
    }
  };

  useEffect(() => {
    fetchReviewEligibilty();
  }, []);

  console.log('reviews in:', reviews);

  const handleChangeSort = (event: SelectChangeEvent) => {
    onChangeSort(event.target.value as string);
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
          {buttonType && (
            <Button
              sx={{ width: '100%', height: '48px', mt: 3 }}
              onClick={() => {
                if (buttonType === 'update') {
                  router.push(companyUpdateReviewUrl);
                  return;
                }
                router.push(companyReviewUrl);
              }}
              color="inherit"
              variant="contained"
              startIcon={<Iconify icon="ph:star" />}
            >
              {buttonType === 'create' ? 'Adicionar avaliação' : 'Atualizar avaliação'}
            </Button>
          )}
        </Grid>

        <Grid xs={12} md={7} lg={8}>
          <ReviewList
            reviews={reviews}
            currentPage={currentPage}
            numberOfPages={numberOfPages}
            onChangeReviewsPage={onChangeReviewsPage}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
