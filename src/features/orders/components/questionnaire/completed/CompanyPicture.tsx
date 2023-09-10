// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography, Avatar, Stack } from '@mui/material';
// utils
import { bgBlur } from 'src/utils/cssStyles';
// components
import Image from 'src/components/image';
import { CustomAvatar } from 'src/components/custom-avatar';
import Iconify from 'src/components/iconify/Iconify';
import { useResponsive } from 'src/hooks';
// @types
import { ICompanyDetailsCover } from 'src/types/company';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  '&:before': {
    ...bgBlur({
      color: theme.palette.primary.darker,
    }),
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
}));

const StyledInfo = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(5),
}));

// ----------------------------------------------------------------------

export default function CompanyPicture({ name, image, location }: ICompanyDetailsCover) {
  const isMdUp = useResponsive('up', 'md');
  return (
    <StyledRoot>
      <StyledInfo sx={{ top: '50%', transform: 'translateY(-50%)', mt: '0px' }}>
        <Avatar
          src={image}
          alt={name}
          sx={{
            mx: 'auto',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'common.white',
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
            backgroundColor: 'white',
            '& > img': {
              width: '100%',
              height: 'auto',
            },
          }}
        />

        <Box
          sx={{
            mt: 1,
            color: 'common.white',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4">{name}</Typography>

          <Stack direction="row" alignItems="center" justifyContent="center" gap="5px">
            <Iconify
              width={20}
              icon="carbon:location"
              sx={{
                ml: '-3px',
                color: 'text.disabled',
              }}
            />
            <Typography sx={{ opacity: 0.72 }}>{location}</Typography>
          </Stack>
        </Box>
      </StyledInfo>

      <Image
        alt="cover"
        src={image}
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: 'absolute',
        }}
      />
    </StyledRoot>
  );
}
