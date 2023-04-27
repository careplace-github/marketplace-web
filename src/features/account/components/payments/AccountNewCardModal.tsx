// react
import { useForm } from 'react-hook-form';
// @mui
import { Box, Stack, Button, Divider, TextField, Typography } from '@mui/material';
import { useRef, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import { LoadingButton } from '@mui/lab';
// next
import { useRouter } from 'next/router';
// yup
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// contexts
import { useAuthContext } from 'src/contexts';
// lib
import { Axios } from 'src/lib';
import { Stripe } from 'src/lib';
// routes
import { PATHS } from 'src/routes/paths';

// ----------------------------------------------------------------------

type NewCardModalProps = {
  open: boolean;
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
};

type FormValuesProps = {
  open: boolean;
  onClose: VoidFunction;

  cardHolder: string;
  cardNumber: number;
  cardExpirationDate: date;
  cardCVV: number;
};

export default function AccountNewCardModal({ open, onClose }: NewCardModalProps) {
  const theme = useTheme();

  const { user } = useAuthContext();
  const { pathname, push } = useRouter();

  const isMdUp = useResponsive('up', 'md');

  const CardSchema = Yup.object().shape({
    cardHolder: Yup.string().required('Nome do titular é obrigatório.'),
    cardNumber: Yup.number('Número do cartão inváçido.').required(
      'Número do cartão é obrigatório.'
    ),
    cardExpirationDate: Yup.date('Data de validade inválida.').required(
      'Data de validade é obrigatória.'
    ),
    cardCVV: Yup.number('CVV inválido.').required('CVV é obrigatório.'),
  });

  const defaultValues = {
    cardHolder: user?.name || undefined,
    cardNumber: undefined,
    cardExpirationDate: undefined,
    cardCVV: undefined,
  };

  const methods = useForm<FormValuesProps>({
    mode: 'onChange',
    resolver: yupResolver(CardSchema),
    defaultValues,
  });

  const {
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting, errors, isDirty },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const cardData = {
        card: {
          number: data.cardNumber,
          exp_month: "03",
          exp_year: "27",
          cvc: data.cardCVV,
        },
        billing_details: {
          name: data.cardHolder,
        },
      };

      console.log(cardData);

      const card_token = (await Axios.post('/payments/tokens/card', 
        {
          card: cardData.card,
          billing_details: cardData.billing_details,
        },
      )).data;

      console.log("TOKEN " + JSON.stringify(card_token, null, 2));

      await Axios.post('/payments/payment-methods', {
        payment_method_token: card_token.id,
      });

      onClose();

      useEffect(() => {
        push(PATHS.account.payments);

      }, [pathname]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          pt: 20,
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
          gap: '10px',
          ...(!isMdUp && {
            height: '100vh',
            width: '100vw',
            borderRadius: '0px',
          }),
        }}
      >
        <Iconify
          icon="mingcute:close-fill"
          color="#919EAB"
          onClick={onClose}
          sx={{
            mr: 0.5,
            alignSelf: 'flex-end',
            mt: -3,
            mb: 1,
            '&:hover': {
              cursor: 'pointer',
              //pointer: 'cursor',
              color: theme.palette.mode === 'light' ? 'grey.400' : 'white',
            },
          }}
        />

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={2} sx={{ pb: 2 }}>
            <RHFTextField
              name="cardHolder"
              label="Nome do Titular"
              placeholder="Nome"
              InputLabelProps={{ shrink: true }}
            />

            <RHFTextField
              name="cardNumber"
              label="Número do Cartão"
              placeholder="XXXX XXXX XXXX XXXX"
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <RHFTextField
              name="cardExpirationDate"
              fullWidth
              label="Validade"
              placeholder="MM/YY"
              InputLabelProps={{ shrink: true }}
            />
            <RHFTextField
              name="cardCVV"
              fullWidth
              label="CVV/CVC"
              placeholder="***"
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ typography: 'caption', color: 'text.disabled', mt: 2 }}
          >
            <Iconify icon="carbon:locked" sx={{ mr: 0.5 }} />
            Transações seguras com encriptação SSL
          </Stack>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{
              mt: 2,
              alignSelf: 'flex-end',
              bgcolor: 'primary.main',
              color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
              '&:hover': {
                bgcolor: 'primary.dark',
                color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
              },
            }}
            variant="contained"
          >
            Guardar
          </LoadingButton>
        </FormProvider>
      </Box>
    </Modal>
  );
}
