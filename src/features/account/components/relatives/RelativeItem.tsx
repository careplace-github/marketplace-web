// @mui
import {
  Stack,
  Popover,
  Box,
  Divider,
  TextField,
  IconButton,
  Typography,
  MenuItem,
} from '@mui/material';
// utils
import { fCurrency } from 'src/utils/formatNumber';
import kinshipDegrees from 'src/data/kinshipDegrees';
// hooks
import { useResponsive } from 'src/hooks';
import React, { useState } from 'react';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { IRelativeProps } from 'src/types/relative';

// ----------------------------------------------------------------------

type Props = {
  relative: IRelativeProps;
  onEditClick?: Function;
  onDeleteRelative?: Function;
};

const getKinshipDegree = (degree) => {
  let kinship = '';
  kinshipDegrees.forEach((item) => {
    if (degree === item.value) {
      kinship = item.label;
    }
  });
  return kinship;
};

export default function RelativeItem({ relative, onEditClick, onDeleteRelative }: Props) {
  const isMdUp = useResponsive('up', 'md');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  function calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      // eslint-disable-next-line no-plusplus
      age--;
    }

    return age;
  }

  const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = (relativeSelected) => {
    onEditClick?.(relativeSelected);
    setAnchorEl(null);
  };

  const handleDeleteClick = (relativeToDelete) => {
    setAnchorEl(null);
    onDeleteRelative?.(relativeToDelete);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        py: 3,
        width: '100%',
        minWidth: isMdUp ? 720 : 0,
        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={!isMdUp ? 'space-between' : undefined}
        sx={{
          width: '100%',
          minWidth: isMdUp ? 720 : 0,
          typography: 'subtitle2',
        }}
      >
        <Stack sx={{ width: isMdUp ? '120px' : '60px', flex: !isMdUp ? 1 : undefined }}>
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

        <Stack sx={{ p: 2, width: '30%', flex: !isMdUp ? 2 : undefined }}>
          <Typography variant="subtitle2">{relative.name}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {getKinshipDegree(relative.kinship)}
          </Typography>
        </Stack>

        {isMdUp && (
          <>
            {' '}
            <Stack sx={{ p: 2, width: '45%', minWidth: '0px' }}>
              <Typography sx={{ fontSize: '14px', fontWeight: '400' }}>
                {relative.address.street}
              </Typography>
            </Stack>
            <Stack sx={{ width: '15%', pl: 2, fontSize: '14px', fontWeight: '400' }}>
              {calculateAge(new Date(relative.birthdate))} anos
            </Stack>{' '}
          </>
        )}
        <Stack
          sx={{
            width: isMdUp ? '70px' : '40px',
            flex: !isMdUp ? 1 : undefined,
            alignItems: 'flex-end',
          }}
        >
          <IconButton
            sx={{
              width: '40px',
              height: '40px',
              p: 0,
              '&.MuiButtonBase-root': {
                justifyContent: !isMdUp ? 'flex-end' : undefined,
              },
            }}
            onClick={handleMoreClick}
          >
            <Iconify icon="material-symbols:more-vert" />
          </IconButton>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleMoreClose}
            anchorOrigin={{
              vertical: isMdUp ? 'top' : 'bottom',
              horizontal: 'right',
            }}
          >
            <Stack sx={{ alignItems: 'flex-start' }}>
              <MenuItem onClick={() => handleEditClick(relative)}>
                <IconButton
                  // disableanimation="true"
                  disableRipple
                  sx={{
                    width: '120px',
                    height: '40px',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    gap: '8px',
                  }}
                >
                  <Iconify icon="material-symbols:edit" />
                  <Typography>Editar</Typography>
                </IconButton>
              </MenuItem>
              <MenuItem onClick={() => handleDeleteClick(relative)}>
                <IconButton
                  // disableanimation="true"
                  disableRipple
                  sx={{
                    width: '120px',
                    height: '40px',
                    flexDirection: 'row',
                    gap: '8px',
                    justifyContent: 'flex-start',
                  }}
                >
                  <Iconify icon="material-symbols:delete-outline" color="red" />
                  <Typography sx={{ color: 'red' }}>Eliminar</Typography>
                </IconButton>
              </MenuItem>
            </Stack>
          </Popover>
        </Stack>
      </Stack>
    </Stack>
  );
}
