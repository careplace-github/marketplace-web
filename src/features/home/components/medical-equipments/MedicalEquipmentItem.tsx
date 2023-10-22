// @mui
import { Stack, Box, Typography } from '@mui/material';
// components
import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';
import Iconify from 'src/components/iconify/Iconify';
// types
import { IServiceProps } from 'src/types/utils';

// ----------------------------------------------------------------------

type Props = {
  item: any;
};

export default function MedicalEquipmentItem({ item }: Props) {
  const { name, image, price, description } = item;

  return (
    <Box
      sx={{
        position: 'relative',
        height: '400px',
        bgcolor: 'white',
        borderRadius: '16px',
        boxShadow: ' rgba(0, 0, 0, 0.35) 0px 5px 15px',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ width: { xs: '90%', sm: '400px' } }}>
          <Image src={image} width={100} />
        </Box>
      </Box>
      <Box sx={{ p: 3, width: '100%' }}>
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="flex-start"
          width="100%"
          gap="10px"
          height="auto"
        >
          <Stack width="100%">
            <TextMaxLine sx={{ fontSize: '14px', fontWeight: 500 }}>{name}</TextMaxLine>

            <Typography sx={{ color: 'text.disabled', fontSize: '12px', mt: '10px' }}>
              {description}
            </Typography>
          </Stack>
        </Stack>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 500,
            color: 'primary.main',
            position: 'absolute',
            left: '24px',
            bottom: '24px',
          }}
        >
          Desde {price.daily}€ por dia / {price.monthly}€ por mês
        </Typography>
      </Box>
    </Box>
  );
}
