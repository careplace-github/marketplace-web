// next
import NextLink from 'next/link';
// icons
import chevronLeft from '@iconify/icons-carbon/chevron-left';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Link, Typography } from '@mui/material';
// routes
import Routes from '../../src/routes';
// layouts
import Layout from '../../src/layouts';
// components
import { Page, Iconify, Image } from '../../src/components';
// sections
import { VerifyCodeForm } from '../../src/sections/auth';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  position: 'relative',
  padding: theme.spacing(20, 2.5),
  [theme.breakpoints.up('sm')]: {
    height: '100vh',
  },
}));

// ----------------------------------------------------------------------

export default function VerifyCodePage() {
  const router = useRouter();
  const { email } = router.query;
  return (
    <Page title="Verify Code">
      <RootStyle>
        <NextLink href={Routes.loginCover} passHref>
          <Button
            color="inherit"
            startIcon={<Iconify icon={chevronLeft} sx={{ width: 16, height: 16 }} />}
            sx={{
              zIndex: 9,
              position: 'absolute',
              top: { xs: 80, sm: 120 },
              left: { xs: 8, sm: 24 },
            }}
          >
            Voltar
          </Button>
        </NextLink>

        <Box sx={{ maxWidth: 480 }}>
          <Image
            alt="email inbox"
            src="https://zone-assets-api.vercel.app/assets/icons/ic_email_inbox.svg"
            sx={{ mb: 5, width: 96, height: 96, mx: 'auto' }}
          />

          <Typography variant="h3" paragraph>
            Verifique o seu email
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Enviámos-lhe um código de confirmação para o seu email. Insira-o 
            a baixo para podermos validar o seu acesso.
          </Typography>

          <VerifyCodeForm email={email}/>

          <Typography variant="body2" align="center">
            Não recebeu o código? {''}
            <Link variant="subtitle2" underline="none" href="mailto:henrique.fonseca@careplace.pt">
              Fale connosco
            </Link>
          </Typography>
        </Box>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

VerifyCodePage.getLayout = function getLayout(page) {
  return (
    <Layout simpleHeader disabledFooter>
      {page}
    </Layout>
  );
};
