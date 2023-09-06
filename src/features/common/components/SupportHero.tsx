// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Typography, Stack, TextField, InputAdornment } from '@mui/material';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(15, 2.5),
  alignItems: 'center',
  ...bgGradient({
    color: alpha(theme.palette.grey[900], 0.8),
    imgUrl: '/assets/images/background/overlay_2.jpg',
  }),
}));

// ----------------------------------------------------------------------

export default function SupportHero() {
  return (
    <StyledRoot>
      <Typography variant="h2" sx={{ textAlign: 'center', color: 'common.white', mb: 5 }}>
        Bem-vindo ao suporte da <br />
        <Box component="span" sx={{ color: 'primary.main' }}>
          {`Careplace `}
        </Box>
      </Typography>

      <TextField
        fullWidth
        hiddenLabel
        placeholder="Pesquisar..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="carbon:search" width={24} sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
          sx: { color: 'common.white' },
        }}
        sx={{ maxWidth: 366 }}
      />
    </StyledRoot>
  );
}
