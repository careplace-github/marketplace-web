// @mui
import { Box, Pagination } from '@mui/material';
// types
import { IReviewItemProp } from 'src/types/review';
// hooks
import { useResponsive } from 'src/hooks';
//
import ReviewItem from '../item/ReviewItem';

// ----------------------------------------------------------------------

type Props = {
  reviews: IReviewItemProp[];
};

export default function ReviewList({ reviews }: Props) {
  const isSmUp = useResponsive('up', 'sm');
  return (
    <>
      {reviews.map((review) => {
        const { id, name, rating, helpful, message, postedAt, avatarUrl } = review;

        return (
          <Box key={id}>
            <ReviewItem
              name={name}
              avatarUrl={avatarUrl}
              postedAt={postedAt}
              message={message}
              rating={rating}
              helpful={helpful}
            />
          </Box>
        );
      })}

      <Pagination
        count={10}
        color="primary"
        size={isSmUp ? 'large' : 'small'}
        sx={{
          mt: 5,
          mb: 10,
          '& .MuiPagination-ul': {
            justifyContent: isSmUp ? 'center' : 'space-between',
          },
        }}
      />
    </>
  );
}
