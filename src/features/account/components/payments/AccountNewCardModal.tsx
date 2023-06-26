// form
import { useForm } from 'react-hook-form';
// @mui
import { Box, Stack, Typography } from '@mui/material';
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
import axios from 'src/lib/axios';

// ----------------------------------------------------------------------

type NewCardModalProps = {
  open: boolean;
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
  onAddCard: Function;
};

type FormValuesProps = {
  open: boolean;
  onClose: VoidFunction;
  cardHolder: string;
  cardNumber: string;
  cardExpirationDate: string;
  cardCVV: string;
};

export default function AccountNewCardModal({ open, onClose, onAddCard }: NewCardModalProps) {
  const theme = useTheme();

  const { user } = useAuthContext();

  const isMdUp = useResponsive('up', 'md');

  const CardSchema = Yup.object().shape({
    cardHolder: Yup.string().required('Nome do titular é obrigatório.'),
    cardNumber: Yup.string()
      .required('Número do cartão é obrigatório.')
      .test('cardNumber', 'Insira um número de cartão válido.', (value) => value.length === 19),
    cardExpirationDate: Yup.string().required('Data de validade é obrigatória.'),
    cardCVV: Yup.string().required('CVV é obrigatório.'),
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

    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const close = () => {
    reset();
    onClose({}, 'backdropClick');
  };

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const cardData = {
        card: {
          number: data.cardNumber,
          // first 2 digits of the expiration month
          exp_month: data.cardExpirationDate.substring(0, 2),
          exp_year: data.cardExpirationDate.substring(3, 5),
          cvc: data.cardCVV,
        },
        billing_details: {
          name: data.cardHolder,
        },
      };

      const card_token = (
        await axios.post('/payments/tokens/card', {
          card: cardData.card,
          billing_details: cardData.billing_details,
        })
      ).data;

      await axios.post('/payments/payment-methods', {
        payment_method_token: card_token.id,
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
              // Max 19 characters
              inputProps={{ maxLength: 19 }}
              onChange={(e) => {
                // Only allow 0-9
                // After typing 4 characters, add a space

                const { value } = e.target;
                const onlyNums = value.replace(/[^0-9]/g, '');
                const cardNumber = onlyNums
                  .split('')
                  .reduce((acc, curr, i) => acc + curr + (i % 4 === 3 ? ' ' : ''), '')
                  .trim();

                setValue('cardNumber', cardNumber);
              }}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <RHFTextField
              name="cardExpirationDate"
              fullWidth
              label="Validade"
              placeholder="MM/YY"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => {
                // Only allow 0-9
                // After typing 2 characters, add a slash

                const { value } = e.target;
                const onlyNums = value.replace(/[^0-9]/g, '');
                const month = onlyNums.slice(0, 2);
                const year = onlyNums.slice(2, 4);

                if (onlyNums.length <= 2) {
                  setValue('cardExpirationDate', month);

                  // convert onlyNums to a number
                  // if it's greater than 12, set the value to 12
                  // otherwise, set the value to the onlyNums

                  if (Number(onlyNums) > 12) {
                    setValue('cardExpirationDate', '12');
                  }
                } else {
                  setValue('cardExpirationDate', `${month}/${year}`);
                }
              }}
            />
            <RHFTextField
              name="cardCVV"
              fullWidth
              label="CVV/CVC"
              placeholder="***"
              InputLabelProps={{ shrink: true }}
              inputProps={{ maxLength: 3 }}
              onChange={(e) => {
                const { value } = e.target;
                const onlyNums = value.replace(/[^0-9]/g, '');
                setValue('cardCVV', onlyNums);
              }}
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

          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{
                width: '100%',
                pt: 1.5,
                pb: 1.5,
                mt: 2,
                alignSelf: 'center',
                bgcolor: 'primary.main',
                color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                '&:hover': {
                  bgcolor: 'primary.dark',
                  color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                },
              }}
            >
              Guardar
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Box>
    </Modal>
  );
}
