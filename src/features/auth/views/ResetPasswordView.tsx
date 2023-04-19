// react
import { useState, useEffect } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { Link, Typography, Box } from '@mui/material';
// routes
import { PATHS } from 'src/routes/paths';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar'; //
import { AuthResetPasswordForm } from '../components';

// ----------------------------------------------------------------------

export default function ResetPasswordView() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Image
        alt="reset password"
        src="/assets/icons/ic_lock_password.svg"
        sx={{ mb: 5, width: 96, height: 96, mx: 'auto' }}
      />

      <Typography variant="h3" paragraph>
        Repor Password
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        Enviámos-lhe um código com 6 dígitos para o seu telemóvel.
        <br />
        Por favor escreva o código abaixo para definir a sua nova password.
      </Typography>

      <AuthResetPasswordForm />

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
