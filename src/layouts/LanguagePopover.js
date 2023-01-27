import PropTypes from 'prop-types';
import { useState } from 'react';
// icons
import contentDeliveryNetwork from '@iconify/icons-carbon/content-delivery-network';
// @mui
import { MenuItem, Box, Popover } from '@mui/material';
// components
import { Iconify } from '../components';
import { IconButtonAnimate } from '../components/animate';

// ----------------------------------------------------------------------

const LANGS = [
  {
    label: 'Portugal',
    value: 'pt',
    icon: 'https://zone-assets-api.vercel.app/assets/icons/flags/ic_flag_de.svg',
  },
  {
    label: 'English',
    value: 'en',
    icon: 'https://zone-assets-api.vercel.app/assets/icons/flags/ic_flag_en.svg',
  },
  
  {
    label: 'French',
    value: 'fr',
    icon: 'https://zone-assets-api.vercel.app/assets/icons/flags/ic_flag_fr.svg',
  },
];

// ----------------------------------------------------------------------

LanguagePopover.propTypes = {
  sx: PropTypes.object,
};

export default function LanguagePopover({ sx }) {
  const [currentLang, setCurrentLang] = useState('en');

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleChangeLang = (newLang) => {
    handleClose();
    setCurrentLang(newLang);
  };

  return (
    <>
      <IconButtonAnimate color="inherit" onClick={handleOpen} sx={sx}>
        <Iconify icon={contentDeliveryNetwork} sx={{ width: 20, height: 20 }} />
      </IconButtonAnimate>

      <Popover
        open={Boolean(open)}
        onClose={handleClose}
        anchorEl={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { px: 1, width: 220 },
        }}
      >
        {LANGS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === currentLang}
            onClick={() => handleChangeLang(option.value)}
            sx={{ my: 1 }}
          >
            <Box
              component="img"
              alt={option.label}
              src={option.icon}
              sx={{ borderRadius: '50%', width: 28, height: 28, objectFit: 'cover', mr: 1 }}
            />

            {option.label}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}
