// @mui
import { Stack, Box } from '@mui/material';
// types
import { IProductItemProps } from 'src/types/relative';
// hooks
import { useResponsive } from 'src/hooks';
// components
import Scrollbar from 'src/components/scrollbar';
//
import EcommerceCartItem from './EcommerceCartItem';

// ----------------------------------------------------------------------

type Props = {
  userRelatives: Array;
  wishlist?: boolean;
};

export default function EcommerceCartList({ userRelatives, wishlist = false }: Props) {
  const isMdUp = useResponsive('up', 'md');

  return (
    <Scrollbar sx={{ maxHeight: '520px' }}>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          py: 2,
          minWidth: 720,
          typography: 'subtitle2',
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <Stack sx={{ width: isMdUp ? '120px' : '80px' }} />
        <Stack sx={{ width: '30%', textAlign: 'left', pl: 2 }}>Nome</Stack>
        <Stack sx={{ width: '45%', textAlign: 'left', pl: 2 }}>Morada</Stack>
        <Stack sx={{ width: '15%', textAlign: 'left', pl: 2 }}>Idade</Stack>
        <Stack sx={{ width: '70px', textAlign: 'left', pl: 2 }} />
      </Stack>
      {userRelatives.map((relative) => (
        <EcommerceCartItem key={relative._id} relative={relative} />
      ))}
    </Scrollbar>
  );
}
