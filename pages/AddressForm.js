import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/material';

export default function AddressForm() {
  return (
    
    <Box>
      <Typography variant="h6" gutterBottom>
        Morada
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Nome Completo"
            fullWidth
            autoComplete="given-name"
            variant='outlined'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Contacto"
            fullWidth
            autoComplete="912345678"
            variant='outlined'
          />
        </Grid>
        <Grid item xs={12}  sm={6}>
          <TextField
            id="address2"
            name="address2"
            label="Email"
            fullWidth
            autoComplete="@gmail.com"
            variant='outlined'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="Morada"
            fullWidth
            autoComplete="shipping address-level2"
            variant='outlined'
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="state"
            name="state"
            label="Localidade"
            fullWidth
            variant='outlined'
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Código Postal"
            fullWidth
            autoComplete="shipping postal-code"
            variant='outlined'
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Usar esta morada para as informações de pagamento"
          />
        </Grid>
      </Grid>
    </Box>
  );
}