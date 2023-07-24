// next
import NextLink from 'next/link';
// @mui
import { Link, Typography, Container, Stack } from '@mui/material';
// routes
import { PATHS } from 'src/routes/paths';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
// hooks
import EmailVerifyCodeForm from '../components/EmailVerifyCodeForm';

// ----------------------------------------------------------------------

const VerifyEmailView = () => {
  return (
    <Container component="main">
      <Stack
        sx={{
          py: 9,
          m: 'auto',
          maxWidth: 480,
          minHeight: '90vh',
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        {/* TODO: Add email related image */}
        <Image
          alt="email inbox"
          src="/assets/icons/undraw_email.svg"
          sx={{ mb: 5, mx: 'auto', height: '92px' }}
        />

        <Typography variant="h3">Confirmar Email</Typography>

        <Typography variant="body2" sx={{ mt: 2, mb: 5, color: 'text.secondary' }}>
          Enviámos-lhe um código com 6 dígitos para o seu email. Por favor escreva o código abaixo
          para confirmar o email associado.
        </Typography>

        <EmailVerifyCodeForm />
      </Stack>
    </Container>
  );
};

export default VerifyEmailView;
