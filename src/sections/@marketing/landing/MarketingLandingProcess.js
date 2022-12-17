import PropTypes from 'prop-types';
// icons
import directionStraightRight from '@iconify/icons-carbon/direction-straight-right';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Stack, Container, Typography, Card, Box } from '@mui/material';
// components
import { Iconify, SvgIconStyle } from '../../../components';

// ----------------------------------------------------------------------

const COLORS = ['primary', 'secondary', 'warning', 'success'];

const SERVICES = [
  {
    name: 'Selecione um Serviço',
    icon: 'https://zone-assets-api.vercel.app/assets/icons/ic_sketch_design.svg',
  },
  {
    name: 'Selecione um Cuidador',
    icon: 'https://zone-assets-api.vercel.app/assets/icons/ic_search.svg',
  },
  {
    name: 'Agende uma Visita',
    icon: 'https://zone-assets-api.vercel.app/assets/icons/ic_optimization.svg',
  },
  {
    name: 'Formalize o Contrato',
    icon: 'https://zone-assets-api.vercel.app/assets/icons/ic_analysis.svg',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15),
  },
}));

// ----------------------------------------------------------------------

export default function MarketingLandingProcess() {
  return (
    <RootStyle>
      <Container>
        <Stack
          sx={{
            maxWidth: 580,
            mb: { xs: 8, md: 5 },
            mx: { xs: 'auto', md: 'unset' },
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <Typography variant="overline" sx={{ color: 'text.disabled' }}>
            Processo
          </Typography>

          <Typography variant="h2" sx={{ mt: 2, mb: 3 }}>
            Como Funcionamos
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Conheça o nosso procedimento e veja por si mesmo o quão fácil é encontrar alguém de confiança.
          </Typography>
        </Stack>

        <Box
          sx={{
            alignItems: 'flex-end',
            display: 'grid',
            gap: 4,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
          }}
        >
          {SERVICES.map((service, index) => (
            <ServiceItem key={service.name} service={service} index={index} />
          ))}
        </Box>
      </Container>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

ServiceItem.propTypes = {
  index: PropTypes.number,
  service: PropTypes.shape({
    icon: PropTypes.any,
    name: PropTypes.string,
  }),
};

function ServiceItem({ service, index }) {
  const { name, icon } = service;

  return (
    <Card
      sx={{
        p: 2,
        color: (theme) => theme.palette[COLORS[index]].darker,
        bgcolor: (theme) => theme.palette[COLORS[index]].light,
        boxShadow: (theme) => `-8px 12px 32px 0px ${alpha(theme.palette[COLORS[index]].main, 0.2)}`,
        ...(index === 1 && {
          mb: { md: 2.5 },
        }),
        ...(index === 2 && {
          mb: { md: 5 },
        }),
        ...(index === 3 && {
          mb: { md: 7.5 },
        }),
      }}
    >
      <SvgIconStyle src={icon} sx={{ width: 64, height: 64, opacity: 0.48 }} />

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={1}
        sx={{ mt: 3, typography: 'h5' }}
      >
        {name}
        {index !== 3 && (
          <Iconify icon={directionStraightRight} sx={{ width: 22, height: 22, ml: 1 }} />
        )}
      </Stack>
    </Card>
  );
}
