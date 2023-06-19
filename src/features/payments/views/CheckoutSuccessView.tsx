import { m } from 'framer-motion';
// next
import NextLink from 'next/link';
// @mui
import { Box, Button, Typography, Stack, Container } from '@mui/material';
// components
import Iconify from 'src/components/iconify';
import { MotionContainer, varBounce } from 'src/components/animate';

//

// ----------------------------------------------------------------------

export default function CheckoutSuccessView() {
  return (
    <>
      <Container
        component={MotionContainer}
        sx={{
          textAlign: 'center',
          pt: { xs: 5, md: 10 },
          pb: { xs: 10, md: 20 },
        }}
      >
        <m.div variants={varBounce().in}>
          <Iconify icon="bxs:check-circle" sx={{ color: 'green' }} width="100px" height="100px" />
        </m.div>

        <Stack spacing={1} sx={{ my: 5 }}>
          <Typography variant="h3">O seu pagamento foi efetuado com sucesso!</Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Irá receber um email de confirmação com todos os detalhes do pedido
          </Typography>
        </Stack>

        <Button
          component={NextLink}
          href="/"
          size="large"
          color="inherit"
          variant="contained"
          startIcon={<Iconify icon="carbon:chevron-left" />}
        >
          Voltar
        </Button>
      </Container>
    </>
  );
}
