// next
import NextLink from 'next/link';
// react
import { useState } from 'react';
// @mui
import {
  Link,
  Stack,
  Drawer,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
import { signOut, useSession } from 'next-auth/react';

// config
import { NAV } from 'src/layouts';
// routes
import { PATHS } from 'src/routes/paths';
import { useRouter } from 'next/router';
// components
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import UploadPictureModal from './UploadPictureModal';

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
    path: PATHS.account.payments,
    icon: <Iconify icon="ic:round-payment" />,
  },
  {
    title: 'Definições',
    path: PATHS.account.settings,
    icon: <Iconify icon="material-symbols:settings-outline-rounded" />,
  },
];

// ----------------------------------------------------------------------

type FormValuesProps = {
  open: boolean;
  onClose: VoidFunction;
  // profile_picture: string | null;
};

export default function AccountMenu({ open, onClose }: FormValuesProps) {
  const isMdUp = useResponsive('up', 'md');
  const { data: user } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  // Form Data State
  const routes = useRouter();

  const handleLogoutClick = async () => {
    setIsLoading(true);
    await signOut();
    const prevUrl = localStorage.getItem('prevUrl');
    routes.push(prevUrl || PATHS.home);
  };

  const renderContent = (
    <Stack
      sx={{
        flexShrink: 0,
        bgcolor: 'white',
        borderRadius: '16px',
        boxShadow:
          'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
        width: 1,
        ...(isMdUp && {
          width: NAV.W_DRAWER,
        }),
      }}
    >
      <UploadPictureModal open={openModal} onClose={() => setOpenModal(false)} />
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
