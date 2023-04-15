 
// @mui
import {
  Stack,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
// _mock
import { _socials } from 'src/_mock';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ComingSoonView() {

  return (
    <>
      <Typography variant="h3" paragraph>
        Coming Soon!
      </Typography>

      <Typography sx={{ color: 'text.secondary' }}>
        We are currently working hard on this page!
      </Typography>

      <Image
        alt="comingsoon"
        src="/assets/illustrations/illustration_comingsoon.svg"
        sx={{
          my: 3,
          mx: 'auto',
          maxWidth: 320,
        }}
      />

     

      <TextField
        fullWidth
        hiddenLabel
        placeholder="Enter your email"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button variant="contained" size="large" color="inherit">
                Notify
              </Button>
            </InputAdornment>
          ),
          sx: { pr: 0.5 },
        }}
        sx={{ my: 5 }}
      />

      <Stack direction="row" justifyContent="center">
        {_socials.map((social) => (
          <IconButton key={social.value}>
            <Iconify icon={social.icon} sx={{ color: social.color }} />
          </IconButton>
        ))}
      </Stack>
    </>
  );
}

