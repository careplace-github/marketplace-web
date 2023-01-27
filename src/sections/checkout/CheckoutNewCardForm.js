import PropTypes from 'prop-types';
// icons
import informationIcon from '@iconify/icons-carbon/information';
// @mui
import { Stack, Button, Tooltip, TextField, InputAdornment } from '@mui/material';
// components
import { Iconify } from '../../components';

// ----------------------------------------------------------------------

CheckoutNewCardForm.propTypes = {
  onCancel: PropTypes.func,
};

export default function CheckoutNewCardForm({ onCancel }) {
  return (
    <Stack spacing={2} sx={{ py: 3 }}>
      <TextField fullWidth size="small" label="Nome no cartão" />

      <TextField fullWidth size="small" label="Número do Cartão" />

      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
        <TextField size="small" label="mm/aa" />
        <TextField
          size="small"
          label="CVV"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip
                  title="Insira os 3 últimos digitos do seu cartão aqui"
                  placement="top"
                  arrow
                >
                  <div>
                    <Iconify icon={informationIcon} sx={{ mt: 0.75, width: 20, height: 20 }} />
                  </div>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" spacing={2}>
        <Button fullWidth color="inherit" variant="contained" onClick={onCancel}>
          Cancel
        </Button>

        <Button fullWidth variant="contained">
          Create
        </Button>
      </Stack>
    </Stack>
  );
}
