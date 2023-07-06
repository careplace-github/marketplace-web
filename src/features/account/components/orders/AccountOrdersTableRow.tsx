import { useEffect, useState } from 'react';
// @mui
import {
  Popover,
  Divider,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Stack,
  Avatar,
  Typography,
} from '@mui/material';
//  utils
import { getRecurrencyText, getScheduleText } from 'src/utils/orderUtils';

// components
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { IOrderProps } from 'src/types/order';
import { IServiceProps } from 'src/types/utils';
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
  { label: 'Aguarda Visita', value: 'accepted' },
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
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

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

  const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = (orderSelected) => {
    setAnchorEl(null);
    // redirect to edit order page
  };

  const handleViewClick = (orderSelected) => {
    setAnchorEl(null);
    // redirect to view order page
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
            <Stack sx={{ width: isMdUp ? '90px' : '60px', flex: !isMdUp ? 1 : undefined }}>
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

            <Stack sx={{ p: 2, width: '100%', flex: !isMdUp ? 2 : undefined }}>
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
          <Typography variant="body2" sx={{ color: 'text.secondary', width: '230px', mr: 10 }}>
            {getScheduleText(order)}
          </Typography>
        </TableCell>

        <TableCell>
          <Label
            color={
              (order.status === 'new' && 'info') ||
              (order.status === 'accepted' && 'info') ||
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

        <TableCell align="center" padding="none">
          <IconButton
            sx={{
              width: '40px',
              height: '40px',
              p: 0,
              '&.MuiButtonBase-root': {
                justifyContent: !isMdUp ? 'flex-end' : undefined,
              },
            }}
            onClick={handleMoreClick}
          >
            <Iconify icon="material-symbols:more-vert" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleMoreClose}
        anchorOrigin={{
          vertical: isMdUp ? 'top' : 'bottom',
          horizontal: 'right',
        }}
      >
        <Stack sx={{ alignItems: 'flex-start' }}>
          <MenuItem onClick={() => handleViewClick(order)}>
            <IconButton
              // disableanimation="true"
              disableRipple
              sx={{
                width: '120px',
                height: '40px',
                flexDirection: 'row',
                gap: '8px',
                justifyContent: 'flex-start',
              }}
            >
              <Iconify icon="mi:eye" color="primary.main" width="20px" />
              <Typography sx={{ color: 'primary.main' }}>Ver</Typography>
            </IconButton>
          </MenuItem>
          <MenuItem onClick={() => handleEditClick(order)}>
            <IconButton
              // disableanimation="true"
              disableRipple
              sx={{
                width: '120px',
                height: '40px',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                gap: '8px',
              }}
            >
              <Iconify icon="material-symbols:edit" />
              <Typography>Editar</Typography>
            </IconButton>
          </MenuItem>
        </Stack>
      </Popover>
    </>
  );
}
