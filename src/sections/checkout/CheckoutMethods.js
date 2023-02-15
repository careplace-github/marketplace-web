import { useState } from 'react';
// icons
import addIcon from '@iconify/icons-carbon/add';
import checkmarkOutline from '@iconify/icons-carbon/checkmark-outline';
// @mui
import { styled } from '@mui/material/styles';
import {
  Stack,
  Paper,
  Radio,
  Button,
  Divider,
  Collapse,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
// _data
import { _paymentMethods } from '../../../_data/mock';
// components
import { Image, Iconify } from '../../components';
//
import CheckoutNewCardForm from './CheckoutNewCardForm';
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const CARD_OPTIONS = [
  {
    value: 'visa1',
    label: '**** **** **** 1212 - Jimmy Holland',
  },
  {
    value: 'visa2',
    label: '**** **** **** 2424 - Shawn Stokes',
  },
  {
    value: 'mastercard',
    label: '**** **** **** 4545 - Cole Armstrong',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
}));

const OptionStyle = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'hasChildren' && prop !== 'selected',
})(({ hasChildren, selected, theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2),
  transition: theme.transitions.create('box-shadow'),
  border: `solid 1px ${theme.palette.divider}`,
  borderRadius: Number(theme.shape.borderRadius) * 1.25,
  ...(hasChildren && {
    flexWrap: 'wrap',
  }),
  ...(selected && {
    boxShadow: theme.customShadows.z24,
  }),
}));

// ----------------------------------------------------------------------

export default function CheckoutMethods() {
  const [show, setShow] = useState(false);
  const [method, setMethod] = useState('paypal');

  const onLoadPaymentMethods = async () => {
    try {
      const response = await axios.get('/api/v1/users/payment-methods');
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  const newPaymentMethods = async () => {
    let payment_method_id = '' 
    try {
      const response = await axios.post('/api/v1/users/payment-methods', payment_method_id);
      const data = response.data;
      console.log("New payment method created " + data);
    } catch (error) {
      console.error(error);
    }
  }

  const deletePaymentMethod = async () => {
    let payment_method_id = '' 
    try {
      const response = await axios.delete('/api/v1/users/payment-methods', payment_method_id);
      const data = response.data;
      console.log("New payment method created " + data);
    } catch (error) {
      console.error(error);
    }
  }


  const handleCollapseIn = () => {
    if (method !== 'paypal') {
      setShow(!show);
    }
  };

  const handleCollapseOut = () => {
    setShow(false);
  };

  const handleChangeMethod = (event) => {
    if (method === 'paypal') {
      setShow(false);
    }
    setMethod(event.target.value);
  };
  const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(5),
    //  paddingLeft: theme.spacing(4),
    },
  }));

  return (
    <RootStyle>
      <Typography variant="h5" sx={{ mb: 5 }}>
        Métodos de Pagamento
      </Typography>

      <RadioGroup value={method} onChange={handleChangeMethod}>
        <Stack spacing={2.5}>
          {_paymentMethods.map((option) => {
            const { value, label, icons } = option;
            const hasChildren = value === 'credit_card';
            const isSelected = method === value;

            return (
              <OptionStyle key={label} hasChildren={hasChildren} selected={isSelected}>
                <FormControlLabel
                  value={value}
                  control={<Radio checkedIcon={<Iconify icon={checkmarkOutline} />} />}
                  label={<Typography variant="body2">{label}</Typography>}
                  sx={{ py: 3, mx: 0 }}
                />

                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ position: 'absolute', top: 32, right: 16 }}
                >
                  {icons.map((icon) => (
                    <Image key={icon} alt="logo card" src={icon} sx={{ height: 24 }} />
                  ))}
                </Stack>

                {isSelected && hasChildren && (
                  <>
                    <TextField select fullWidth label="Cartão" SelectProps={{ native: true }}>
                      {CARD_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>

                    <Stack alignItems="flex-start" sx={{ width: 1 }}>
                      <Divider sx={{ my: 3, width: 1, borderStyle: 'dashed' }} />

                      {show ? (
                        <Typography variant="h6">Novo Cartão</Typography>
                      ) : (
                        <Button
                          startIcon={<Iconify icon={addIcon} sx={{ width: 20, height: 20 }} />}
                          onClick={handleCollapseIn}
                          sx={{ mb: 3 }}
                        >
                          Adicionar Novo Cartão
                        </Button>
                      )}
                    </Stack>

                    <Collapse in={show} sx={{ width: 1 }}>
                      <CheckoutNewCardForm onCancel={handleCollapseOut} />
                    </Collapse>
                  </>
                )}
              </OptionStyle>
            );
          })}
        </Stack>
      </RadioGroup>
    </RootStyle>
  );
}
