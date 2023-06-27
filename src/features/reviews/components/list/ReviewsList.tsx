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
};

export default function ReviewList({
  reviews,
  numberOfPages,
  currentPage,
  onChangeReviewsPage,
}: Props) {
  const isSmUp = useResponsive('up', 'sm');
  return reviews?.length > 0 ? (
    <>
      {reviews.map((review) => {
        return (
          <Box key={review._id}>
            <ReviewItem review={review} />
          </Box>
        );
      })}

      <Pagination
        count={numberOfPages || 1}
        color="primary"
        size={isSmUp ? 'large' : 'small'}
        page={currentPage}
        onChange={(e, newValue) => onChangeReviewsPage(newValue)}
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
