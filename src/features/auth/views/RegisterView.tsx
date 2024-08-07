// next
import NextLink from 'next/link';
// @mui
import { Link, Stack, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
// routes
import { PATHS } from 'src/routes/paths';
// utils
import { bgGradient } from 'src/utils/cssStyles';
//
import AuthRegisterForm from '../components/AuthRegisterForm';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, 0.9),
    imgUrl: '/assets/background/overlay_1.jpg',
  }),
  display: 'flex',
  minHeight: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 2),
}));

// ----------------------------------------------------------------------

export default function RegisterView() {
  return (
    <StyledRoot>
      <Stack
        spacing={4}
        sx={{
          p: 4,
          width: 1,
          mx: 'auto',
          flexShrink: 0,
          maxWidth: 400,
          borderRadius: 2,
          bgcolor: 'background.default',
          textAlign: { xs: 'center', md: 'left' },
          boxShadow: (theme) => theme.customShadows.z24,
        }}
      >
        <div>
          <Typography variant="h3" paragraph>
            Criar Conta
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {`Já tem conta? `}
            <Link component={NextLink} href={PATHS.auth.login} variant="subtitle2" color="primary">
              Entrar
            </Link>
          </Typography>
        </div>

        <AuthRegisterForm />
      </Stack>
    </StyledRoot>
  );
}
