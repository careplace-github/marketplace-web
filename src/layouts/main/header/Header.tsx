// react
import { useState, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link, Stack, Button, AppBar, Toolbar, Container, Typography } from '@mui/material';
// hooks
import useOffSetTop from 'src/hooks/useOffSetTop';
import useResponsive from 'src/hooks/useResponsive';
// utils
import { bgBlur } from 'src/utils/cssStyles';
// auth
import { useAuthContext } from 'src/contexts';
// config
import { HEADER } from 'src/layouts/config';
// paths
import { PATHS } from 'src/routes';
// google maps api
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
// components
import Logo from 'src/components/logo';
import { Searchbar } from 'src/components/searchbar';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import AccountPopover from './AccountPopover';
//
import { NavMobile, NavDesktop, navConfig, navConfigMobile } from '../nav';
import HeaderShadow from '../../components/HeaderShadow';

// ----------------------------------------------------------------------

type Props = {
  headerOnDark: boolean;
};

const googleLibraries: ('places' | 'drawing' | 'geometry' | 'localContext' | 'visualization')[] = [
  'places',
];

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

export default function Header({ headerOnDark }: Props) {
  const { user, isAuthenticated, isInitialized } = useAuthContext();

  const theme = useTheme();

  const isMdUp = useResponsive('up', 'md');
  const isSmUp = useResponsive('up', 'sm');

  const isOffset = useOffSetTop();

  

  const isLoaded = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: googleLibraries,
  });

  return isInitialized && isLoaded.isLoaded ? (
    <AppBar color="transparent" sx={{ boxShadow: '0px 1px 20px rgba(0,0,0,0.07)' }}>
      <Stack direction="column" sx={{ width: '100%' }}>
        <Toolbar
          disableGutters
          sx={{
            height: {
              xs: HEADER.H_MOBILE,
              md: HEADER.H_MAIN_DESKTOP,
            },
            color: 'text.primary',
            backgroundColor: 'white',
            transition: theme.transitions.create(['height', 'background-color'], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.shorter,
            }),
            ...(headerOnDark && {
              color: 'common.white',
            }),
          }}
        >
          <Container
            sx={{
              height: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                lineHeight: 0,
                position: 'relative',
              }}
            >
              <Logo />
            </Box>

            {isMdUp && <NavDesktop />}

            <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
              {!isAuthenticated && isMdUp && (
                <Link
                  href={PATHS.auth.register}
                  variant="subtitle1"
                  underline="none"
                  sx={{
                    color: theme.palette.mode === 'light' ? 'grey.800' : 'common.white',
                    '&:hover': {
                      color: theme.palette.mode === 'light' ? 'primary.main' : 'grey.800',
                    },

                    pr: 2,
                  }}
                >
                  Registar
                </Link>
              )}

              {isMdUp &&
                (isAuthenticated ? (
                  <AccountPopover />
                ) : (
                  <Button
                    variant="contained"
                    color="inherit"
                    href={PATHS.auth.login}
                    rel="noopener"
                    sx={{
                      px: 4,
                      bgcolor: 'primary.main',
                      color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                        color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                      },
                    }}
                  >
                    Entrar
                  </Button>
                ))}
            </Stack>

            {!isMdUp && <NavMobile data={navConfigMobile} />}
          </Container>
        </Toolbar>
        {!isSmUp && (
          <Box sx={{ width: '100%', p: '10px 16px', pb: '20px', backgroundColor: 'white' }}>
            <Searchbar />
          </Box>
        )}
      </Stack>
      <HeaderShadow />
    </AppBar>
  ) : (
    <LoadingScreen />
  );
}
