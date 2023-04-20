import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// next
import { useRouter } from 'next/router';
// auth
import { useAuthContext } from 'src/contexts';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Iconify from "src/components/iconify"
// routes
import { PATHS } from '../../../routes/paths';
// components
import { CustomAvatar } from '../../../components/custom-avatar';
import { useSnackbar } from '../../../components/snackbar';
import MenuPopover from '../../../components/menu-popover';
import { IconButtonAnimate } from '../../../components/animate';


// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: 'Dados Pessoais',
    linkTo: PATHS.account.personal,
    icon: "material-symbols:account-circle"
  },
  {
    label: 'Familiares',
    linkTo: PATHS.account.relatives,
    icon: "material-symbols:family-restroom-rounded"
  },
  {
    label: 'Pedidos',
    linkTo: PATHS.account.orders,
    icon: "material-symbols:reorder-rounded"
  },

  {
    label: 'Informações de Pagamento',
    linkTo: PATHS.account.payment,
    icon: "ic:round-payment"
  },
  {
    label: 'Definições ',
    linkTo: PATHS.account.settings,
    icon: "material-symbols:settings-outline-rounded"
  },

];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { user, logout } = useAuthContext();
  const router = useRouter();
  const theme = useTheme();

  const { enqueueSnackbar } = useSnackbar();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleLogout = async () => {
    try {
      logout();
      handleClosePopover();
      router.push(PATHS.home)
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  const handleClickItem = (path: string) => {
    router.push(path)
    handleClosePopover();
  };

  return (
    <>
      <IconButtonAnimate disableAnimation disableRipple onClick={handleOpenPopover} sx={{
        "&:hover": {
          bgcolor: "transparent",
        }
      }} >
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "15px", cursor: "pointer" }}>
          <CustomAvatar src={user?.profile_picture} alt={user?.displayName} name={user?.displayName} />
          <Typography variant="h7" sx={{ color: 'text.primary' }} noWrap>{user?.name}</Typography>
          <Iconify icon="ic:baseline-keyboard-arrow-down" width="30px" sx={openPopover ? {ml: "-15px", transform: "rotate(180deg)", transition: "500ms" } : {ml: "-15px", transform: "rotate(0deg)", transition: "500ms" }} />
        </Box>
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: "300px", p: 0 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.displayName}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} sx={{ pt: "12px", width: "100%", display: "flex", flexDirection: "row", gap: "5px", alignItems: "center", justifyContent: "flex-start" }} onClick={() => handleClickItem(option.linkTo)}>
              <Iconify icon={option.icon} color='#637381' />
              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>{option.label}</Typography>
            </MenuItem>
            // <Box href={option.linkTo} key={option.label} sx={{ p: "12px 20px", width: "100%", display: "flex", flexDirection: "row", gap: "5px", alignItems: "center", justifyContent: "flex-start" }}>
            //   <Iconify icon={option.icon} />
            //   <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>{option.label}</Typography>
            // </Box>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Terminar Sessão
        </MenuItem>
      </MenuPopover>
    </>
  );
}