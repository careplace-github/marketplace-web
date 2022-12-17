// icons
import playIcon from '@iconify/icons-carbon/play';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Grid, Stack, Container, Typography, Button, Box } from '@mui/material';
// components
import { Iconify, Image } from '../../../components';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
  },
}));

// ----------------------------------------------------------------------

export default function LandingPage1stSection() {
  return (
    <RootStyle>
      <Container>
        <Grid container columnSpacing={10} justifyContent="space-between" alignItems="center">
          <Grid item xs={12} md={6} lg={5} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Stack spacing={3}>
              <Typography variant="overline" sx={{ color: 'primary.main' }}>
                Bem-vindo à
              </Typography>

              <Typography variant="h1">Careplace</Typography>

              <Typography sx={{ color: 'text.secondary' }}>
                Porque encontrar alguém de confiança para tratar dos seus familiares não é tarefa, 
                queremos ajudá-lo a encontrar <b>um serviço de apoio ao domicílo à sua medida</b>.
              </Typography>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent={{ xs: 'center', md: 'unset' }}
                spacing={3}
              >
                <Button variant="contained" size="large">
                  Experimente já
                </Button>

                <Button
                  disableRipple
                  color="inherit"
                  size="large"
                  startIcon={
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: (theme) => `solid 2px ${alpha(theme.palette.primary.main, 0.24)}`,
                      }}
                    >
                      <Iconify
                        icon={playIcon}
                        sx={{ width: 24, height: 24, color: 'primary.main' }}
                      />
                    </Box>
                  }
                  sx={{
                    px: 0,
                    '&:hover': { bgcolor: 'transparent' },
                  }}
                >
                  Veja como funciona
                </Button>
              </Stack>
            </Stack>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            lg={7}
            sx={{
              display: { xs: 'none', md: 'block' },
            }}
          >
            <Image
              alt="cuidamos de si"
              src="https://inovacaosocial.portugal2020.pt/wp-content/uploads/2019/03/Cuidadores-1080x730.jpg"
            />
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
