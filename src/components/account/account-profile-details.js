import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import { useAuthContext } from '../../auth/useAuthContext';



export const AccountProfileDetails = (props) => {
  
 // const { context } = useAuthContext()
 let user = useAuthContext()
  console.log("user:" + JSON.stringify(user.user, null, 2))
  const userInfo = user.user
  
    const [values, setValues] = useState({
      name: userInfo && userInfo['name'] ? userInfo['name'] : '',
      email: userInfo && userInfo['email'] ? userInfo['email'] : '',
      phone: userInfo && userInfo['phone'] ? userInfo['phone'] :'',
      state: userInfo && userInfo['address'] ? userInfo['address']['street'] : '',
    });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="Esta informação pode ser editada"
          title="Perfil"
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
                name="name"
                onChange={handleChange}
                required
                value={values.name}
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
                label="Morada"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
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
                label="Email"
                name="email"
                onChange={handleChange}
                required
                disabled
                value={values.email}
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
                label="Número de telefone"
                name="phone"
                onChange={handleChange}
                disabled
                value={values.phone}
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
    </form>
  );
};

export default AccountProfileDetails