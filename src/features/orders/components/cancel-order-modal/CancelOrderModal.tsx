import React, { useState } from 'react';
// components
import { Modal, Box, Typography, TextField, Stack, Button, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from 'src/components/iconify/Iconify';
import { useResponsive } from 'src/hooks';
// routes
import { useRouter } from 'next/router';
import { PATHS } from 'src/routes';
// axios
import axios from 'src/lib/axios';

type Props = {
  onClose: () => void;
  open: boolean;
  orderId: string;
};

function CancelOrderModal({ onClose, open, orderId }: Props) {
  const isMdUp = useResponsive('up', 'md');
  const router = useRouter();
  const [checkboxSelected, setCheckboxSelected] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [cancelationReason, setCancelationReason] = useState<string>('');

  const onCancelOrder = async (message: string) => {
    setIsSubmitting(true);
    try {
      await fetch(`/api/orders/${orderId}/cancel`, {
        method: 'POST',
        body: JSON.stringify({ cancellation_reason: message }),
      });

      router.push(PATHS.account.orders);
    } catch (error) {
      console.error('error cancelling order', error);
    }
    setIsSubmitting(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          mx: 'auto',
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
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '50px',
          pt: isMdUp ? '50px' : '75px',
          gap: '10px',
          ...(!isMdUp && {
            height: '100vh',
            width: '100vw',
            borderRadius: '0px',
          }),
        }}
      >
        <Iconify
          width={30}
          height={30}
          icon="material-symbols:close-rounded"
          sx={{
            position: 'absolute',
            top: isMdUp ? '30px' : '72px',
            right: isMdUp ? '30px' : '45px',
            cursor: 'pointer',
            '&:hover': {
              cursor: 'pointer',
              color: 'grey.400',
            },
          }}
          onClick={() => {
            onClose();
          }}
        />
        <Typography variant="h5" sx={{ mb: 3, width: '100%', alignText: 'left' }}>
          Cancelar Pedido
        </Typography>
        <Typography sx={{ alignText: 'left', fontSize: '14px' }}>
          Tem a certeza que pretende <b>cancelar</b> este pedido? Esta ação é <b>irreversível</b> e
          fará com que perca a prestação dos serviços associados a este pedido.
        </Typography>

        <TextField
          onChange={(e) => {
            setCancelationReason(e.target.value);
          }}
          multiline
          minRows={5}
          sx={{ width: '100%', mt: '10px' }}
          label="Motivo de cancelamento"
        />

        <Stack
          direction="row"
          width="100%"
          alignItems="flex-start"
          justifyContent="flex-start"
          mt="10px"
        >
          <Checkbox
            disableRipple
            size="small"
            checked={checkboxSelected}
            sx={{
              '& > input': {
                width: '20px',
                height: '20px',
              },
              padding: 0,
              pr: '5px',
            }}
            onClick={() => setCheckboxSelected((prev) => !prev)}
          />
          <Typography sx={{ alignText: 'left', fontSize: '12px', color: 'text.secondary' }}>
            Confirmo que pretendo cancelar este pedido e tenho conhecimento das suas consequências.
          </Typography>
        </Stack>

        <LoadingButton
          variant="contained"
          loading={isSubmitting}
          onClick={() => {
            onCancelOrder(cancelationReason);
          }}
          disabled={!checkboxSelected || cancelationReason.length < 25}
          sx={{
            width: '100%',
            mt: '40px',
            height: '50px',
            bgcolor: 'rgb(238, 75, 43)',
            color: 'common.white',
            '&:hover': {
              bgcolor: 'rgb(238, 75, 43,0.8)',
            },
          }}
        >
          Confirmar
        </LoadingButton>
      </Box>
    </Modal>
  );
}

export default CancelOrderModal;
