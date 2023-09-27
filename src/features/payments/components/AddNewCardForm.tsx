// React
import React, { useEffect, useState } from 'react';
// Form
import { useForm } from 'react-hook-form';
// stripe
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  CardElement,
} from '@stripe/react-stripe-js';

// components
import { Box, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify/Iconify';
// yup
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// auth
import { useSession } from 'next-auth/react';
// lib
import fetch from 'src/lib/fetch';
// styles
import styles from './AddNewCardForm.module.css';

type Props = {
  onAddCard: (result: 'success' | 'error') => void;
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
  },

  hidePostalCode: true,
};

function AddNewCardForm({ onAddCard }: Props) {
  const theme = useTheme();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { data: user } = useSession();
  const CardSchema = Yup.object().shape({
    cardHolder: Yup.string().required('Nome do titular é obrigatório.'),
    cardNumber: Yup.string()
      .required('Número do cartão é obrigatório.')
      .test('cardNumber', 'Insira um número de cartão válido.', (value) => value.length === 19),
    cardExpirationDate: Yup.string().required('Data de validade é obrigatória.'),
    cardCVV: Yup.string().required('CVV é obrigatório.'),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      setIsLoading(true);

      if (!stripe || !elements) {
        // Stripe has not yet loaded.
        console.log('Stripe has not yet loaded.');
        setIsLoading(false);
        return;
      }

      const cardNumber = elements.getElement(CardNumberElement);
      const cardExpiry = elements.getElement(CardExpiryElement);
      const cardCvc = elements.getElement(CardCvcElement);

      const cardElement = elements.getElement(CardNumberElement);

      if (!cardElement) {
        console.log('cardElement is null');
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

      await fetch(`/api/payments/payment-methods`, {
        method: 'POST',
        body: JSON.stringify({ payment_method_token: card_token }),
      });

      onAddCard('success');
    } catch (error) {
      onAddCard('error');
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        outline: 'none',
        width: '100%',
        height: 'auto',
        bgcolor: 'white',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        mt: '20px',
        gap: '10px',
        '& > form': {
          width: '100%',
        },
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
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
  );
}

export default AddNewCardForm;
