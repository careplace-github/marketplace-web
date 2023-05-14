// react
import { forwardRef } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { Box, BoxProps, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// auth
import { useAuthContext } from 'src/contexts';
// paths
import { PATHS } from 'src/routes/paths';

// ----------------------------------------------------------------------

interface LogoProps extends BoxProps {
  single?: boolean;
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, single = false, sx, ...other }, ref) => {
    const theme = useTheme();

    const PRIMARY_LIGHT = theme.palette.primary.light;

    const PRIMARY_MAIN = theme.palette.primary.main;

    const PRIMARY_DARK = theme.palette.primary.dark;

    const singleLogo = (
      <Box
        component="img"
        src="/logo/icon.svg"
        sx={{ width: 55, cursor: 'pointer' }}
      />
    );

    const fullLogo = (
      <Box
        component="img"
        src="/logo/logo.svg"
        sx={{ height: 40, cursor: 'pointer' }}
      />
    );

    return (
      <Link component={NextLink} href="/" sx={{ display: 'contents' }}>
        {single ? singleLogo : fullLogo}
      </Link>
    );
  }
);

export default Logo;
