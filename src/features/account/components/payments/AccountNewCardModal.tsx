// form
import { useForm } from 'react-hook-form';
// Stripe
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  CardElement,
} from '@stripe/react-stripe-js';
// @mui
import { Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import { LoadingButton } from '@mui/lab';
// yup
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// contexts
import { useSession } from 'next-auth/react';
// lib
import axios from 'src/lib/axios';
import Card from 'src/theme/overrides/Card';
import { useState } from 'react';
// styles
import styles from './AccountNewCardModal.module.css';

// ----------------------------------------------------------------------

type NewCardModalProps = {
  open: boolean;
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
  onAddCard: Function;
};

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#000',
      fontSize: '16px',
      '::placeholder': {
        color: '#000',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
    placeholder: {
      cardNumber: 'Número do cartão',
    },
  },

  hidePostalCode: true,
};

export default function AccountNewCardModal({ open, onClose, onAddCard }: NewCardModalProps) {
  const theme = useTheme();

  const { data: user } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const isMdUp = useResponsive('up', 'md');

  const stripe = useStripe();
  const elements = useElements();

  const close = () => {
    onClose({}, 'backdropClick');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      setIsLoading(true);

      if (!stripe || !elements) {
        // Stripe has not yet loaded.
        setIsLoading(false);
        return;
      }

      const cardElement = elements.getElement(CardNumberElement);

      if (!cardElement) {
        setIsLoading(false);
        return;
      }

      // create token
      const { token, error } = await stripe.createToken(cardElement);

      if (error) {
        // Handle error, perhaps show it to the user
        console.error('Error creating card token: ', error);
        setIsLoading(false);
      }

      const card_token = token?.id;

      await axios.post('/payments/payment-methods', {
        payment_method_token: card_token,
      });
      onAddCard('success');
      close();
    } catch (error) {
      onAddCard('error');
      console.error(error);
    }
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
            top: isMdUp ? '50px' : '72px',
            right: isMdUp ? '50px' : '45px',
            cursor: 'pointer',
            '&:hover': {
              cursor: 'pointer',
              color: theme.palette.mode === 'light' ? 'grey.400' : 'white',
            },
          }}
          onClick={() => {
            close();
          }}
        />

        <Typography variant="h5" sx={{ mb: 3, width: '100%', alignText: 'left' }}>
          Adicionar Cartão
        </Typography>

        <form
          onSubmit={handleSubmit}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          {/**
           * <CardElement options={CARD_ELEMENT_OPTIONS}/>
           */}
          <div className={styles.cardElement__container}>
            <p className={styles.cardElement__label}>Número do Cartão</p>
            <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
          </div>
          <div className={styles.cardElement__container}>
            <p className={styles.cardElement__label}>Validade</p>
            <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
          </div>
          <div className={styles.cardElement__container}>
            <p className={styles.cardElement__label}>CVV/CVC</p>
            <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
          </div>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 3, width: '100%' }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
              sx={{ width: '100%' }}
            >
              Adicionar
            </LoadingButton>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
