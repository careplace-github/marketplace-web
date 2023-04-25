// @mui
import { Stack, TextField, IconButton, Typography } from '@mui/material';
// utils
import { fCurrency } from 'src/utils/formatNumber';
import kinshipDegrees from 'src/data/kinshipDegrees';
// hooks
import { useResponsive } from 'src/hooks';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { IProductItemProps } from 'src/types/relative';

// ----------------------------------------------------------------------

type Props = {
  relative: Object;
};

const getKinshipDegree = (degree) => {
  let kinship;
  kinshipDegrees.forEach((item) => {
    if (degree === item.value) {
      kinship = item.label;
    }
  });
  return kinship;
};

export default function EcommerceCartItem({ relative }: Props) {
  const isMdUp = useResponsive('up', 'md');

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        py: 3,
        width: '100%',
        minWidth: 720,
        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          width: '100%',
          minWidth: 720,
          typography: 'subtitle2',
        }}
      >
        <Stack sx={{ width: isMdUp ? '120px' : '80px' }}>
          <Image
            src={relative.profile_picture}
            sx={{
              width: isMdUp ? 80 : 60,
              height: isMdUp ? 80 : 60,
              borderRadius: '50%',
              flexShrink: 0,
              bgcolor: 'background.neutral',
            }}
          />
        </Stack>

        <Stack sx={{ p: 2, width: '30%' }}>
          <Typography variant="subtitle2">{relative.name}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {getKinshipDegree(relative.kinship_degree.to)}
          </Typography>
        </Stack>
        <Stack sx={{ p: 2, width: '45%', minWidth: '0px' }}>
          <Typography sx={{ fontSize: '14px', fontWeight: '400' }}>
            {relative.address.street}
          </Typography>
        </Stack>
        <Stack sx={{ width: '15%', pl: 2, fontSize: '14px', fontWeight: '400' }}>78 anos</Stack>
        <Stack sx={{ width: '70px' }}>
          {' '}
          <IconButton>
            <Iconify icon="material-symbols:more-vert" />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
}
