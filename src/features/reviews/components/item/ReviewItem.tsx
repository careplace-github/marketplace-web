import { useState } from 'react';
// @mui
import { Box, Rating, Button, Stack, Avatar, Divider, Typography, TextField } from '@mui/material';
// utils
import { fDate } from 'src/utils/formatTime';
// types
import { IReviewItemProp } from 'src/types/review';

// ----------------------------------------------------------------------

const AVATAR_SIZE = 48;

const WIDTH = `calc(100% - ${AVATAR_SIZE + 20}px)`;

type Props = Partial<IReviewItemProp> & {
  tagUser?: string;
  hasReply?: boolean;
};

export default function ReviewItem({
  name,
  rating,
  message,
  tagUser,
  postedAt,
  hasReply,
  avatarUrl,
  helpful = 0,
}: Props) {
  const [openReply, setOpenReply] = useState(false);

  const [isHelpful, setIsHelpful] = useState(false);

  const handleOpenReply = () => {
    setOpenReply(!openReply);
  };

  const handleToggleHelpful = () => {
    setIsHelpful(!isHelpful);
  };

  return (
    <>
      <Stack
        direction="row"
        sx={{
          py: 3,
          alignItems: 'flex-start',
          ...(hasReply && {
            ml: 'auto',
            width: WIDTH,
          }),
        }}
      >
        <Avatar
          alt={name}
          src={avatarUrl}
          sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE, mr: 2.5 }}
        />

        <Stack sx={{ width: 1 }}>
          <Stack
            spacing={1}
            alignItems={{ sm: 'center' }}
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent={{ sm: 'space-between' }}
          >
            <Typography variant="subtitle2">{name}</Typography>

            {!hasReply && <Rating size="small" value={rating} precision={0.5} readOnly />}
          </Stack>

          {postedAt && (
            <Typography
              variant="body2"
              sx={{
                mb: 1,
                mt: { xs: 1, sm: 0.5 },
                color: 'text.disabled',
              }}
            >
              {fDate(postedAt)}
            </Typography>
          )}

          <Typography variant="body2">
            {tagUser && <strong>{`@${tagUser} `}</strong>}
            {message}
          </Typography>
        </Stack>
      </Stack>

      <Divider sx={{ ml: 'auto', width: WIDTH }} />
    </>
  );
}

// ----------------------------------------------------------------------

const getHelpful = (helpful: number, isHelpful: boolean) => {
  if (helpful > 0) {
    return isHelpful ? `(${helpful + 1})` : `(${helpful})`;
  }

  return isHelpful ? `(${helpful + 1})` : '';
};
