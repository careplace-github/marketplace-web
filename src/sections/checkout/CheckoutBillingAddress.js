// @mui
import { styled } from '@mui/material/styles';
import { Typography, TextField, Stack, Divider, Card } from '@mui/material';


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(4),
  },
}));

// ----------------------------------------------------------------------

export default function CheckoutBillingAddress() {
  return (
    <RootStyle>
      
      <Typography variant="h5" sx={{ mb: 5 }}>
        Dados de Faturação
      </Typography>

      <Stack spacing={2.5}>
        <TextField fullWidth label="Person name" />
        <TextField fullWidth label="Phone number" />
        <TextField fullWidth label="Email" />
        <TextField fullWidth label="Address" />
      
      </Stack>
    </RootStyle>
  );
}
