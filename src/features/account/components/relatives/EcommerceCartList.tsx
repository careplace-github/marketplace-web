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
  userRelatives: Array<any>;
  wishlist?: boolean;
  onEditClick?: Function;
  onDeleteRelative?: Function;
};

export default function EcommerceCartList({
  userRelatives,
  wishlist = false,
  onEditClick,
  onDeleteRelative,
}: Props) {
  const isMdUp = useResponsive('up', 'md');

  return (
    <Scrollbar sx={{ maxHeight: '520px' }}>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          py: 2,
          minWidth: isMdUp ? 720 : 0,
          typography: 'subtitle2',
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <Stack sx={{ width: isMdUp ? '120px' : '80px', flex: !isMdUp ? 1 : undefined }} />
        <Stack
          sx={{
            width: isMdUp ? '30%' : '100%',
            textAlign: 'left',
            pl: 2,
            flex: !isMdUp ? 2 : undefined,
          }}
        >
          Nome
        </Stack>
        {isMdUp && (
          <>
            <Stack sx={{ width: '45%', textAlign: 'left', pl: 2 }}>Morada</Stack>
            <Stack sx={{ width: '15%', textAlign: 'left', pl: 2 }}>Idade</Stack>{' '}
          </>
        )}
        <Stack sx={{ width: '70px', textAlign: 'left', pl: 2, flex: !isMdUp ? 1 : undefined }} />
      </Stack>
      {userRelatives.map((relative) => (
        <EcommerceCartItem
          key={relative._id}
          relative={relative}
          onEditClick={onEditClick}
          onDeleteRelative={onDeleteRelative}
        />
      ))}
    </Scrollbar>
  );
}
