import { m } from 'framer-motion';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Button, Typography } from '@mui/material';
// layouts
import Layout from '../src/layouts';
// components
import { Page, Image } from '../src/components';
import { MotionContainer, varBounce } from '../src/components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: theme.spacing(15, 2.5),
  [theme.breakpoints.up('sm')]: {
    height: '100vh',
  },
}));

// ----------------------------------------------------------------------

export default function PageNotFound() {
  return (
    <MotionContainer>
      <Page title="404 Ooops">
        <RootStyle>
          <Stack alignItems="center" sx={{ maxWidth: 480 }}>
            <m.div variants={varBounce().in}>
              <Typography variant="h3" paragraph>
              Página não encontrada!
              </Typography>
            </m.div>
            <Typography sx={{ color: 'text.secondary' }}>
              A página que está à procura parece não existir. 
              Talvez seja melhor rever o URL ou voltar à página principal.
            </Typography>

            <m.div variants={varBounce().in}>
              <Image
                alt="404"
                src="https://zone-assets-api.vercel.app/assets/illustrations/illustration_404.svg"
                sx={{ maxWidth: 320, my: { xs: 6, sm: 8 } }}
              />
            </m.div>

            <NextLink href="/home" passHref>
              <Button size="large" variant="contained">
                Voltar
              </Button>
            </NextLink>
          </Stack>
        </RootStyle>
      </Page>
    </MotionContainer>
  );
}

// ----------------------------------------------------------------------

PageNotFound.getLayout = function getLayout(page) {
  return (
    <Layout simpleHeader disabledFooter>
      {page}
    </Layout>
  );
};
