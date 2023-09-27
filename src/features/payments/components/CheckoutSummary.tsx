// @mui
import { LoadingButton } from '@mui/lab';
import {
  Card,
  Stack,
  Divider,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Box,
  Link,
  StackProps,
  Snackbar,
  Alert,
} from '@mui/material';
// utils
import { fCurrency, fPercent } from 'src/utils/formatNumber';
// hooks
import { useState, MouseEventHandler } from 'react';
import { useTheme } from '@mui/material/styles';
// types
import { ICompanyProps } from 'src/types/company';
import { ISnackbarProps } from 'src/types/snackbar';
// lib
import fetch from 'src/lib/fetch';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

type Props = {
  company: ICompanyProps;
  orderStatus?: string;
  disabled?: boolean;
  subtotal: number;
  isSubmitting?: boolean;
  handleSubmit?: MouseEventHandler<HTMLButtonElement>;
  onDiscountApplied: Function;
  isOrderView?: boolean;
  hasSubsciptionId?: boolean;
};

export default function CheckoutSummary({
  handleSubmit,
  company,
  orderStatus,
  subtotal,
  disabled,
  isSubmitting,
  onDiscountApplied,
  isOrderView,
  hasSubsciptionId,
}: Props) {
  const theme = useTheme();
  const { palette } = theme;
  const [discount, setDiscount] = useState<{ type: 'percentage' | 'amount'; value: number }>();
  const [discountCode, setDiscountCode] = useState<string>('');
  const [showSnackbar, setShowSnackbar] = useState<ISnackbarProps>({
    show: false,
    severity: 'success',
    message: '',
  });

  let totalValueWithDiscount;

  if (discount?.type === 'percentage' && discount.value) {
    totalValueWithDiscount = `${fCurrency(subtotal - subtotal * discount.value)} €`;
  } else if (discount?.value) {
    totalValueWithDiscount = `${fCurrency(subtotal - discount.value)} €`;
  } else {
    totalValueWithDiscount = subtotal;
  }
  const handleSubmitDiscount = async () => {
    try {
      // TODO: check discount code that was submitted

      const response = await fetch('/api/payments/promotion-code/eligibility', {
        method: 'POST',
        body: JSON.stringify({ promotion_code: discountCode }),
      });

      if (response.data.coupon.ammount_off) {
        setDiscount({ type: 'amount', value: response.data.coupon.ammount_off });
      }
      if (response.data.coupon.percent_off) {
        setDiscount({ type: 'percentage', value: response.data.coupon.percent_off });
      }
      onDiscountApplied(discountCode);
      setShowSnackbar({
        show: true,
        severity: 'success',
        message: 'Código promocional aplicado com sucesso.',
      });
    } catch (error) {
      setShowSnackbar({
        show: true,
        severity: 'error',
        message: 'Não foi possível aplicar o código introduzido.',
      });
    }
    setDiscountCode('');
  };

  return (
    <>
      <Snackbar
        open={showSnackbar.show}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() =>
          setShowSnackbar({
            show: false,
            severity: 'success',
            message: '',
          })
        }
      >
        <Alert
          onClose={() =>
            setShowSnackbar({
              show: false,
              severity: 'success',
              message: '',
            })
          }
          severity={showSnackbar.severity}
          sx={{ width: '100%' }}
        >
          {showSnackbar.message}
        </Alert>
      </Snackbar>
      <Card>
        <Box
          sx={{
            p: 4,
            pb: 0,
            gap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(1, 1fr)',
              lg: 'repeat(2, 1fr)',
            },
          }}
        >
          <Image
            alt={company.business_profile.name}
            src={company.business_profile.logo}
            ratio="1/1"
            sx={{
              borderRadius: 2,
              backgroundColor: 'white',
              width: '100%',
              height: 'auto',
              '& > span > img': {
                width: '100%',
                height: 'auto',
              },
            }}
          />
          <Stack>
            <TextMaxLine variant="h5" sx={{ mb: 2 }}>
              {company.business_profile.name}
            </TextMaxLine>
            <Stack spacing={0.5} direction="row" alignItems="center">
              <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />
              <Box sx={{ typography: 'h6' }}>{company.rating.average.toFixed(1)}</Box>
              <Link variant="body2" sx={{ color: 'text.secondary' }}>
                {`(${company.rating.count === 0 ? 'sem' : company.rating.count} ${
                  (company?.rating?.count && company.rating.count > 1) || company.rating.count === 0
                    ? 'avaliações'
                    : 'avaliação'
                })`}
              </Link>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              gap="5px"
              sx={{ mt: '5px' }}
            >
              <Iconify
                width={20}
                icon="carbon:location"
                sx={{
                  color: 'text.disabled',
                }}
              />
              <Typography sx={{ opacity: 0.72 }}>
                {company.business_profile.address.city}
              </Typography>
            </Stack>
          </Stack>
        </Box>
        {(!isOrderView || orderStatus !== 'new') && (
          <Divider sx={{ mt: '20px', borderStyle: 'dashed' }} />
        )}
        <Stack spacing={2} p={3}>
          {(!isOrderView || orderStatus !== 'new') && (
            <>
              <Stack spacing={2}>
                <Row label="Subtotal" value={`${fCurrency(subtotal)} €`} />
                {discount?.value && (
                  <Row
                    label={
                      discount?.type === 'percentage'
                        ? `Desconto (${fPercent(discount?.value)})`
                        : 'Desconto'
                    }
                    value={
                      discount.type === 'percentage'
                        ? `- ${fCurrency(subtotal * discount.value)} €`
                        : `- ${fCurrency(discount.value)} €`
                    }
                  />
                )}
              </Stack>
              <TextField
                hiddenLabel
                value={discountCode}
                placeholder="Código promocional"
                sx={{ width: '100%' }}
                onChange={(e) => {
                  setDiscountCode(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button disabled={!discountCode} onClick={handleSubmitDiscount}>
                        Aplicar
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
              <Divider sx={{ borderStyle: 'dashed' }} />
            </>
          )}
          {(!isOrderView || orderStatus !== 'new') && (
            <Row
              label="Total"
              value={discount?.value ? totalValueWithDiscount : `${fCurrency(subtotal)} €`}
              sx={{
                typography: 'h6',
                '& span': { typography: 'h6' },
              }}
            />
          )}
        </Stack>

        {(!isOrderView || orderStatus !== 'new') && (
          <Stack spacing={3} sx={{ p: 3, pt: 0 }}>
            <LoadingButton
              disabled={disabled}
              size="large"
              variant="contained"
              color="inherit"
              onClick={handleSubmit}
              loading={isSubmitting}
              sx={{
                px: 4,
                bgcolor: 'primary.main',
                color: palette.mode === 'light' ? 'common.white' : 'grey.800',
                '&:hover': {
                  bgcolor: 'primary.dark',
                  color: palette.mode === 'light' ? 'common.white' : 'grey.800',
                },
              }}
            >
              {orderStatus === 'pending_payment' && !hasSubsciptionId
                ? 'Confirmar Pagamento'
                : 'Atualizar Pagamento'}
            </LoadingButton>
            <Typography variant="caption" sx={{ opacity: 0.72 }}>
              * Assim que efetuar o pagamento do seu pedido, irá receber um email com o comprovativo
              associado{' '}
            </Typography>
          </Stack>
        )}
      </Card>
    </>
  );
}

// ----------------------------------------------------------------------

type RowProps = StackProps & {
  label: string;
  value: string;
};

function Row({ label, value, sx, ...other }: RowProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ typography: 'subtitle2', ...sx }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'body2' }}>
        {label}
      </Box>
      {value}
    </Stack>
  );
}
