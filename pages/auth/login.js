// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Link, Stack, Divider, Container, Typography } from '@mui/material';
// routes
import Routes from '../../src/routes';
// layouts
import Layout from '../../src/layouts';
// components
import { Page, Image } from '../../src/components';
import { AuthWithSocial, LoginForm } from '../../src/sections/auth';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(12, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(22, 0),
  },
}));

// ----------------------------------------------------------------------

export default function LoginIllustrationPage() {
  return (
    <Page title="Login">
      <RootStyle>
        <Container>
          <Grid container spacing={5} justifyContent="space-between">
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Image
                alt="login"
                src="https://img.freepik.com/free-vector/two-factor-authentication-concept-illustration_114360-5488.jpg?w=996&t=st=1675298674~exp=1675299274~hmac=728c33fd1a327d729815850f697ed35a95e9c5d27240bba4b3cb04b8f66d2ea8"
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Stack
                spacing={4}
                sx={{
                  p: 4,
                  textAlign: { xs: 'center', md: 'left' },
                  borderRadius: 2,
                  boxShadow: (theme) => theme.customShadows.z24,
                }}
              >
                <div>
                  <Typography variant="h3" paragraph>
                    Login
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Não tem conta?
                    <NextLink href={Routes.registerIllustration} passHref>
                      <Link variant="subtitle2" color="primary">
                        {''} Aderir
                      </Link>
                    </NextLink>
                  </Typography>
                </div>
                <LoginForm />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
/*
<Divider sx={{ '& .MuiDivider-wrapper': { flexShrink: 0 } }}>
                  <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                    or continue with
                  </Typography>
                </Divider>

                <AuthWithSocial />
*/
// ----------------------------------------------------------------------

LoginIllustrationPage.getLayout = function getLayout(page) {
  return (
    <Layout simpleHeader disabledFooter>
      {page}
    </Layout>
  );
};
