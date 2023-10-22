import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import { useResponsive } from 'src/hooks';

type props = {
  title: string;
  description: string;
  icon: string;
};

function HowItWorksItem({ title, description, icon }: props) {
  const isSmUp = useResponsive('up', 'sm');
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '350px', md: '490px', lg: '420px' },
      }}
    >
      <Card
        sx={{
          position: 'absolute',
          top: '50px',
          minHeight: '250px',
          display: { sm: 'flex' },
          width: '100%',
        }}
      >
        <Box
          sx={{
            p: '70px 15px',
            height: { xs: '350px', md: '420px', lg: '350px' },
          }}
        >
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: '600',
              width: '100%',
              textAlign: 'center',
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              width: '100%',
              textAlign: 'center',
              mt: '10px',
              height: 'calc(100% - 20px)',
              overflowY: 'auto',
            }}
          >
            {description}
          </Typography>
        </Box>
      </Card>
      <Box
        sx={{
          width: '100px',
          height: '100px',
          border: '1px solid',
          borderColor: 'primary.main',
          borderRadius: '100%',
          position: 'absolute',
          top: '0px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <Iconify icon={icon} sx={{ width: '50%', height: '50%', color: 'primary.main' }} />
      </Box>
    </Box>
  );
}

export default HowItWorksItem;
