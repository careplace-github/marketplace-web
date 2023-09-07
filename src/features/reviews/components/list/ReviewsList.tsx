// react
import { useEffect, useState } from 'react';
// @mui
import { Box, Pagination } from '@mui/material';
// types
import { IReviewProps } from 'src/types/review';
// hooks
import { useResponsive } from 'src/hooks';
// components
import EmptyState from 'src/components/empty-state/EmptyState';
import ReviewItem from '../item/ReviewItem';

// ----------------------------------------------------------------------

type Props = {
  reviews: IReviewProps[];
  numberOfPages: number;
  currentPage: number;
  onChangeReviewsPage: Function;
  userReview?: any;
};

export default function ReviewList({
  reviews,
  numberOfPages,
  currentPage,
  onChangeReviewsPage,
  userReview,
}: Props) {
  const isSmUp = useResponsive('up', 'sm');
  const [orderedReviews, setOrderedReviews] = useState<any>(reviews);
  useEffect(() => {
    if (userReview) {
      const auxReviews = reviews.filter((review) => review._id !== userReview._id);
      console.log('aux', auxReviews);
      auxReviews.unshift(userReview);
      console.log('aux ordered', auxReviews);
      setOrderedReviews(auxReviews);
    }
  }, [reviews, userReview]);

  return orderedReviews?.length > 0 ? (
    <>
      {console.log('user review', userReview)}
      {orderedReviews.map((review) => {
        return (
          <Box key={review?._id}>
            <ReviewItem review={review} isUserReview={review._id === userReview?._id} />
          </Box>
        );
      })}

      <Pagination
        count={numberOfPages || 1}
        color="primary"
        size={isSmUp ? 'large' : 'small'}
        page={currentPage}
        onChange={(e, newValue) => {
          if (currentPage !== newValue) onChangeReviewsPage(newValue);
        }}
        sx={{
          mt: 5,
          mb: 10,
          '& .MuiPagination-ul': {
            justifyContent: isSmUp ? 'center' : 'space-between',
          },
        }}
      />
    </>
  ) : (
    <EmptyState
      title="A empresa ainda não contém comentários"
      description="Todos os comentários feitos a esta empresa serão apresentados aqui"
      icon="material-symbols:comments-disabled"
    />
  );
}
