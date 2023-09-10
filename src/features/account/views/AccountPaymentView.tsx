// @mui
import { Box, Stack, Button, Typography, Snackbar, Alert, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
// types
import { ISnackbarProps } from 'src/types/snackbar';
// hooks
import { useResponsive } from 'src/hooks';
// lib
import axios from 'src/lib/axios';
// components
import EmptyState from 'src/components/empty-state/EmptyState';
import Iconify from 'src/components/iconify';
// lib
import fetch from 'src/lib/fetch';
//
import { AccountLayout, AccountPaymentCard, AccountNewCardModal } from '../components';

// ----------------------------------------------------------------------

export default function AccountPaymentView() {
  const isMdUp = useResponsive('up', 'md');
  const theme = useTheme();

  const [openModal, setOpenModal] = useState(false);
  const [cardsLoading, setCardsLoading] = useState<boolean>(true);
  const [showSnackbar, setShowSnackbar] = useState<ISnackbarProps>({
    show: false,
    severity: 'success',
    message: '',
  });

  async function getCards() {
    try {
      const response = await fetch('/api/payments/payment-methods', {
        method: 'GET',
      });
      setCardsLoading(false);
      return response.data.data;
    } catch (error) {
      console.error('error', error);
    }
    setCardsLoading(false);
    return { error: true };
  }

  const [CARDS, setCARDS] = useState([]);

  useEffect(() => {
    getCards().then((data) => {
      if (data?.error) {
        return;
      }
      setCARDS(data);
    });
  }, []);

  const handleDeleteCard = async (card) => {
    try {
      await fetch(`/api/payments/payment-methods/${card.id}`, {
        method: 'DELETE',
      }).then(() => {
        getCards().then((data) => {
          setCARDS(data);
        });

        setShowSnackbar({
          show: true,
          severity: 'success',
          message: 'O cartão foi eliminado com sucesso.',
        });
      });
    } catch (error) {
      if (
        error.error?.message ===
        'You cannot delete a payment method that is associated with an active order.'
      ) {
        setShowSnackbar({
          show: true,
          severity: 'warning',
          message: 'Não é possivel eliminar um cartão que esteja associado a um pedido.',
        });
        return;
      }
      setShowSnackbar({
        show: true,
        severity: 'error',
        message: 'Algo correu mal, tente novamente.',
      });
    }
  };

  return (
    <>
      <Snackbar
        open={showSnackbar.show}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() =>
          setShowSnackbar({
            show: false,
            severity: 'success',
            message: '',
          })
        }
      >
        <Alert
          onClose={() =>
            setShowSnackbar({
              show: false,
              severity: 'success',
              message: '',
            })
          }
          severity={showSnackbar.severity}
          sx={{ width: '100%' }}
        >
          {showSnackbar.message}
        </Alert>
      </Snackbar>
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
                  display: 'inline-flex',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h5">Informações de Pagamento</Typography>
              </Stack>
              {isMdUp && (
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
                    Adicionar Cartão
                  </Button>
                </Stack>
              )}

              {CARDS.length > 0 &&
                CARDS.map((card: any) => (
                  <AccountPaymentCard
                    key={card.id}
                    card={card}
                    handleDelete={() => handleDeleteCard(card)}
                  />
                ))}

              {CARDS.length === 0 && cardsLoading && (
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    height: '200px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gridColumn: 'span 2',
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
              {CARDS.length === 0 && !cardsLoading && (
                <EmptyState
                  icon="uil:atm-card"
                  title="Sem cartões adicionados"
                  description="Neste momento não tem nenhum método de pagamento associado."
                />
              )}
              {!isMdUp && (
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

                      width: '100%',
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
                    Adicionar Cartão
                  </Button>
                </Stack>
              )}
            </Box>
          </Stack>

          <Stack spacing={3}>
            <AccountNewCardModal
              onAddCard={(result: 'success' | 'error') =>
                setShowSnackbar({
                  show: true,
                  severity: result,
                  message:
                    result === 'success'
                      ? 'O seu cartão foi adicionado com sucesso.'
                      : 'Algo correu mal, tente novamente',
                })
              }
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
    </>
  );
}
