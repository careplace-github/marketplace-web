// @mui
import { Typography, Stack, Box, Divider } from '@mui/material';
// utils
import { fDate } from 'src/utils/formatTime';
// components
import Iconify, { IconifyProps } from 'src/components/iconify';
// types
import { ICompanyProps } from 'src/types/company';
import { IServiceProps } from 'src/types/utils';
// data

// ----------------------------------------------------------------------

type Props = {
  extraServices: IServiceProps[];
  description: string;
  name: string;
  services: string[];
};

export default function CompanyDetailSummary({
  services,
  extraServices,
  description,
  name,
}: Props) {
  return (
    <Stack spacing={7}>
      {/* -- About -- */}
      <div>
        <Typography variant="h5" paragraph>
          Sobre a {name}
        </Typography>
        <Typography>{description}</Typography>
      </div>

      {/* -- Services -- */}
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
          {services.map((serviceItem) => (
            <Stack key={serviceItem} direction="row" alignItems="center">
              <Iconify
                icon="carbon:checkmark"
                sx={{
                  mr: 2,
                  color: 'primary.main',
                }}
              />
              {serviceItem}
            </Stack>
          ))}
        </Box>
      </div>
      {/* -- Extra Services -- */}
      {extraServices?.length > 0 && (
        <div>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Serviços Especializados
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
              return (
                <OverviewItem
                  key={service._id}
                  icon={service.icon ? service.icon : ''}
                  label={service.name}
                />
              );
            })}
          </Box>
        </div>
      )}
    </Stack>
  );
}
// ----------------------------------------------------------------------
type OverviewItemProp = {
  label: string;
  icon: IconifyProps;
};
function OverviewItem({ icon, label }: OverviewItemProp) {
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
