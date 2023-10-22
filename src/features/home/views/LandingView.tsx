// MUI
import { Box, Typography } from '@mui/material';
// components
import {
  LandingHero,
  LandingFindHealthUnits,
  LandingHowItWorks,
  LandingServices,
  LandingGetHelp,
  LandingReviews,
  LandingMedicalEquipments,
  LandingKeyFeatures,
} from '../components';

// ----------------------------------------------------------------------

export default function LandingView() {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflowX: 'hidden',
      }}
    >
      <LandingHero />
      <LandingHowItWorks />
      <LandingKeyFeatures />
      <LandingFindHealthUnits />
      <LandingMedicalEquipments />
      <LandingReviews />
      <LandingServices />
      <LandingGetHelp />
    </Box>
  );
}
