import { useState, useEffect } from 'react';
// @mui
import { Container, Button, Unstable_Grid2 as Grid, SelectChangeEvent } from '@mui/material';

// next
import { useRouter } from 'next/router';
// lib
import fetch from 'src/lib/fetch';
//
import { ReviewList, ReviewToolbar, ReviewSummary } from 'src/features/reviews';
import Iconify from 'src/components/iconify/Iconify';
import { IReviewProps } from 'src/types/review';
import { useSession } from 'next-auth/react';

// ----------------------------------------------------------------------

type Props = {
  rating: any;
  reviews: IReviewProps[];
  numberOfPages: number;
  currentPage: number;
  onChangeReviewsPage: Function;
  sort: { sortBy: string; sortOrder: string };
  companyId: string;
  onChangeSort: (event: string) => void;
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
  const [buttonType, setButtonType] = useState<'create' | 'update'>();
  const companyReviewUrl = `${router.asPath.split('?')[0]}/review`;
  const companyUpdateReviewUrl = `${router.asPath.split('?')[0]}/review/update`;
  const [userReview, setUserReview] = useState<any>();

  const { data: session, status } = useSession();

  const isAuthenticated = status === 'authenticated';

  const fetchReviewEligibilty = async () => {
    const response = await fetch(`/api/reviews/customer/health-unit/${companyId}/eligibility`, {
      method: 'GET',
    });

    if (response?.eligible) {
      setButtonType(response?.type || undefined);
      const userReviewResponse = await fetch(`/api/reviews/customer/health-unit/${companyId}`);

      if (userReviewResponse?.data) {
        setUserReview(userReviewResponse?.data);
      }
    }
  };

  if (isAuthenticated) {
    useEffect(() => {
      fetchReviewEligibilty();
    }, []);
  }

  const handleChangeSort = (newValue: string) => {
    onChangeSort(newValue);
  };

  return (
    <Container sx={{ overflow: 'hidden' }}>
      <Grid xs={12} md={7} lg={8}>
        <ReviewToolbar sort={sort} onChangeSort={(value: string) => handleChangeSort(value)} />
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
            userReview={userReview}
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
