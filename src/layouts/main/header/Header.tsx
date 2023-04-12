// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link, Stack, Button, AppBar, Toolbar, Container } from '@mui/material';
// hooks
import useOffSetTop from 'src/hooks/useOffSetTop';
import useResponsive from 'src/hooks/useResponsive';
// utils
import { bgBlur } from 'src/utils/cssStyles';
// config
import { HEADER } from 'src/config';
// components
import Logo from 'src/components/logo';
import Label from 'src/components/label';
import SettingsDrawer from 'src/components/settings/drawer';
//
import { NavMobile, NavDesktop, navConfig } from '../nav';
import Searchbar from '../../components/Searchbar';
import HeaderShadow from '../../components/HeaderShadow';

// ----------------------------------------------------------------------

type Props = {
  headerOnDark: boolean;
};

export default function Header({ headerOnDark }: Props) {
  const theme = useTheme();

  const isMdUp = useResponsive('up', 'md');

  const isOffset = useOffSetTop();

  return (
    <AppBar color="transparent" sx={{ boxShadow: 'none' }}>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_MAIN_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(headerOnDark && {
            color: 'common.white',
          }),
          ...(isOffset && {
            ...bgBlur({ color: theme.palette.background.default }),
            color: 'text.primary',
            height: {
              md: HEADER.H_MAIN_DESKTOP - 16,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Box sx={{ lineHeight: 0, position: 'relative', pr: 15 }}>
            <Logo />
          </Box>

          {isMdUp && <NavDesktop data={navConfig} />}

          <Stack
            spacing={2}
            flexGrow={1}
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            

            <Link
              href="/auth/register"
              variant='subtitle1'
              underline='none'
              

              sx={{
                color: theme.palette.mode === 'light' ? 'grey.800' : 'common.white'  ,
                '&:hover': {
                  color: 
                    theme.palette.mode === 'light' ? 'primary.main' : 'grey.800',
                },

                pr: 2,
              }}
            >
              Registar
            </Link>

            {isMdUp && (
              <Button
                variant="contained"
                color="inherit"
                href='/auth/login'
                rel="noopener"
                sx={{
                  px: 4,
                  bgcolor: 'primary.main',
                  color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    color: 
                      theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                  },
                }}
              >
                Entrar
              </Button>
            )}
          </Stack>

          {!isMdUp && <NavMobile data={navConfig} />}
        </Container>
      </Toolbar>

      {isOffset && <HeaderShadow />}
    </AppBar>
  );
}