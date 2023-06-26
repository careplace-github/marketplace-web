import { useState } from 'react';
// @mui
import { Container, Stack, Typography, Box } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// auth
import { useAuthContext } from 'src/contexts';
// config
import { NAV } from 'src/layouts';
// components
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
//
import AccountMenu from './AccountMenu';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AccountLayout({ children }: Props) {
  const isMdUp = useResponsive('up', 'md');
  const { isInitialized } = useAuthContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return !isInitialized ? (
    <LoadingScreen />
  ) : (
    <>
      {isMdUp ? (
        <Container sx={{ my: 5 }}>
          <Typography variant="h3">A Minha Conta</Typography>
        </Container>
      ) : (
        <Box sx={{ py: 2, mb: 5, borderBottom: (theme) => `solid 1px ${theme.palette.divider}` }}>
          <Container>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
              }}
            >
              A Minha Conta
            </Typography>
          </Container>
        </Box>
      )}

      <Container>
        <Stack
          direction={{
            md: 'row',
          }}
          alignItems={{
            md: 'flex-start',
          }}
          sx={{
            mb: {
              xs: 8,
              md: 10,
            },
          }}
        >
          <AccountMenu open={menuOpen} onClose={handleMenuClose} />

          <Box
            sx={{
              flexGrow: 1,
              pl: { md: 8 },
              width: { md: `calc(100% - ${NAV.W_DRAWER}px)` },
            }}
          >
            {children}
          </Box>
        </Stack>
      </Container>
    </>
  );
}
