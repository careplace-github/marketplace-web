import React from 'react';
// MUI
import { SxProps } from '@mui/system';
import { LoadingButton as MuiLoadingButton } from '@mui/lab';

type props = {
  sx?: SxProps;
  label: string;
  isSubmitting: boolean;
  disabled?: boolean;
  onClick: () => void;
};

function LoadingButton({ sx, label, disabled, isSubmitting, onClick }: props) {
  return (
    <MuiLoadingButton
      onClick={onClick}
      variant="contained"
      disabled={disabled}
      loading={isSubmitting}
      sx={{
        ...sx,
        width: '100%',
        pt: 1.5,
        pb: 1.5,
        mt: 2,
        alignSelf: 'center',
        bgcolor: 'primary.main',
        color: 'common.white',
        '&:hover': {
          bgcolor: 'primary.dark',
          color: 'common.white',
        },
      }}
    >
      {label}
    </MuiLoadingButton>
  );
}

export default LoadingButton;
