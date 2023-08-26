import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PATHS } from 'src/routes';
// @mui
import { TableRow, TableCell, Stack, Avatar, Typography } from '@mui/material';
//  utils
import { getRecurrencyText, getScheduleText } from 'src/utils/orderUtils';
// components
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
  { label: 'Pagamento Pendente', value: 'pending_payment' },
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
  const router = useRouter();

  const isMdUp = useResponsive('up', 'md');

  const [statusLabel, setStatusLabel] = useState(
    statusOptions.find((option) => option.value === order?.status)
  );

  useEffect(() => {
    setStatusLabel(statusOptions.find((option) => option.value === order.status));
  }, [order.status]);

  const handleViewClick = (orderSelected) => {
    // redirect to view order page
    router.push(PATHS.orders.view(order._id));
  };

  console.log('status', order.status);

  return (
    <TableRow
      hover
      selected={selected}
      sx={{ cursor: order?.status !== 'cancelled' ? 'pointer' : 'not-allowed' }}
      onClick={() => {
        if (order?.status !== 'cancelled') handleViewClick(order);
      }}
    >
      <TableCell sx={{ px: 1 }}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ width: '100%', flex: !isMdUp ? 1 : undefined }}
        >
          <Stack sx={{ width: isMdUp ? '90px' : '60px', flex: !isMdUp ? 1 : undefined }}>
            <Avatar
              src={order.patient?.profile_picture}
              sx={{
                width: isMdUp ? 60 : 40,
                height: isMdUp ? 60 : 40,
                flexShrink: 0,
                // bgcolor: 'background.neutral',
              }}
            />
          </Stack>

          <Stack sx={{ p: 2, width: '100%', flex: !isMdUp ? 2 : undefined }}>
            <Typography variant="subtitle2">{order.patient?.name}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {getKinshipDegree(order.patient?.kinship)}
            </Typography>
          </Stack>
        </Stack>
      </TableCell>

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
            (order.status === 'pending_payment' && 'warning') ||
            (order.status === 'cancelled' && 'error') ||
            (order.status === 'completed' && 'default') ||
            'default'
          }
        >
          {statusLabel?.label}
        </Label>
      </TableCell>
    </TableRow>
  );
}
