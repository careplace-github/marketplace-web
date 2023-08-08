// react
import { forwardRef } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { Box, BoxProps, Link } from '@mui/material';

// ----------------------------------------------------------------------

interface LogoProps extends BoxProps {
  single?: boolean;
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, single = false, sx, ...other }, ref) => {
    const singleLogo = (
      <Box component="img" src="/logo/icon.svg" sx={{ width: 55, cursor: 'pointer' }} />
    );

    const fullLogo = (
      <Box component="img" src="/logo/logo.svg" sx={{ height: 40, cursor: 'pointer' }} />
    );

    return (
      <Link component={NextLink} href="/" sx={{ display: 'contents' }}>
        {single ? singleLogo : fullLogo}
      </Link>
    );
  }
);

export default Logo;
