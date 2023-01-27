// @mui
import { styled } from '@mui/material/styles';
import { Card, Container, Typography, Box, Grid } from '@mui/material';
// layouts
import Layout from '../src/layouts';
// components
import { Page } from '../src/components';
// sections
import { CheckoutSummary, CheckoutMethods, CheckoutBillingAddress } from '../src/sections/checkout';
import CheckoutWidget from './checkout-2/CheckoutWidget';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function CheckoutPage() {
  return (
    <RootStyle title="Checkout">
      <Container>
        <Typography variant="h3" align="center" paragraph>
          {`Let's Finish Powering You Up!`}
        </Typography>
        <Typography align="center" sx={{ color: 'text.secondary', mb: 5 }}>
          Professional plan is right for you.
        </Typography>
        
        <Grid container spacing={2} >
          <Grid item xs={8} >   
            <CheckoutBillingAddress />
            <CheckoutMethods />
          </Grid>
          <Grid item xs={4} >
            <CheckoutSummary />
           </Grid>
         </Grid>
        
       
        
      </Container>
    </RootStyle>
  );
}
/*
<CheckoutWidget />    

*/
// ----------------------------------------------------------------------

CheckoutPage.getLayout = function getLayout(page) {
  return (
    <Layout simpleHeader disabledFooter>
      {page}
    </Layout>
  );
};
