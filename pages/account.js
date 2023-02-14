import Head from 'next/head';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import AccountProfile from '../src/components/account';
import { AccountProfileDetails, Relatives } from '../src/components/account';
import Layout from '../src/layouts';
import { CheckoutBillingAddress, CheckoutMethods } from '../src/sections/checkout';

import{logout} from '../src/auth/JwtContext'


const Page = () => (
  <>    

    <Head>
      <title>
        Minha Conta | Careplace
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Minha Conta 
        </Typography>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountProfile />
            <CheckoutMethods />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <AccountProfileDetails />
            <CheckoutBillingAddress />
          </Grid>
          <Relatives />
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <Layout>
    {page}
  </Layout>
);

export default Page;