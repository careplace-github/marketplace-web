import { m } from 'framer-motion';
import { forwardRef } from 'react';
// @mui
import { Box, IconButton, IconButtonProps } from '@mui/material';

// ----------------------------------------------------------------------


type AnimateWrapProp = {
  children: React.ReactNode;
  size: 'small' | 'medium' | 'large';
  disableAnimation: boolean;
};


const IconButtonAnimate = forwardRef<HTMLButtonElement, IconButtonProps, AnimateWrapProp>(
  ({ children, disableAnimation = false, size = 'medium', ...other }, ref) => (
    <AnimateWrap disableAnimation={disableAnimation} size={size}>
      <IconButton size={size} ref={ref} {...other}>
        {children}
      </IconButton>
    </AnimateWrap>
  )
);

export default IconButtonAnimate;

// ----------------------------------------------------------------------

const varSmall = {
  hover: { scale: 1.1 },
  tap: { scale: 0.95 },
};

const varMedium = {
  hover: { scale: 1.09 },
  tap: { scale: 0.97 },
};

const varLarge = {
  hover: { scale: 1.08 },
  tap: { scale: 0.99 },
};

const varNoAnimation = {
  hover: { scale: 0 },
  tap: { scale: 0 }
}

function AnimateWrap({ size, children, disableAnimation }: AnimateWrapProp) {
  const isSmall = size === 'small';
  const isLarge = size === 'large';
  const noAnimation = size === 'noAnimation';

  return (
    <Box
      component={m.div}
      whileTap="tap"
      whileHover="hover"
      variants={disableAnimation ? null : (isSmall && varSmall) || (isLarge && varLarge) || varMedium || (noAnimation && varNoAnimation)}
      sx={{
        display: 'inline-flex',
      }}
    >
      {children}
    </Box>
  );
}
