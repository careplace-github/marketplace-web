import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
// auth
import { useAuthContext } from 'src/contexts';
// @mui
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
import { Box, Avatar, Typography, Stack, InputAdornment, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// assets
import { countries, genders } from 'src/data';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import Iconify from 'src/components/iconify';
import RHFPhoneField from 'src/components/hook-form/RHFPhoneField';
import FormProvider, { RHFTextField, RHFSelect, RHFUploadAvatar } from 'src/components/hook-form';
import UploadPictureModal from '../components/UploadPictureModal';
//
import { AccountLayout } from '../components';
import AccountSettingsGeneral from '../components/settings/AccountSettingsGeneral';
import AccountSettingsChangeEmail from '../components/settings/AccountSettingsChangeEmail';
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
      {/* <Box
        sx={{
          p: 3,
          mt: 5,
          bgcolor: 'white',
          borderRadius: '16px',
          boxShadow:
            'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',

          // Margin beetwen each component
          '& > :not(style) + :not(style)': { mt: 3 },
        }}
      >
        <AccountSettingsChangeEmail />
      </Box> */}
      <Box
        sx={{
          p: 3,
          mt: 5,
          bgcolor: 'white',
          borderRadius: '16px',
          boxShadow:
            'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',

          // Margin beetwen each component
          '& > :not(style) + :not(style)': { mt: 3 },
        }}
      >
        <AccountSettingsChangePhone />
      </Box>
    </AccountLayout>
  );
}
