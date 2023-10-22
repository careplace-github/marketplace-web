import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Box } from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 13,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {},
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {},
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  zIndex: 1,
  color: '#fff',
  width: 30,
  height: 30,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
}));

function ColorlibStepIcon(props: any) {
  const { active, completed, className, icon } = props;

  const icons = {
    1: (
      <Box
        sx={{ display: 'flex', fontWeight: '800', alignItems: 'center', justifyContent: 'center' }}
      >
        1
      </Box>
    ),
    2: (
      <Box
        sx={{ display: 'flex', fontWeight: '800', alignItems: 'center', justifyContent: 'center' }}
      >
        2
      </Box>
    ),
    3: (
      <Box
        sx={{ display: 'flex', fontWeight: '800', alignItems: 'center', justifyContent: 'center' }}
      >
        3
      </Box>
    ),
  };

  return <ColorlibStepIconRoot className={className}>{icons[String(icon)]}</ColorlibStepIconRoot>;
}

const steps = ['', '', ''];

export default function HowItWorksStepper() {
  return (
    <Stack sx={{ width: 'calc(100% + 30px)' }} spacing={4}>
      <Stepper alternativeLabel activeStep={3} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
