// next
import NextLink from 'next/link';
// @mui
import { Box, Typography, Button, Stack } from '@mui/material';
// _mock
import { _products } from 'src/_mock';
// components
import Iconify from 'src/components/iconify';
//
import { AccountLayout } from '../../sections/account';
import { EcommerceCartList } from '../../sections/account/relatives';

// ----------------------------------------------------------------------

export default function AccountRelativesView() {
  return (
    <AccountLayout>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Wishlist
      </Typography>

      <EcommerceCartList wishlist products={_products.slice(0, 4)} />

      <Stack alignItems={{ sm: 'flex-end' }} sx={{ mt: 3 }}>
        <Stack spacing={3} sx={{ minWidth: 240 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ typography: 'h6' }}
          >
            <Box component="span"> Subtotal</Box>
            $58.07
          </Stack>

          <Button
            component={NextLink}
            href="/"
            size="large"
            color="inherit"
            variant="contained"
            startIcon={<Iconify icon="carbon:shopping-cart-plus" />}
          >
            Add to Cart
          </Button>
        </Stack>
      </Stack>
    </AccountLayout>
  );
}
