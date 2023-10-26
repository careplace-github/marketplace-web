import { useState, useEffect } from 'react';
// @mui
import { List, Drawer, Button, Stack, Box, Avatar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// config
import { NAV } from 'src/layouts';
// components
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
// routes
import { useRouter } from 'next/router';
import { PATHS } from 'src/routes';
// auth
import { useAuthContext } from 'src/contexts';
// types
import { NavProps } from '../types';
//
import NavList from './NavList';

// ----------------------------------------------------------------------

export default function NavMobile({ data }: NavProps) {
  const { pathname } = useRouter();
  const router = useRouter();
  const theme = useTheme();
  const { isAuthenticated, user, logout } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      logout();
      handleClose();
      const prevUrl = localStorage.getItem('prevUrl');
      router.push(prevUrl || PATHS.home);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <Avatar
          sx={{ width: '35px', height: '35px' }}
          src={user?.profile_picture}
          onClick={handleOpen}
        />
      ) : (
        <Iconify icon="material-symbols:menu-rounded" onClick={handleOpen} />
      )}

      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            pb: 5,
            width: NAV.W_BASE,
          },
        }}
      >
        <Scrollbar>
          {!isAuthenticated && (
            <Stack
              sx={{ width: '100%', alignItems: 'center', justifyContent: 'center', mt: 5, pb: 5 }}
            >
              <Logo sx={{ mx: 2.5 }} />
            </Stack>
          )}

          {isAuthenticated && (
            <>
              <Box
                sx={{
                  mt: '50px',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '15px',
                  pl: '16px',
                  alignItems: 'center',
                  mb: '30px',
                }}
              >
                <Avatar
                  onClick={() => router.push(PATHS.account.personal)}
                  src={user?.profile_picture}
                />
                <Typography variant="h6" sx={{ color: 'text.primary' }} noWrap>
                  {user?.name}
                </Typography>
              </Box>
              {/* <Divider sx={{ width: "calc(100% - 32px )", ml: "16px", mb: "12px" }} /> */}
            </>
          )}

          <List component="nav" disablePadding>
            {data.map((link) => {
              if (
                !isAuthenticated &&
                (link.title === 'Dados Pessoais' ||
                  link.title === 'Pedidos' ||
                  link.title === 'Familiares' ||
                  link.title === 'Informações de Pagamento' ||
                  link.title === 'Definições')
              )
                return null;
              return <NavList key={link.title} item={link} />;
            })}
          </List>

          <Stack spacing={1.5} sx={{ p: 3 }}>
            {isAuthenticated ? (
              <Box
                sx={{
                  width: '100%',
                  mt: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography onClick={handleLogout} variant="body2" sx={{ color: 'red' }} noWrap>
                  Terminar Sessão
                </Typography>
              </Box>
            ) : (
              <>
                <Button
                  fullWidth
                  variant="outlined"
                  color="inherit"
                  sx={{
                    mt: '10px',
                    px: 4,
                    bgcolor: 'transparent',

                    color: 'primary.main',
                  }}
                  onClick={() => {
                    localStorage.setItem('prevUrl', router.asPath);
                    router.push(PATHS.auth.register);
                  }}
                >
                  Registar
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="inherit"
                  onClick={() => {
                    localStorage.setItem('prevUrl', router.asPath);
                    router.push(PATHS.auth.login);
                  }}
                  sx={{
                    mt: '10px',
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
              </>
            )}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
