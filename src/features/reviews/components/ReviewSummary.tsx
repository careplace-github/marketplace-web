import { Paper, Stack, Rating, RadioGroup, Typography } from '@mui/material';
// utils
import { fShortenNumber } from 'src/utils/formatNumber';
//
import ReviewProgress from './ReviewProgress';

// ----------------------------------------------------------------------

type Props = {
  reviewsNumber: number;
  ratingsNumber: number;
};

export default function ReviewSummary({ reviewsNumber, ratingsNumber }: Props) {
  return (
    <Paper variant="outlined" sx={{ p: 4, pr: 3, borderRadius: 2 }}>
      <Stack spacing={3}>
        <Stack spacing={3} direction="row" alignItems="center">
          <Typography variant="h1"> {ratingsNumber}</Typography>

          <Stack spacing={0.5}>
            <Rating value={ratingsNumber} readOnly precision={0.1} />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {fShortenNumber(reviewsNumber)} avaliações
            </Typography>
          </Stack>
        </Stack>

        <RadioGroup>
          <ReviewProgress />
        </RadioGroup>
      </Stack>
    </Paper>
  );
}
