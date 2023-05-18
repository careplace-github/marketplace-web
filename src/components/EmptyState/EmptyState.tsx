import React from 'react';
// components
import { Typography, Stack } from '@mui/material';
import Iconify from '../iconify/Iconify';

type IEmptyStateProps = {
  icon: string;
  title: string;
  description: string;
  containerWidth?: string;
  containerHeight?: string;
};

function EmptyState({
  icon = 'ic:baseline-cloud-off',
  title,
  description,
  containerWidth = '100%',
  containerHeight = '100%',
}: IEmptyStateProps) {
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap="5px"
      sx={{ width: containerWidth, height: containerHeight, minHeight: '300px' }}
    >
      <Iconify icon={icon} width={60} height={60} />
      <Typography variant="h6" sx={{ mt: '20px' }}>
        {title}
      </Typography>
      <Typography variant="body" sx={{ maxWidth: '80%' }}>
        {description}
      </Typography>
    </Stack>
  );
}

export default EmptyState;
