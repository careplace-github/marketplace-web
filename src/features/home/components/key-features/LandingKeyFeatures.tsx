import React from 'react';
import { Box, Stack, Grid, Typography } from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';

function LandingKeyFeatures() {
  const keyFeatures = [
    { text: 'Processo Personalizado, Rápido & Fácil', icon: 'mdi:clock-fast' },
    { text: 'Prestadores Rigorosamente Verificados', icon: 'iconoir:twitter-verified-badge' },
    { text: 'Pesquisa Eficiente', icon: 'radix-icons:magnifying-glass' },
    { text: 'Avaliações e Referências', icon: 'carbon:review' },
    { text: 'Sem Custos Extra', icon: 'ic:baseline-money-off' },
    { text: 'Pagamentos Seguros', icon: 'ri:secure-payment-line' },
  ];
  return (
    <Box
      sx={{
        pt: 8,
        pb: 8,
        px: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '1200px',
      }}
    >
      <Typography
        sx={{ fontSize: { xs: '22px', sm: '32px' }, textAlign: 'center', fontWeight: '800' }}
      >
        Segurança e Transparência são a nossa Prioridade
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: '14px', sm: '18px' },
          fontWeight: '600',
          mt: '15px',
          color: 'text.disabled',
          textAlign: 'center',
        }}
      >
        Descubra como a plataforma Careplace está a redefinir o ecossistema de cuidados de saúde
        através de tecnologia inovadora
      </Typography>
      <Grid
        container
        xs={12}
        sx={{
          width: 'auto',
          justifyContent: 'space-between',
          mt: '30px',
        }}
        spacing={5}
      >
        {keyFeatures.map((feature) => (
          <Grid
            item
            xs={6}
            sm={4}
            key={feature.text}
            sx={{
              width: 'fit-content',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Stack
              direction="column"
              alignItems="center"
              sx={{
                fontSize: { xs: '14px', sm: '20px' },
                gap: '15px',
                fontWeight: '600',
                height: '100%',
                justifyContent: 'flex-start',
                width: 'fit-content',
              }}
            >
              <Iconify
                icon={feature.icon}
                sx={{ width: '40px', height: '40px', color: 'primary.main' }}
              />
              <Typography sx={{ width: 'fit-content', textAlign: 'center' }}>
                {feature.text}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default LandingKeyFeatures;
