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
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

export default function CompanyProfileCover({ name, image, location }: ICompanyDetailsCover) {
  const isMdUp = useResponsive('up', 'md');
  return (
    <StyledRoot>
      <StyledInfo
        sx={!isMdUp ? { top: '50%', transform: 'translateY(-50%)', mt: '0px' } : undefined}
      >
        <Avatar
          src={image}
          alt={name}
          name={name}
          sx={{
            mx: 'auto',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'common.white',
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
          }}
        />

        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h4">{name}</Typography>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent={isMdUp ? 'flex-start' : 'center'}
            gap="5px"
          >
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
