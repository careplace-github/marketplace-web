// next
import NextLink from 'next/link';
// @mui
import { Link, Typography } from '@mui/material';
// routes
import { PATHS } from 'src/routes/paths';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
// hooks
import { AuthVerifyCodeForm } from '../components';

// ----------------------------------------------------------------------

export default function VerifyCodeView() {
  return (
    <>
      <Image
        alt="email inbox"
        src="/assets/icons/undraw_email.svg"
        sx={{ mb: 5, mx: 'auto', height: '92px' }}
      />
      <Typography variant="h3">Confirmar Conta</Typography>

      <Typography variant="body2" sx={{ mt: 2, mb: 5, color: 'text.secondary' }}>
        Enviámos-lhe um código com 6 dígitos para o seu email. Por favor escreva o código abaixo
        para confirmar a sua conta.
      </Typography>

      <AuthVerifyCodeForm />

      <Link
        component={NextLink}
        href={PATHS.auth.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          mt: 3,
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="carbon:chevron-left" width={16} sx={{ mr: 1 }} />
        Voltar ao Login
      </Link>
    </>
  );
}
