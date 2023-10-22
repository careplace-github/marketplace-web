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
  service: IServiceProps;
  selected?: boolean;
  onItemSelect?: Function;
  landingVersion?: boolean;
};

export default function ServiceItem({ service, selected, onItemSelect, landingVersion }: Props) {
  const { name, image, type, short_description } = service;

  function mapServiceType(serviceType: string) {
    if (serviceType === 'normal') return 'Apoio Domociliário';
    if (serviceType === 'special') return 'Especializado';
    return '';
  }

  return (
    <Box
      onClick={() => {
        if (onItemSelect) onItemSelect(!selected);
      }}
      sx={{
        position: 'relative',
        cursor: landingVersion ? undefined : 'pointer',
        // height: '250px',
        bgcolor: 'white',
        borderRadius: '16px',
        boxShadow: ' rgba(0, 0, 0, 0.35) 0px 5px 15px',
        overflow: 'hidden',
      }}
    >
      {/* <Checkbox
        checked={selected}
        onChange={() => onItemSelect(!selected)}
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 9,
          width: '25px',
          height: '25px',
        }}
      /> */}
      {!landingVersion && (
        <Box
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 9,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid',
            borderColor: 'primary.main',
            cursor: 'pointer',
            width: '25px',
            height: '25px',
            backgroundColor: 'white',
          }}
        >
          {' '}
          <Iconify
            icon="iconamoon:check-bold"
            sx={{ color: selected ? 'primary.main' : 'white' }}
          />
        </Box>
      )}
      <Image src={image} alt={name} ratio="1/1" />
      <Box sx={{ p: 3, width: '100%' }}>
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="flex-start"
          width="100%"
          gap="10px"
          height="60px"
        >
          <Stack width="100%">
            <TextMaxLine sx={{ fontSize: '14px', fontWeight: 500 }}>{name}</TextMaxLine>

            <Typography sx={{ color: 'text.disabled', fontSize: '12px' }}>
              {mapServiceType(type)}
            </Typography>
          </Stack>
        </Stack>
        {!landingVersion && (
          <Typography sx={{ fontSize: '14px', mt: 3 }}>{short_description}</Typography>
        )}
      </Box>
    </Box>
  );
}
