// next
import { useRouter } from 'next/router';
// @mui
import { Box } from '@mui/material';
// config
import { HEADER } from 'src/layouts';
// hooks
import { useResponsive } from 'src/hooks';
//
import Header from './header/Header';
import Footer from './footer/Footer';

// ----------------------------------------------------------------------

const pathsOnDark = ['/career/landing', '/travel/landing'];

const spacingLayout = [...pathsOnDark, '/', '/e-learning/landing', '/marketing/landing'];

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  hideSearchbar?: boolean;
};

export default function MainLayout({ children, hideSearchbar }: Props) {
  const { pathname } = useRouter();
  const isMdUp = useResponsive('up', 'md');

  const actionPage = (arr: string[]) => arr.some((path) => pathname === path);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Header headerOnDark={actionPage(pathsOnDark)} hideSearchbar={hideSearchbar} />

      <Box
        component="main"
        sx={{
          mt: isMdUp ? 0 : '80px',
          flexGrow: 1,
        }}
      >
        {!actionPage(spacingLayout) && <Spacing />}
        {children}
      </Box>

      <Footer />
    </Box>
  );
}

// ----------------------------------------------------------------------

function Spacing() {
  return (
    <Box
      sx={{
        height: { xs: HEADER.H_MOBILE, md: HEADER.H_MAIN_DESKTOP },
      }}
    />
  );
}
