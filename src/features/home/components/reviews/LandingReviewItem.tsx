// @mui
import { Typography, Stack, Avatar } from '@mui/material';
// types
import { ILandingReviewProps } from 'src/types/landingReviews';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type LandingReviewItemProps = {
  reviewContent: ILandingReviewProps;
};

export function LandingReviewItem({ reviewContent }: LandingReviewItemProps) {
  const { review } = reviewContent;

  return (
    <Stack alignItems="center" sx={{ minHeight: { xs: '500px', sm: '350px' } }}>
      <Iconify
        icon="carbon:quotes"
        sx={{ width: 48, height: 48, opacity: 0.48, color: 'primary.main' }}
      />

      <Typography
        sx={{
          mt: 2,
          lineHeight: 1.75,
          fontSize: { xs: 20, md: 24 },
          fontFamily: (theme) => theme.typography.h1.fontFamily,
        }}
      >
        {review}
      </Typography>

      <Typography sx={{ mt: '50px' }} variant="h6">
        {reviewContent.name}
      </Typography>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type ReviewThumbnailProps = {
  review: ILandingReviewProps;
  isSelected: boolean;
};

export function ReviewThumbnail({ review, isSelected }: ReviewThumbnailProps) {
  return (
    <Stack
      sx={{
        width: 96,
        height: 96,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Avatar
        sx={{
          width: 48,
          height: 48,
          opacity: 0.48,
          ...(isSelected && {
            opacity: 1,
            transform: { xs: 'scale(1.5)', md: 'scale(2)' },
          }),
        }}
      />
    </Stack>
  );
}
