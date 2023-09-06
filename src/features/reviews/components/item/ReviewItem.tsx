import { useState } from 'react';
// @mui
import { Box, Rating, Button, Stack, Avatar, Divider, Typography, TextField } from '@mui/material';
// utils
import { fDate } from 'src/utils/formatTime';
// types
import { IReviewProps } from 'src/types/review';
// ----------------------------------------------------------------------

const AVATAR_SIZE = 48;

const WIDTH = `calc(100% - ${AVATAR_SIZE + 20}px)`;

type Props = {
  review: IReviewProps;
};

export default function ReviewItem({ review }: Props) {
  const { user, rating, comment, updatedAt } = review;
  return (
    <>
      <Stack
        direction="row"
        sx={{
          py: 3,
          alignItems: 'flex-start',
        }}
      >
        <Avatar
          alt={user?.name}
          src={user?.profile_picture}
          sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE, mr: 2.5 }}
        />

        <Stack sx={{ width: 1 }}>
          <Stack
            spacing={1}
            alignItems={{ sm: 'center' }}
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent={{ sm: 'space-between' }}
          >
            <Typography variant="subtitle2">{user?.name}</Typography>
            <Rating size="small" value={rating} precision={0.5} readOnly />
          </Stack>

          {updatedAt && (
            <Typography
              variant="body2"
              sx={{
                mb: 1,
                mt: { xs: 1, sm: 0.5 },
                color: 'text.disabled',
              }}
            >
              {fDate(updatedAt)}
            </Typography>
          )}

          <Typography variant="body2">{comment}</Typography>
        </Stack>
      </Stack>

      <Divider sx={{ ml: 'auto', width: WIDTH }} />
    </>
  );
}

// ----------------------------------------------------------------------
