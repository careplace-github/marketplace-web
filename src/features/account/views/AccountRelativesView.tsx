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
import { useResponsive } from 'src/hooks';
// components
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import Iconify from 'src/components/iconify';
import RelativeInformationModal from '../components/relatives/RelativeInformationModal';
//
import { AccountLayout, EcommerceCartList } from '../components';

// ----------------------------------------------------------------------
type RelativeProps = {
  _id: string;
  name: string;
  profile_picture: string;
  kinship: { to: string; from: string };
  birthdate: string;
  phone_number: string;
  address: {
    street: string;
    city: string;
    country: string;
    postal_code: string;
  };
  gender: string;
  medical_conditions: string;
};

type RelativeModalProps = {
  open: boolean;
  action: 'add' | 'edit';
  relativeSelected?: RelativeProps;
};

export default function AccountRelativesView() {
  const [userRelatives, setUserRelatives] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openAddRelativeModal, setOpenAddRelativeModal] = useState<RelativeModalProps>({
    open: false,
    action: 'add',
  });
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');

  const fetchUserRelatives = async () => {
    const response = await axios.get('users/relatives');
    setUserRelatives(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserRelatives();
  }, []);

  const handleDeleteRelative = async (relativeToDelete) => {
    const response = await axios.delete(`/users/relatives/${relativeToDelete._id}`);
    console.log(response);
    fetchUserRelatives();
  };

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <AccountLayout>
      {openAddRelativeModal.open && (
        <RelativeInformationModal
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
          sx={{ mb: 3 }}
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
        <Box sx={{ maxHeight: '700px' }}>
          <EcommerceCartList
            userRelatives={userRelatives}
            onEditClick={(relative) =>
              setOpenAddRelativeModal({ open: true, action: 'edit', relativeSelected: relative })
            }
            onDeleteRelative={handleDeleteRelative}
          />
        </Box>
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
  );
}
