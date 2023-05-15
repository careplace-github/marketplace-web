// @mui
import { Typography, Stack, Box, Divider } from '@mui/material';
// utils
import { fDate } from 'src/utils/formatTime';
// components
import Iconify, { IconifyProps } from 'src/components/iconify';
// types
import { ICompanyProps } from 'src/types/company';

// ----------------------------------------------------------------------

type Props = {
  company: ICompanyProps;
  extraServices: IExtraServices[];
  description: string;
  name: string;
};

export default function CompanyDetailSummary({ company, extraServices, description, name }: Props) {
  const { program, includes, highlights } = company;

  return (
    <Stack spacing={5}>
      {/* -- Tour Overview -- */}
      <div>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Serviços Adicionais
        </Typography>
        <Box
          sx={{
            rowGap: 4,
            columnGap: 5,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            },
          }}
        >
          {extraServices.map((service) => {
            return <OverviewItem key={service.value} icon={service.icon} label={service.label} />;
          })}
        </Box>
      </div>
      <Divider sx={{ borderStyle: 'dashed', my: 5 }} />
      {/* -- Tour Description -- */}
      <div>
        <Typography variant="h5" paragraph>
          Sobre a {name}
        </Typography>
        <Typography>{description}</Typography>
      </div>

      {/* -- Tour Includes -- */}
      <div>
        <Typography variant="h5" paragraph>
          Serviços de Apoio Domiciliário
        </Typography>
        <Box
          sx={{
            rowGap: 2,
            columnGap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            },
          }}
        >
          {includes.map((option) => (
            <Stack
              key={option.label}
              direction="row"
              alignItems="center"
              sx={{
                ...(!option.enabled && { color: 'text.disabled' }),
              }}
            >
              <Iconify
                icon="carbon:checkmark"
                sx={{
                  mr: 2,
                  color: 'primary.main',
                  ...(!option.enabled && { color: 'currentColor' }),
                }}
              />
              {option.label}
            </Stack>
          ))}
        </Box>
      </div>
    </Stack>
  );
}
// ----------------------------------------------------------------------
type OverviewItemProp = {
  text: string;
  label: string;
  icon: IconifyProps;
};
function OverviewItem({ icon, label, text = '-' }: OverviewItemProp) {
  return (
    <Stack spacing={1.5} direction="row" alignItems="flex-start">
      <Iconify icon={icon} width={24} color="text.secondary" />
      <Stack spacing={0.5}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
      </Stack>
    </Stack>
  );
}
// ----------------------------------------------------------------------
type HighlightItemProps = {
  label: string;
  text: string;
};
function HighlightItem({ label, text }: HighlightItemProps) {
  return (
    <Stack spacing={1}>
      <Typography
        variant="subtitle1"
        sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}
      >
        <Box
          component="span"
          sx={{ width: 12, height: 2, borderRadius: 1, bgcolor: 'currentColor', mr: 1.5 }}
        />
        {label}
      </Typography>
      <Typography>{text}</Typography>
    </Stack>
  );
}
