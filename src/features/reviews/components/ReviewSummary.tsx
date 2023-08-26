// react
import { useEffect, useState } from 'react';
import { Paper, Stack, Rating, RadioGroup, Typography } from '@mui/material';
// utils
import { fShortenNumber } from 'src/utils/formatNumber';
//
import ReviewProgress from './ReviewProgress';

// ----------------------------------------------------------------------

type Props = {
  reviewsNumber: number;
  ratingsNumber: number;
  countStars: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
};

type CountStarsToSendItemsProps = {
  value: number;
  number: number;
};

export default function ReviewSummary({ reviewsNumber, ratingsNumber, countStars }: Props) {
  const [countStarsToSend, setCountStarsToSend] = useState<CountStarsToSendItemsProps[]>([]);

  useEffect(() => {
    if (countStars) {
      const aux: CountStarsToSendItemsProps[] = [];
      Object.keys(countStars).forEach((key) => {
        const newObj: CountStarsToSendItemsProps = {
          value: parseInt(key, 10),
          number: countStars[key],
        };
        aux.unshift(newObj);
      });
      setCountStarsToSend(aux);
    }
  }, [countStars]);

  return (
    <Paper variant="outlined" sx={{ p: 4, pr: 3, borderRadius: 2 }}>
      <Stack spacing={3}>
        <Stack spacing={3} direction="row" alignItems="center">
          <Typography variant="h1">{ratingsNumber.toFixed(1)}</Typography>

          <Stack spacing={0.5}>
            <Rating value={ratingsNumber} readOnly precision={0.1} />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {reviewsNumber ? fShortenNumber(reviewsNumber) : 'sem '} avaliações
            </Typography>
          </Stack>
        </Stack>

        {countStarsToSend.length > 0 && <ReviewProgress ratings={countStarsToSend} />}
      </Stack>
    </Paper>
  );
}
