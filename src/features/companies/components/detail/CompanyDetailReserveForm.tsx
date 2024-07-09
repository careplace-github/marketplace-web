import { MutableRefObject } from 'react';
// next
// @mui
import { useTheme } from '@mui/material/styles';
import { Typography, Stack, Avatar, Card } from '@mui/material';
//
import Button from 'src/component-lib/Button/Button';

// ----------------------------------------------------------------------

type Props = {
  getHelpFormRef: MutableRefObject<any>;
};

export default function CompanyDetailReserveForm({ getHelpFormRef }: Props) {
  const theme = useTheme();

  return (
    <Card>
      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-start">
          <Avatar
            src="https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg"
            sx={{ width: '80px', height: '80px' }}
          />
          <Stack spacing={1} direction="column">
            <Typography fontWeight={600} fontSize={18}>
              Henrique Fonseca
            </Typography>
            <Typography fontWeight={400} fontSize={14} color={theme.palette.text.disabled}>
              Consultor de Integração
            </Typography>
          </Stack>
        </Stack>
        <Button
          size="large"
          variant="contained"
          text="Saber preços e vagas"
          onClick={() => {
            const barHeight = '75px';
            getHelpFormRef.current.style.scrollMargin = barHeight;
            getHelpFormRef?.current.scrollIntoView({
              behavior: 'smooth',
              top: '500px',
            });
          }}
        />
      </Stack>
    </Card>
  );
}
