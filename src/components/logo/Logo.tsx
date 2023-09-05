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
  logoWidth?: string | number;
  logoHeight?: string | number;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, logoWidth, logoHeight, single = false, sx, ...other }, ref) => {
    const singleLogo = (
      <Box
        component="img"
        src="/logo/icon.svg"
        sx={{
          width: logoWidth || 55,
          height: logoHeight || undefined,
          cursor: disabledLink ? undefined : 'pointer',
        }}
      />
    );

    const fullLogo = (
      <Box
        component="img"
        src="/logo/careplace-logo.svg"
        sx={{
          width: logoWidth || undefined,
          height: logoHeight || 40,
          cursor: disabledLink ? undefined : 'pointer',
        }}
      />
    );

    return disabledLink ? (
      <Box>{single ? singleLogo : fullLogo}</Box>
    ) : (
      <Link component={NextLink} href="/" sx={{ display: 'contents' }}>
        {single ? singleLogo : fullLogo}
      </Link>
    );
  }
);

export default Logo;
