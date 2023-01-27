// @mui
import { styled } from '@mui/material/styles';
import { Button, Stack, Typography, InputAdornment, FilledInput } from '@mui/material';
// layouts
import Layout from '../src/layouts';
// hooks
import useCountdown from '../src/hooks/useCountdown';
// components
import { Page, Image, SocialsButton } from '../src/components';
import { Router } from 'next/router';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: theme.spacing(15, 2.5),
  [theme.breakpoints.up('sm')]: {
    height: '100vh',
  },
}));

const CountdownStyle = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

const SeparatorStyle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  [theme.breakpoints.up('sm')]: {
    margin: theme.spacing(0, 2.5),
  },
}));

// ----------------------------------------------------------------------

export default function ComingSoonPage() {
  const countdown = useCountdown(new Date('02/01/2023 12:30'));

  return (
    <Page title="Coming Soon">
      <RootStyle>
        <Stack alignItems="center" sx={{ maxWidth: 280 }}>
          <Typography variant="h3" paragraph>
            Estamos a chegar!
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Prometemos ser breves!
          </Typography>

          <Image
            alt="comingsoon"
            src="https://zone-assets-api.vercel.app/assets/illustrations/illustration_comingsoon.svg"
            sx={{ my: 3, maxWidth: 320 }}
          />

          <CountdownStyle>
            {TimeBox(countdown.days, 'Days')}
            <SeparatorStyle variant="h2">:</SeparatorStyle>
            {TimeBox(countdown.hours, 'Hours')}
            <SeparatorStyle variant="h2">:</SeparatorStyle>
            {TimeBox(countdown.minutes, 'Minutes')}
            <SeparatorStyle variant="h2">:</SeparatorStyle>
            {TimeBox(countdown.seconds, 'Seconds')}
          </CountdownStyle>

          <FilledInput
            fullWidth
            placeholder="Email"
            endAdornment={
              <InputAdornment position="end">
                <Button variant="contained" size="large">
                  Notificar
                </Button>
              </InputAdornment>
            }
            sx={{
              pr: 0.5,
              my: 5,
              '& .MuiFilledInput-input': { py: '18px' },
            }}
          />

          <Stack alignItems="center">
            <SocialsButton initialColor />
          </Stack>
        </Stack>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

ComingSoonPage.getLayout = function getLayout(page) {
  return (
    <Layout simpleHeader disabledFooter>
      {page}
    </Layout>
  );
};

// ----------------------------------------------------------------------

function TimeBox(type, label) {
  return (
    <div>
      <Typography variant="h2">{type}</Typography>
      <Typography sx={{ color: 'text.secondary' }}>{label}</Typography>
    </div>
  );
}
