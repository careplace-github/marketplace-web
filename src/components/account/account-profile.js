import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
  } from '@mui/material';
  import { useCallback, useState } from 'react';
  import { useAuthContext } from '../../auth/useAuthContext';
  import { getItem } from '../../auth/utils';
  import {useEffect} from "react";
import axiosInstance from '../../utils/axios';


  const loadUser = {
    avatar: '',
    city: '',
    country: '',
    jobTitle: '',
    name: '',
    timezone: ''
  };

  //const { context } = useAuthContext()
  
  console.log("###############################")
 /* console.log("user:" + JSON.stringify(context))
  console.log("services:" + JSON.stringify(services))
  const [values, setValues] = useState({
   /* firstName: user.name,
    email: user.email,
    phone: user.phone,
    state: user.address,*/
  //});
 

  
  export function AccountProfile (props) {
    const [userAccount, setuserAccount] = useState([]);
    const getuserAccount = useCallback(async () => {
    
        try {
          const response = await axiosInstance.get('api/v1/users/account');
          setuserAccount(response.data);
        } catch (error) {
          console.log(error);
      }
    }, []);

  useEffect(() => {
    getuserAccount();
  }, [getuserAccount]);

  
    return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={loadUser.avatar}
            sx={{
              height: 64,
              mb: 2,
              width: 64
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {loadUser.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {`${loadUser.city} ${loadUser.country}`}
          </Typography>
        {/*  <Typography
            color="textSecondary"
            variant="body2"
          >
            {loadUser.timezone}
          </Typography>*/}
        </Box>
      </CardContent>
      <Divider />
     {/*
     <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Carregar Fotografia
        </Button>
      </CardActions>
      */} 
    </Card>);
  }
  export default AccountProfile