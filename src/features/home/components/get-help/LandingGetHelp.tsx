import React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
// routes
import { useRouter } from 'next/router';
import { PATHS } from 'src/routes';

function LandingGetHelp() {
  const router = useRouter();
  return (
    <Box
      sx={{
        px: { xs: '20px', sm: 0 },
        width: '100vw',
        height: '700px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Stack
        direction="column"
        sx={{
          maxWidth: '1200px',
          px: { xs: '30px', lg: 0 },
          width: '100%',
          zIndex: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '24px', sm: '45px' },
            fontWeight: '800',
            color: 'white',
            textAlign: 'center',
          }}
        >
          Obtenha Ajuda Gratuita para fazer uma Escolha Consciente para o seu Familiar
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '18px', sm: '24px' },
            fontWeight: '600',
            color: 'white',
            textAlign: 'center',
            mt: '20px',
          }}
        >
          Ajudamos-lhe a escolher os serviços de Apoio Domiciliário, Lares de Idosos, Residências
          Sénior, Centros de Dia ou Equipamentos Médicos mais adequados ao seu caso e às
          necessidades do seu familiar de forma segura, rápida e personalizada.
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: '50px',
            boxSizing: 'border-box',
            width: { xs: '100%', sm: '400px' },
            height: { xs: '53px', sm: '70px' },
            fontSize: { xs: '16px', sm: '24px' },
          }}
          onClick={() => {
            router.push(PATHS.getHelp);
          }}
        >
          Obter Ajuda Gratuita
        </Button>
      </Stack>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: 'primary.main',
          position: 'absolute',
          opacity: '0.6',
          left: 0,
          top: 0,
          zIndex: 4,
        }}
      />
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: 'primary.main',
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 3,
          backgroundImage: 'url("/assets/illustrations/get_help_banner.jpeg")',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      />
    </Box>
  );
}

export default LandingGetHelp;
