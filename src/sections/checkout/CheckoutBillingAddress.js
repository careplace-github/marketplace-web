// @mui
import { styled } from '@mui/material/styles';
import { Typography, TextField, Stack, Divider, Card, Box, Grid, CardHeader, CardContent, Button } from '@mui/material';


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(5),
    //paddingLeft: theme.spacing(4),
  },
}));

// ----------------------------------------------------------------------

export default function CheckoutBillingAddress() {
  return (
    <RootStyle>

<Card>
        <CardHeader
          subheader="Mantenha os seus dados atualizados"
          title="Dados de Faturação"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Nome"
                name="firstName"
             //   onChange={handleChange}
                required
             //   value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="NIF"
                name="VATID"
             //   onChange={handleChange}
                required
                type="number"
             //   value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <TextField
                fullWidth
                label="Morada"
                name="address"
              //  onChange={handleChange}
                required
                disabled
              //  value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Localização"
                name="local"
             //   onChange={handleChange}
                disabled
              //  value={values.phone}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
       
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Guardar
          </Button>
        </Box>
      </Card>
      
    </RootStyle>
  );
}

