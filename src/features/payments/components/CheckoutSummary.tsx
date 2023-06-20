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

// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

type Props = {
  company: ICompanyProps;
  disabled: boolean;
  subtotal: number;
  isSubmitting: boolean;
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
};

export default function CheckoutSummary({
  handleSubmit,
  company,
  subtotal,
  disabled,
  isSubmitting,
}: Props) {
  const theme = useTheme();
  const { palette } = theme;
  const [discount, setDiscount] = useState<number>();
  const [discountCode, setDiscountCode] = useState<string>('');
  const [showSnackbar, setShowSnackbar] = useState<ISnackbarProps>({
    show: false,
    severity: 'success',
    message: '',
  });

  const handleSubmitDiscount = async () => {
    try {
      // TODO: check discount code that was submitted
      setDiscountCode('');
      setDiscount(10);
      setShowSnackbar({
        show: true,
        severity: 'success',
        message: 'Código promocional aplicado com sucesso.',
      });
    } catch (error) {
      setShowSnackbar({
        show: true,
        severity: 'error',
        message: 'Nºao foi possível aplicar o código introduzido.',
      });
    }
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
            sx={{ borderRadius: 2 }}
          />
          <Stack>
            <TextMaxLine variant="h5" sx={{ mb: 2 }}>
              {company.business_profile.name}
            </TextMaxLine>
            <Stack spacing={0.5} direction="row" alignItems="center">
              <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />
              <Box sx={{ typography: 'h6' }}>{company.rating.average}</Box>
              {company.rating.count && (
                <Link variant="body2" sx={{ color: 'text.secondary' }}>
                  ({company.rating.count} avaliações)
                </Link>
              )}
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
              <Typography sx={{ opacity: 0.72 }}>{company.addresses[0].city}</Typography>
            </Stack>
          </Stack>
        </Box>
        <Divider sx={{ mt: '20px', borderStyle: 'dashed' }} />
        <Stack spacing={2} p={3}>
          <Stack spacing={2}>
            <Row label="Subtotal" value={`${fCurrency(subtotal / 100)} €`} />
            {discount && (
              <Row
                label={`Desconto (${fPercent(discount)})`}
                value={`- ${fCurrency((subtotal / 100) * (discount / 100))} €`}
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

          <Row
            label="Total"
            value={
              discount
                ? `${fCurrency(subtotal / 100 - (subtotal / 100) * (discount / 100))} €`
                : `${fCurrency(subtotal / 100)} €`
            }
            sx={{
              typography: 'h6',
              '& span': { typography: 'h6' },
            }}
          />
        </Stack>

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
            Confirmar Pagamento
          </LoadingButton>
          <Typography variant="caption" sx={{ opacity: 0.72 }}>
            * Assim que efetuar o pagamento seu pedido, irá receber um email com do comprovativo
            associado{' '}
          </Typography>
        </Stack>
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
