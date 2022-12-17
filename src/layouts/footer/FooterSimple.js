// @mui
import { Container, Typography } from '@mui/material';
// components
import { Logo } from '../../components';

// ----------------------------------------------------------------------

export default function FooterSimple() {
  return (
    <Container sx={{ textAlign: 'center', py: 8 }}>
      <Logo isSimple sx={{ mb: 3 }} />
      <Typography variant="body3" sx={{ color: 'text.secondary' }}>
        Careplace © 2023. Todos os direitos reservados.
      </Typography>
    </Container>
  );
}
