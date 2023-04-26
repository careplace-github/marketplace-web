// next
import NextLink from 'next/link';
// auth
import { useAuthContext } from 'src/contexts';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Button, Stack } from '@mui/material';
// _mock
import { _products } from 'src/_mock';
// axios
import axios from 'src/lib/axios';
// hooks
import { useEffect, useState } from 'react';
// components
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import Iconify from 'src/components/iconify';
import RelativeInformationModal from '../components/relatives/RelativeInformationModal';
//
import { AccountLayout, EcommerceCartList } from '../components';
import { formatRelative } from 'date-fns';

// ----------------------------------------------------------------------

export default function AccountRelativesView() {
  const [userRelatives, setUserRelatives] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openAddRelativeModal, setOpenAddRelativeModal] = useState<Object>({
    open: false,
    action: '',
  });
  const theme = useTheme();

  const fetchUserRelatives = async () => {
    const response = await axios.get('users/relatives');
    setUserRelatives(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserRelatives();
  }, []);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <AccountLayout>
      {openAddRelativeModal.open && (
        <RelativeInformationModal
          open={openAddRelativeModal.open}
          onClose={() => setOpenAddRelativeModal({ open: false, action: '' })}
          action={openAddRelativeModal.action}
          relative={
            openAddRelativeModal.action === 'edit' && openAddRelativeModal.relativeSelected
              ? openAddRelativeModal.relativeSelected
              : null
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
        <Typography variant="h5" sx={{ mb: 3 }}>
          Familiares
        </Typography>
        <Box sx={{ maxHeight: '700px' }}>
          <EcommerceCartList
            userRelatives={userRelatives}
            onEditClick={(relative) =>
              setOpenAddRelativeModal({ open: true, action: 'edit', relativeSelected: relative })
            }
          />
        </Box>

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
      </Box>
    </AccountLayout>
  );
}
