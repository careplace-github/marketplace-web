import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Button, AppBar, Divider, Container, Link } from '@mui/material';
// hooks
import { useOffSetTop, useResponsive } from '../../hooks';
// config
import { HEADER_DESKTOP_HEIGHT } from '../../config';
// components
import { Logo, Label } from '../../components';

import { NavMobile, NavDesktop, navConfig } from '../nav';
import { ToolbarStyle, ToolbarShadowStyle } from './HeaderToolbarStyle';

// ----------------------------------------------------------------------

Header.propTypes = {
  transparent: PropTypes.bool,
};

export default function Header({ transparent }) {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'md');
  const hasAuth = false

  const isLight = theme.palette.mode === 'light';

  const isScrolling = useOffSetTop(HEADER_DESKTOP_HEIGHT);

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle disableGutters transparent={transparent} scrolling={isScrolling}>
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Box sx={{ lineHeight: 0, position: 'relative' }}>
            <Logo/>
          </Box>

          {isDesktop && (
            <NavDesktop
              isScrolling={isScrolling}
              isTransparent={transparent}
              navConfig={navConfig}
            />
          )}

          <Box sx={{ flexGrow: 1 }} />

          <Stack spacing={2} direction="row" alignItems="center">
             {/**
            <Searchbar
              sx={{
                ...(isScrolling && { color: 'text.primary' }),
              }}
            />
           
             <LanguagePopover
              sx={{
                ...(isScrolling && { color: 'text.primary' }),
              }}
            />

             <Divider orientation="vertical" sx={{ height: 24 }} />
             */}

           

            {isDesktop && !hasAuth && (
              <Stack direction="row" spacing={1}>
                { 
                 <NextLink href={'/auth/register/'} prefetch={false} passHref>
                   <Button
                    color="inherit"
                    variant="outlined"
                    sx={{
                      ...(transparent && {
                        color: 'common.white',
                      }),
                      ...(isScrolling && isLight && { color: 'text.primary' }),
                    }}
                  >
                    Registar
                  </Button>
                </NextLink>
                 }

                <Button variant="contained" href={'/auth/login/'} target="_blank" rel="noopener">
                  Entrar
                </Button>
              </Stack>
            )}
          </Stack>
          <Stack spacing={2} direction="row" alignItems="center">
            {isDesktop && hasAuth && (
              <Stack direction="row" spacing={1}>
                <Button variant="contained" href={'localhost:3031'} target="_blank" rel="noopener">
                  A minha conta
                </Button>
              </Stack>
            )}
          </Stack>

          

          {!isDesktop && (
            <NavMobile
              navConfig={navConfig}
              sx={{
                ml: 1,
                ...(isScrolling && { color: 'text.primary' }),
              }}
            />
          )}
        </Container>
      </ToolbarStyle>

      {isScrolling && <ToolbarShadowStyle />}
    </AppBar>
  );
}
