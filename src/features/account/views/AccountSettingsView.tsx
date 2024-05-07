// @mui
import { Box } from '@mui/material';
//
import { AccountLayout } from '../components';
import AccountSettingsChangePhone from '../components/settings/AccountSettingsChangePhone';
import AccountSettingsChangePassword from '../components/settings/AccountSettingsChangePassword';

// ----------------------------------------------------------------------

export default function AccountPersonalView() {
  return (
    <AccountLayout>
      <Box
        sx={{
          p: 3,
          bgcolor: 'white',
          borderRadius: '16px',
          boxShadow:
            'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',

          // Margin beetwen each component
          '& > :not(style) + :not(style)': { mt: 3 },
        }}
      >
        <AccountSettingsChangePassword />
      </Box>
     
    </AccountLayout>
  );
}
