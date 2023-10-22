// react
import { forwardRef } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { Box, BoxProps, Link } from '@mui/material';
import Image from 'next/image';

// ----------------------------------------------------------------------

interface LogoProps extends BoxProps {
  single?: boolean;
  disabledLink?: boolean;
  logoWidth?: number;
  logoHeight?: number;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, logoWidth, logoHeight, single = false, sx, ...other }, ref) => {
    const singleLogo = (
      <Image
        alt="careplace-logo"
        src="/logo/icon.svg"
        width={logoWidth || 55}
        height={logoHeight || 55}
        style={{ cursor: 'pointer', height: logoHeight || 'auto' }}
      />
    );

    const fullLogo = (
      <Image
        alt="careplace-logo"
        src="/logo/careplace-logo.svg"
        width={logoWidth || 55}
        height={logoHeight || 40}
        style={{ cursor: 'pointer', width: logoWidth || 'auto ' }}
      />
    );

    return disabledLink ? (
      <Box>{single ? singleLogo : fullLogo}</Box>
    ) : (
      <Link aria-label="careplace-logo" component={NextLink} href="/" sx={{ display: 'contents' }}>
        {single ? singleLogo : fullLogo}
      </Link>
    );
  }
);

export default Logo;
