import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Stack, Divider, Popover, MenuItem, Typography, IconButton } from '@mui/material';
import Modal from '@mui/material/Modal';
// next
import { useRouter } from 'next/router';
// contexts
import { useAuthContext } from 'src/contexts';
// components
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
//lib
import axios from 'src/lib/axios';
// routes
import { PATHS } from 'src/routes/paths';

// ----------------------------------------------------------------------

type Props = {
  card: {
    value: string;
    label: string;
    cardNumber: string;
    cardHolder: string;
    isPrimary: boolean;
    expirationDate: string;
  };
};

export default function AccountPaymentCard({ card }: Props) {
  const { user } = useAuthContext();
  const { pathname, push } = useRouter();

  const value = card.card.brand;
  // First character should be uppercase
  const label = value.charAt(0).toUpperCase() + value.slice(1);
  const cardNumber = card.card.last4;
  const cardHolder = card.billing_details.name || user?.name;
  const expirationDate = card.card.exp_month + '/' + card.card.exp_year;

  const isPrimary = card.id === user?.stripe_information?.default_payment_method;
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleDelete = async () => {
   
    await axios.delete(`/users/payment-methods/${card.id}`);

    useEffect(() => {
      push(PATHS.account.payments);

    }, [pathname]);
  };

  const handleSetPrimary = () => {};

  return (
    <>
      <Stack
        spacing={3}
        sx={{
          p: 3,
          pr: 1,
          borderRadius: 2,
          boxShadow:
            'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
          border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
        }}
      >
        <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle1' }}>
          <Stack direction="row" alignItems="center" flexGrow={1}>
            <Box component="span">{label}</Box>

            {isPrimary && (
              <Label color="info" startIcon={<Iconify icon="carbon:star-filled" />} sx={{ ml: 1 }}>
                Principal
              </Label>
            )}
          </Stack>

          <Iconify
            icon={
              (value === 'visa' && 'logos:visa') ||
              (value === 'mastercard' && 'logos:mastercard') ||
              'logos:paypal'
            }
            width={24}
          />

          <IconButton onClick={handleOpen}>
            <Iconify icon="carbon:overflow-menu-vertical" />
          </IconButton>
        </Stack>

        <Stack spacing={1} direction="row" alignItems="center">
          <Typography variant="h6">**** **** **** {cardNumber}</Typography>
        </Stack>

        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)">
          <Stack spacing={0.5}>
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              Titular
            </Typography>
            <Typography variant="subtitle2"> {cardHolder} </Typography>
          </Stack>
          <Stack spacing={0.5}>
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              Expiração
            </Typography>
            <Typography variant="subtitle2"> {expirationDate} </Typography>
          </Stack>
        </Box>
      </Stack>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { p: 1 },
        }}
      >
        <MenuItem disabled={isPrimary} onClick={handleClose}>
          <Iconify icon="carbon:star-filled" sx={{ mr: 1 }} /> Definir como principal
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed', mt: 0.5 }} />

        <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>
          <span onClick={handleDelete}>
            <Iconify icon="carbon:trash-can" sx={{ mr: 1 }} /> Eliminar
          </span>
        </MenuItem>
      </Popover>
    </>
  );
}
