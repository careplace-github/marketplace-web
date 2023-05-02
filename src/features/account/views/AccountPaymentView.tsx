// @mui
import { Box, Stack, Button, Divider, Typography } from '@mui/material';
import { useRef, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';

// _mock
import _mock from 'src/_mock';
// contexts
import { useAuthContext } from 'src/contexts';
// lib
import axios from 'src/lib/axios';
// routes
import { PATHS } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
//
import { AccountLayout, AccountPaymentCard, AccountNewCardModal } from '../components';

// ----------------------------------------------------------------------

export default function AccountPaymentView() {
  const { user } = useAuthContext();

  const theme = useTheme();

  const [openModal, setOpenModal] = useState(false);

  async function getCards() {
    const response = await axios.get('/payments/payment-methods');
    return response.data;
  }

  const [CARDS, setCARDS] = useState([]);

  useEffect(() => {
    getCards().then((data) => {
      setCARDS(data);

      console.log(data);
    });
  }, []);

  return (
    <AccountLayout>
      <Stack spacing={5}>
        <Stack spacing={3}>
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
            sx={{
              p: 3,
              bgcolor: 'white',
              borderRadius: '16px',
              boxShadow:
                'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
            }}
          >
            <Stack
              spacing={3}
              sx={{
                width: '100%',
              }}
            >
              {' '}
              <Typography variant="h5">Informações de Pagamento</Typography>
            </Stack>

            <Stack
              spacing={3}
              sx={{
                width: '100%',
                alignItems: 'flex-end',
              }}
            >
              <Button
                size="large"
                color="inherit"
                onClick={() => setOpenModal(true)}
                sx={{
                  // Allign right

                  width: 'fit-content',
                  bgcolor: 'primary.main',
                  color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                  },
                }}
                variant="contained"
                startIcon={<Iconify icon="material-symbols:add" />}
              >
                Adiconar Cartão
              </Button>
            </Stack>

            {CARDS.map((card: any) => (
              <AccountPaymentCard
                key={card.id}
                card={card}
                handleDelete={() =>
                  axios.delete(`/payments/payment-methods/${card.id}`).then(() => {
                    getCards().then((data) => {
                      setCARDS(data);
                    });
                  })
                }
              />
            ))}
          </Box>
        </Stack>

        <Stack spacing={3}>
          <AccountNewCardModal
            open={openModal}
            onClose={() => {
              setOpenModal(false);
              getCards().then((data) => {
                setCARDS(data);
              });
            }}
          />
        </Stack>
      </Stack>
    </AccountLayout>
  );
}
