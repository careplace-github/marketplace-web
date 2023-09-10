// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Stack, Divider, Typography, Box, Link } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
import { useTheme } from '@mui/material/styles';
// types
import { ICompanyProps } from 'src/types/company';
import { MouseEventHandler } from 'react';
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
  orderStatus?: string;
  isSubmitting: boolean;
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
  updateVersion?: boolean;
};

export default function OrderQuestionnaireSummary({
  handleSubmit,
  company,
  orderStatus,
  disabled,
  updateVersion,
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
          position: 'relative',
          p: 4,
          pb: orderStatus === 'accepted' ? 4 : 0,
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
          sx={{
            borderRadius: 2,
            backgroundColor: 'white',
            width: '100%',
            height: 'auto',
            '& > span > img': {
              width: '100%',
              height: 'auto',
            },
          }}
        />

        <Stack>
          <TextMaxLine variant="h5" sx={{ mb: 2 }}>
            {company.business_profile.name}
          </TextMaxLine>
          <Stack spacing={0.5} direction="row" alignItems="center">
            <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />
            <Box sx={{ typography: 'h6' }}>{company.rating.average.toFixed(1)}</Box>
            {company.rating.count ||
              (company.rating.count === 0 && (
                <Link variant="body2" sx={{ color: 'text.secondary' }}>
                  {`(${company.rating.count === 0 ? 'sem' : company.rating.count} ${
                    (company?.rating?.count && company.rating.count > 1) ||
                    company.rating.count === 0
                      ? 'avaliações'
                      : 'avaliação'
                  })`}
                </Link>
              ))}
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
      {orderStatus !== 'accepted' && (
        <>
          <Divider sx={{ mt: '20px', borderStyle: 'dashed' }} />
          <Stack spacing={3} sx={{ p: 3 }}>
            <LoadingButton
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
              {updateVersion ? 'Atualizar Pedido' : 'Pedir Orçamento'}
            </LoadingButton>

            <Typography variant="caption" sx={{ opacity: 0.72 }}>
              {updateVersion
                ? '* Ao atualizar o seu pedido será feita uma nova solicitação de orçamento.'
                : '* Efetuar um pedido de orçamento não terá quaisquer tipos de custos associados, sendototalmente gratuíto.'}
            </Typography>
          </Stack>
        </>
      )}
    </Card>
  );
}
