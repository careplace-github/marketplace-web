// @mui
import { Stack, RadioGroup, StackProps } from '@mui/material';
//
import ReviewProgressItem from './item/ReviewProgressItem';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

interface ReviewProgressProps extends StackProps {
  ratings: any;
}

export default function ReviewProgress({ ratings, ...other }: ReviewProgressProps) {
  const totals = ratings
    .map((rating) => rating.number)
    .reduce((accumulator: number, curr: number) => accumulator + curr);

  console.log('ratings:', ratings);

  return (
    <RadioGroup>
      <Stack spacing={2} {...other}>
        {ratings.map((rating, index) => (
          <ReviewProgressItem key={rating.value} rating={rating} index={index} totals={totals} />
        ))}
      </Stack>
    </RadioGroup>
  );
}
