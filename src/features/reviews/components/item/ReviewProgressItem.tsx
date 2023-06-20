// @mui
import { alpha } from '@mui/material/styles';
import { Box, Stack, Radio, Typography, LinearProgress, FormControlLabel } from '@mui/material';
// utils
import { fShortenNumber } from 'src/utils/formatNumber';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  rating: {
    value: number;
    number: number;
  };
  index: number;
  totals: number;
};

export default function ReviewProgressItem({ rating, totals, index }: Props) {
  const { value, number } = rating;

  return (
    <FormControlLabel
      value={value}
      control={<Radio sx={{ display: 'none' }} />}
      label={
        <Stack alignItems="center" direction="row">
          <Stack direction="row" alignItems="center">
            <Box sx={{ width: 12, typography: 'subtitle1', textAlign: 'center', mr: 0.5 }}>
              {value}
            </Box>
            <Iconify width={16} icon="carbon:star" />
          </Stack>

          <LinearProgress
            color="inherit"
            variant="determinate"
            value={number ? (number / totals) * 100 : 0}
            sx={{
              mx: 2,
              width: 1,
              height: 6,
              '&:before': { opacity: 1, bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12) },
            }}
          />

          <Typography
            variant="body2"
            sx={{
              minWidth: 40,
              color: 'text.disabled',
            }}
          >
            {fShortenNumber(number) || 0}
          </Typography>
        </Stack>
      }
      sx={{
        mx: 0,
        // '&:hover': { opacity: 0.48 },
        cursor: 'default',
        '& .MuiFormControlLabel-label': {
          width: 1,
        },
      }}
    />
  );
}
