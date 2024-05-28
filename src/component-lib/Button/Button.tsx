import React from 'react';
import { SxProps } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/system';

const StyledButton = styled(LoadingButton)(({ theme }) => {
  return {
    px: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
  };
});

type ButtonProps = {
  size?: 'small' | 'large' | 'medium';
  variant?: 'text' | 'contained' | 'outlined';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  sx?: SxProps;
  text?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  type?: 'button' | 'reset' | 'submit';
};

function Button({
  size = 'medium',
  variant = 'contained',
  onClick,
  sx,
  text,
  disabled,
  loading,
  icon,
  iconPosition = 'start',
  type,
}: ButtonProps) {
  return (
    <StyledButton
      loading={loading}
      type={type}
      size={size}
      variant={variant}
      onClick={onClick}
      sx={sx}
      disabled={disabled}
    >
      {iconPosition === 'start' && icon}
      {text}
      {iconPosition === 'end' && icon}
    </StyledButton>
  );
}

export default Button;
