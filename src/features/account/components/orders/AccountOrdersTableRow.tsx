import { useEffect, useState } from 'react';
// @mui
import {
  Popover,
  Divider,
  TableRow,
  Checkbox,
  MenuItem,
  TableCell,
  IconButton,
  InputBase,
  Stack,
  Avatar,
  Typography,
} from '@mui/material';
//  utils
import { fDate } from 'src/utils/formatTime';
import { fCurrency } from 'src/utils/formatNumber';
import { getRecurrencyText, getScheduleText } from 'src/utils/orderUtils';
// components
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { IOrderProps } from 'src/types/order';
import { IServiceProps } from 'src/types/service';
// hooks
import { useResponsive } from 'src/hooks';
//
import kinshipDegrees from 'src/data/kinshipDegrees';

// ----------------------------------------------------------------------

type Props = {
  row: IOrderProps;
  selected: boolean;
};

const statusOptions = [
  { label: 'Novo', value: 'new' },
  { label: 'Ativo', value: 'active' },
  { label: 'Pagamento Pendente', value: 'payment_pending' },
  { label: 'Concluído', value: 'completed' },
  { label: 'Cancelado', value: 'cancelled' },
];

const getKinshipDegree = (degree) => {
  let kinship = '';
  kinshipDegrees.forEach((item) => {
    if (degree === item.value) {
      kinship = item.label;
    }
  });
  return kinship;
};

export default function AccountOrdersTableRow({ row, selected }: Props) {
  const order = row;

  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  const isMdUp = useResponsive('up', 'md');

  const [statusLabel, setStatusLabel] = useState(
    statusOptions.find((option) => option.value === order?.status)
  );

  useEffect(() => {
    setStatusLabel(statusOptions.find((option) => option.value === order.status));
  }, [order.status]);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const inputStyles = {
    pl: 1,
    '&.Mui-focused': {
      bgcolor: 'action.selected',
    },
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ px: 1 }}>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ width: '100%', flex: !isMdUp ? 1 : undefined }}
          >
            <Stack sx={{ width: isMdUp ? '120px' : '60px', flex: !isMdUp ? 1 : undefined }}>
              <Avatar
                src={order.relative?.profile_picture}
                sx={{
                  width: isMdUp ? 60 : 40,
                  height: isMdUp ? 60 : 40,
                  flexShrink: 0,
                  // bgcolor: 'background.neutral',
                }}
              />
            </Stack>

            <Stack sx={{ p: 2, width: '30%', flex: !isMdUp ? 2 : undefined }}>
              <Typography variant="subtitle2">{order.relative.name}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {getKinshipDegree(order.relative.kinship)}
              </Typography>
            </Stack>
          </Stack>
        </TableCell>

        {false && (
          <TableCell sx={{ px: 1 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {order.caregiver.name}
            </Typography>
          </TableCell>
        )}

        <TableCell>
          {order.services.map((service: IServiceProps) => (
            <Label
              color="primary"
              sx={{
                mr: 1,
                mb: 1,
              }}
            >
              {service.name}{' '}
            </Label>
          ))}
        </TableCell>

        <TableCell sx={{ px: 1 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {getRecurrencyText(order)}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="body2" sx={{ color: 'text.secondary', mr: 10 }}>
            {getScheduleText(order)}
          </Typography>
        </TableCell>

        <TableCell>
          <Label
            color={
              (order.status === 'new' && 'info') ||
              (order.status === 'active' && 'success') ||
              (order.status === 'payment_pending' && 'warning') ||
              (order.status === 'cancelled' && 'error') ||
              (order.status === 'completed' && 'default') ||
              'default'
            }
          >
            {statusLabel?.label}
          </Label>
        </TableCell>

        {false && (
          <TableCell align="right" padding="none">
            <IconButton onClick={handleOpen}>
              <Iconify icon="carbon:overflow-menu-vertical" />
            </IconButton>
          </TableCell>
        )}
      </TableRow>

      {false && (
        <Popover
          open={Boolean(open)}
          anchorEl={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: { p: 1, width: 160 },
          }}
        >
          <MenuItem onClick={handleClose}>
            <Iconify icon="carbon:view" sx={{ mr: 1 }} /> Ver
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <Iconify icon="carbon:edit" sx={{ mr: 1 }} /> Editar
          </MenuItem>

          <Divider sx={{ borderStyle: 'dashed', mt: 0.5 }} />

          <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>
            <Iconify icon="carbon:trash-can" sx={{ mr: 1 }} /> Eliminar
          </MenuItem>
        </Popover>
      )}
    </>
  );
}
