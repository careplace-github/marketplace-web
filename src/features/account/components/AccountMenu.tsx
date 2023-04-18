// next
import NextLink from 'next/link';

// auth
import { useAuthContext } from 'src/contexts';
// @mui
import { alpha } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import {
  Link,
  Stack,
  Drawer,
  Avatar,
  Divider,
  Button,
  Box,
  Typography,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
import useActiveLink from 'src/hooks/useActiveLink';
import { useEffect, useState } from 'react';
// config
import { NAV } from 'src/layouts';
// routes
import { PATHS } from 'src/routes/paths';
import { useRouter } from 'next/router';
// _mock
import _mock from 'src/_mock';
// components
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';

// ----------------------------------------------------------------------

const navigations = [
  {
    title: 'Dados Pessoais',
    path: PATHS.account.personal,
    icon: <Iconify icon="material-symbols:account-circle" />,
  },
  {
    title: 'Familiares',
    path: PATHS.account.relatives,
    icon: <Iconify icon="material-symbols:family-restroom-rounded" />,
  },
  {
    title: 'Pedidos',
    path: PATHS.account.orders,
    icon: <Iconify icon="material-symbols:reorder-rounded" />,
  },
  {
    title: 'Informações de Pagamento',
    path: PATHS.account.payment,
    icon: <Iconify icon="ic:round-payment" />,
  },
  {
    title: 'Definições',
    path: PATHS.account.settings,
    icon: <Iconify icon="material-symbols:settings-outline-rounded" />,
  },
];

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
};

export default function AccountMenu({ open, onClose }: Props) {
  const isMdUp = useResponsive('up', 'md');
  const { user, logout } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const routes = useRouter();

  const handleLogoutClick = () => {
    setIsLoading(true);
    logout();
    routes.push(PATHS.home);
  };

  const renderContent = (
    <Stack
      sx={{
        flexShrink: 0,
        borderRadius: 2,
        width: 1,
        ...(isMdUp && {
          width: NAV.W_DRAWER,
          border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
        }),
      }}
    >
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            outline: 'none',
            width: '500px',
            height: 'auto',
            bgcolor: 'white',
            borderRadius: '16px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '20px',
            gap: '10px',
          }}
        >
          <Typography variant="h6">Alterar Imagem de Perfil</Typography>
          <Divider sx={{ width: '100%' }} />
          <Box
            sx={{
              width: '100%',
              height: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              padding: '10px',
              gap: '10px',
            }}
          >
            <Avatar
              src={user?.profile_picture}
              sx={{ width: '100px', height: '100px', mb: '50px' }}
            />
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '20px',
              }}
            >
              <Button
                variant="outlined"
                sx={{ width: '100%', height: '50px', color: 'red', borderColor: 'red' }}
              >
                Cancelar
              </Button>
              <Button variant="contained" sx={{ width: '100%', height: '50px' }}>
                Guardar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Stack spacing={2} sx={{ p: 3, pb: 2 }}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Avatar src={user?.profile_picture} sx={{ width: 64, height: 64 }} />
          <Stack
            direction="row"
            alignItems="center"
            onClick={() => setOpenModal(true)}
            sx={{ typography: 'caption', cursor: 'pointer', '&:hover': { opacity: 0.72 } }}
          >
            <Iconify icon="carbon:edit" sx={{ mr: 1 }} />
            Alterar imagem
          </Stack>
        </Stack>

        <Stack spacing={0.5}>
          <TextMaxLine variant="subtitle1" line={1}>
            {user?.name}
          </TextMaxLine>
          <TextMaxLine variant="body2" line={1} sx={{ color: 'text.secondary' }}>
            {user?.email}
          </TextMaxLine>
        </Stack>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack sx={{ my: 1, px: 2 }}>
        {navigations.map((item) => (
          <MenuItem key={item.title} item={item} />
        ))}
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack sx={{ my: 1, px: 2 }}>
        <ListItemButton
          sx={{
            px: 1,
            height: 44,
            borderRadius: 1,
          }}
        >
          <ListItemIcon>
            <Iconify icon="carbon:logout" />
          </ListItemIcon>
          <ListItemText
            onClick={handleLogoutClick}
            primary="Sair"
            primaryTypographyProps={{
              typography: 'body2',
            }}
          />
        </ListItemButton>
      </Stack>
    </Stack>
  );

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      {isMdUp ? (
        renderContent
      ) : (
        <Drawer
          open={open}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              width: NAV.W_DRAWER,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

type MenuItemProps = {
  item: {
    title: string;
    path: string;
    icon: React.ReactNode;
  };
};

function MenuItem({ item }: MenuItemProps) {
  const { pathname } = useRouter();
  const active = pathname === item.path;
  return (
    <Link
      component={NextLink}
      key={item.title}
      href={item.path}
      color={active ? 'primary' : 'inherit'}
      underline="none"
    >
      <ListItemButton
        sx={{
          px: 1,
          height: 44,
          borderRadius: 1,
        }}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText
          primary={item.title}
          primaryTypographyProps={{
            typography: 'body2',
            ...(active && {
              typography: 'subtitle2',
            }),
          }}
        />
      </ListItemButton>
    </Link>
  );
}
