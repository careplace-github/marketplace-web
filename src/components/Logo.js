import PropTypes from 'prop-types';
import { memo } from 'react';
// next
import NextLink from 'next/link';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  isSimple: PropTypes.bool,
  onDark: PropTypes.bool,
  sx: PropTypes.object,
};

function Logo({ isSimple = false, sx }) {


  return (
    <NextLink href="/marketing" passHref>
      <Box
        sx={{
          width: isSimple ? 64 : 75,
          lineHeight: 0,
          cursor: 'pointer',
          display: 'inline-flex',
          ...sx,
        }}
      >
        {isSimple ? (
          <Box
            component="img"
            src="/logo/logo.svg" 
            sx={{ width: 150, height: 60, cursor: 'pointer', ...sx }}
          />
        ) : (
          <Box
            component="img"
            src="/logo/logo.svg" 
            sx={{ width: 150, height: 60, cursor: 'pointer', ...sx }}
          />
        )}
      </Box>
    </NextLink>
  );
}

export default memo(Logo);
