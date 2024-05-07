// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link, Stack, Button, AppBar, Toolbar, Container } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// auth
import { useAuthContext } from 'src/contexts';
// config
import { HEADER } from 'src/layouts/config';
// routes
import { useRouter } from 'next/router';
import { PATHS } from 'src/routes';
// components
import Logo from 'src/components/logo';
import Label from 'src/components/label';
import Badge, { badgeClasses } from '@mui/material/Badge';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import { Searchbar } from 'src/components/searchbar';
import AccountPopover from './AccountPopover';
//
import { NavMobile, NavDesktop, navConfigMobile } from '../nav';
import HeaderShadow from '../../components/HeaderShadow';

// ----------------------------------------------------------------------

type Props = {
  headerOnDark: boolean;
  hideSearchbar?: boolean;
};

export default function Header({ headerOnDark, hideSearchbar }: Props) {
  const { isAuthenticated, isInitialized } = useAuthContext();
  const router = useRouter();
  const theme = useTheme();

  const isMdUp = useResponsive('up', 'md');

  return isInitialized ? (
    <AppBar
      color="transparent"
      sx={{
        boxShadow: '0px 1px 20px rgba(0,0,0,0.07)',
        backgroundColor: hideSearchbar ? 'red' : 'white',
      }}
    >
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
              <Badge
                sx={{
                  [`& .${badgeClasses.badge}`]: {
                    top: 8,
                    right: -16,
                  },
                }}
                // badgeContent={
                //   <Label color="info" sx={{ textTransform: 'unset', height: 20, px: 0.5, ml: 1 }}>
                //     beta
                //   </Label>
                // }
              >
                <Logo logoHeight={33} />
              </Badge>{' '}
            </Box>

            {isMdUp && !hideSearchbar && <NavDesktop />}

            <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
              {!isAuthenticated && isMdUp && (
                <Link
                  onClick={() => {
                    localStorage.setItem('prevUrl', router.asPath);
                  }}
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
                    onClick={() => {
                      localStorage.setItem('prevUrl', router.asPath);
                      router.push(PATHS.auth.login);
                    }}
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
        {!isMdUp && !hideSearchbar && (
          <Box
            sx={{
              width: '100%',
              p: '10px 16px',
              pb: '20px',
              backgroundColor: 'white',
            }}
          >
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
