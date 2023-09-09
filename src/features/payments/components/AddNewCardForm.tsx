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
import { useAuthContext } from 'src/contexts';
// axios
import axios from 'src/lib/axios';

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

      await axios.post('/payments/payment-methods', {
        payment_method_token: card_token,
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
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
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
