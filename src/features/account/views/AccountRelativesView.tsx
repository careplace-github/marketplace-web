// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Button, Stack, Snackbar, Alert, CircularProgress } from '@mui/material';
// axios
import axios from 'src/lib/axios';
// hooks
import { useEffect, useState } from 'react';
import { useResponsive } from 'src/hooks';
// components
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import Iconify from 'src/components/iconify';
import EmptyState from 'src/components/empty-state/EmptyState';
// Types
import { IRelativeProps } from 'src/types/relative';
import { ISnackbarProps } from 'src/types/snackbar';
//
import { AccountLayout, RelativesList } from '../components';
import RelativeInformationModal from '../components/relatives/RelativeInformationModal';

// ----------------------------------------------------------------------

type RelativeModalProps = {
  open: boolean;
  action: 'add' | 'edit';
  relativeSelected?: IRelativeProps;
};

export default function AccountRelativesView() {
  const [userRelatives, setUserRelatives] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState<ISnackbarProps>({
    show: false,
    severity: 'success',
    message: '',
  });
  const [openAddRelativeModal, setOpenAddRelativeModal] = useState<RelativeModalProps>({
    open: false,
    action: 'add',
  });
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');

  const fetchUserRelatives = async () => {
    const response = await axios.get('customers/patients');
    setUserRelatives(response.data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserRelatives();
  }, []);

  const handleDeleteRelative = async (relativeToDelete: IRelativeProps) => {
    try {
      const response = await axios.delete(`/customers/patients/${relativeToDelete._id}`);
      setShowSnackbar({
        show: true,
        severity: 'success',
        message: 'Familiar eliminado com sucesso.',
      });
      fetchUserRelatives();
    } catch (error) {
      if (error.error.message === 'You cannot delete a patient with associated orders') {
        setShowSnackbar({
          show: true,
          severity: 'error',
          message: 'Não pode eliminar familiares que tenham pedidos efetuados.',
        });
        return;
      }
      setShowSnackbar({
        show: true,
        severity: 'error',
        message: 'Algo correu mal, tente novamente',
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
        {openAddRelativeModal.open && (
          <RelativeInformationModal
            onActionMade={(action: 'edit' | 'add', result: 'success' | 'error') => {
              const snackbarMessage =
                action === 'edit'
                  ? 'Familiar foi atualizado com sucesso.'
                  : 'O seu Familiar foi adicionado com sucesso.';
              setShowSnackbar({
                show: true,
                severity: result,
                message: result === 'error' ? 'Algo correu mal, tente novamente.' : snackbarMessage,
              });
            }}
            open={openAddRelativeModal.open}
            onClose={() => {
              setOpenAddRelativeModal({ open: false, action: 'add' });
              fetchUserRelatives();
            }}
            action={openAddRelativeModal.action}
            relative={
              openAddRelativeModal.action === 'edit' && openAddRelativeModal.relativeSelected
                ? openAddRelativeModal.relativeSelected
                : undefined
            }
          />
        )}
        <Box
          sx={{
            p: 3,
            bgcolor: 'white',
            borderRadius: '16px',
            boxShadow:
              'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
          }}
        >
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Typography variant="h5">Familiares</Typography>

            {isMdUp && (
              <Stack spacing={3} sx={{ width: 'fit-content' }}>
                <Button
                  onClick={() => setOpenAddRelativeModal({ open: true, action: 'add' })}
                  size="large"
                  color="inherit"
                  sx={{
                    px: 4,
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
                  Adiconar Familiar
                </Button>
              </Stack>
            )}
          </Stack>
          {userRelatives?.length > 0 && (
            <Box sx={{ maxHeight: '700px', mt: 3 }}>
              <RelativesList
                userRelatives={userRelatives}
                onEditClick={(relative) =>
                  setOpenAddRelativeModal({
                    open: true,
                    action: 'edit',
                    relativeSelected: relative,
                  })
                }
                onDeleteRelative={handleDeleteRelative}
              />
            </Box>
          )}
          {userRelatives?.length === 0 && !isLoading && (
            <EmptyState
              icon="bi:person-x-fill"
              title="Não tem nenhum familiar associado"
              description="Todos os familiares que adicionar vão ser apresentados nesta página"
            />
          )}
          {userRelatives?.length === 0 && isLoading && (
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                height: '300px',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {!isMdUp && (
            <Stack alignItems={{ sm: 'flex-end' }} sx={{ mt: 3 }}>
              <Stack spacing={3} sx={{ minWidth: 240, marginTop: '30px' }}>
                <Button
                  onClick={() => setOpenAddRelativeModal({ open: true, action: 'add' })}
                  size="large"
                  color="inherit"
                  sx={{
                    px: 4,
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
                  Adiconar Familiar
                </Button>
              </Stack>
            </Stack>
          )}
        </Box>
      </AccountLayout>
    </>
  );
}
