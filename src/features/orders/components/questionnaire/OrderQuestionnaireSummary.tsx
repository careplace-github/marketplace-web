// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Stack, Divider, Typography, Avatar, Box, Link } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
import { useTheme } from '@mui/material/styles';
// types
import { ICompanyProps } from 'src/types/company';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
//
import { FilterGuests, FilterTime } from '../filters/components';

// ----------------------------------------------------------------------

type Props = {
  company: ICompanyProps;
  disabled: boolean;
  isSubmitting: boolean;
  handleSubmit: Function;
};

export default function OrderQuestionnaireSummary({
  handleSubmit,
  company,
  disabled,
  isSubmitting,
}: Props) {
  const theme = useTheme();
  const { palette } = theme;
  const isSmUp = useResponsive('up', 'sm');
  const isMdUp = useResponsive('up', 'md');
  return (
    <Card>
      <Box
        sx={{
          p: 4,
          pb: 0,
          gap: 3,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(1, 1fr)',
            lg: 'repeat(2, 1fr)',
          },
        }}
      >
        <Image
          alt={company.business_profile.name}
          src={company.business_profile.logo}
          ratio="1/1"
          sx={{ borderRadius: 2 }}
        />
        <Stack>
          <TextMaxLine variant="h5" sx={{ mb: 2 }}>
            {company.business_profile.name}
          </TextMaxLine>
          <Stack spacing={0.5} direction="row" alignItems="center">
            <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />
            <Box sx={{ typography: 'h6' }}>{company.rating.average}</Box>
            {company.rating.count && (
              <Link variant="body2" sx={{ color: 'text.secondary' }}>
                ({company.rating.count} avaliações)
              </Link>
            )}
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            gap="5px"
            sx={{ mt: '5px' }}
          >
            <Iconify
              width={20}
              icon="carbon:location"
              sx={{
                color: 'text.disabled',
              }}
            />
            <Typography sx={{ opacity: 0.72 }}>{company.addresses[0].city}</Typography>
          </Stack>
          {/* <Divider sx={{ borderStyle: 'dashed', my: 2.5 }} /> */}
        </Stack>
      </Box>
      {/* <Stack sx={{ p: 4, pb: 3 }}>
        <Stack
          spacing={2.5}
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            p: 2.5,
            borderRadius: 2,
            color: 'text.disabled',
            bgcolor: 'background.neutral',
          }}
        >
          <Stack direction="row" spacing={1.5} sx={{ width: 1 }}>
            <Iconify icon="carbon:events" width={24} />
            <Stack spacing={0.5}>
              <Typography variant="caption">Departure day</Typography>
              <FilterGuests
                startAdornment={null}
                guests={guests}
                onDecreaseGuests={onDecreaseGuests}
                onIncrementGuests={onIncrementGuests}
                sx={{ height: 'unset', color: 'text.primary' }}
              />
            </Stack>
          </Stack>
          {isSmUp && <Divider flexItem orientation="vertical" sx={{ borderStyle: 'dashed' }} />}
          <Stack direction="row" spacing={1.5} sx={{ width: 1 }}>
            <Iconify icon="carbon:calendar" width={24} />
            <Stack spacing={0.5}>
              <Typography variant="caption">Guests</Typography>
              <FilterTime
                departureDay={departureDay}
                onChangeDepartureDay={onChangeDepartureDay}
                sx={{
                  height: 'unset',
                  color: 'text.primary',
                  '& .MuiInputAdornment-root': { display: 'none' },
                  }}
              />
            </Stack>
          </Stack> */}
      {/* </Stack> */}
      {/* </Stack> */}
      <Divider sx={{ mt: '20px', borderStyle: 'dashed' }} />
      <Stack spacing={3} sx={{ p: 3 }}>
        <LoadingButton
          type="submit"
          disabled={disabled}
          size="large"
          variant="contained"
          color="inherit"
          onClick={handleSubmit}
          loading={isSubmitting}
          sx={{
            px: 4,
            bgcolor: 'primary.main',
            color: palette.mode === 'light' ? 'common.white' : 'grey.800',
            '&:hover': {
              bgcolor: 'primary.dark',
              color: palette.mode === 'light' ? 'common.white' : 'grey.800',
            },
          }}
        >
          Pedir Orçamento
        </LoadingButton>
        <Typography variant="caption" sx={{ opacity: 0.72 }}>
          * Efetuar um pedido de orçamento não terá quaisquer tipos de custos associados, sendo
          totalmente gratuíto.
        </Typography>
      </Stack>
    </Card>
  );
}
