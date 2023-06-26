// @mui
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';

// ----------------------------------------------------------------------

export const StyledBar = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1),
  // Border
  border: '1px solid rgba(0, 0, 0, 0.12)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  [theme.breakpoints.up('md')]: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));
