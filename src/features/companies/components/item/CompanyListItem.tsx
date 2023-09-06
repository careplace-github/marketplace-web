// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { useTheme } from '@mui/material/styles';
import { Divider, Stack, Card, Typography, Box, Link, Avatar, Button } from '@mui/material';
// utils
import { fCurrency, fShortenNumber } from 'src/utils/formatNumber';
// paths
import { PATHS } from 'src/routes';
// components
import Image from 'src/components/image';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
// types
import { ICompanyProps } from 'src/types/company';
// hooks
import useResponsive from 'src/hooks/useResponsive';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

type Props = {
  company: ICompanyProps;
  vertical?: boolean;
};

export default function CompanyListItem({ company, vertical }: Props) {
  const router = useRouter();
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');
  const isSmUp = useResponsive('up', 'sm');

  return (
    <Card
      sx={{
        minHeight: '250px',
        display: !vertical ? { sm: 'flex' } : undefined,

        '&:hover': {
          boxShadow: (itemTheme) => itemTheme.customShadows.z24,
        },
      }}
    >
      <Box sx={{ flexShrink: { sm: 0 } }}>
        <Image
          src={company.business_profile.logo}
          sx={{
            '& > span > img': {
              objectFit: 'contain',
            },
            height: isSmUp && !vertical ? 1 : 240,
            width: { sm: 240 },
            ...(vertical && {
              width: { sm: 1 },
            }),
          }}
        />
      </Box>

      {/* {bestSeller && (
        <Label
          color="warning"
          variant="filled"
          sx={{ top: 12, left: 12, position: 'absolute', textTransform: 'uppercase' }}
        >
          Best Seller
        </Label>
      )} */}

      <Stack
        spacing={3}
        sx={{ p: 3, width: '100%', justifyContent: 'space-between', position: 'relative' }}
      >
        <Stack
          direction={isMdUp ? 'row' : 'column-reverse'}
          alignItems="flex-start"
          justifyContent={isMdUp ? 'flex-start' : 'space-between'}
        >
          <Stack sx={{ width: '100%' }}>
            <Stack spacing={1}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ paddingBottom: '5px' }}
              >
                <TextMaxLine
                  variant="h6"
                  line={1}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                  onClick={() => {
                    router.push({
                      pathname: `/companies/${company._id}`,
                      query: { ...router.query },
                    });
                  }}
                >
                  {company.business_profile.name}
                </TextMaxLine>
              </Stack>

              <TextMaxLine variant="body2" color="text.secondary">
                {company.business_profile.about}
              </TextMaxLine>
            </Stack>
            {(!isSmUp || vertical) && (
              <Stack
                direction="column"
                alignItems="flex-start"
                justifyContent="space-between"
                sx={{ width: '100%' }}
              >
                <Stack
                  sx={{ mt: '8px' }}
                  spacing={1.5}
                  direction="column"
                  alignItems="flex-start"
                  flexWrap="wrap"
                  // divider={<Divider orientation="vertical" sx={{ height: 20, my: 'auto' }} />}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-start"
                    gap="5px"
                    sx={{ mt: '20px' }}
                  >
                    <Iconify
                      width={20}
                      icon="carbon:location"
                      sx={{
                        color: 'text.disabled',
                      }}
                    />
                    <Typography>{company.addresses[0].city}</Typography>
                  </Stack>
                  <Stack spacing={0.5} direction="row" alignItems="center">
                    <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />
                    <Box sx={{ typography: 'h6', fontSize: '1rem' }}>
                      {Number.isInteger(company.rating.average)
                        ? `${company.rating.average}.0`
                        : company.rating.average.toFixed(1)}
                    </Box>

                    <Link variant="body2" sx={{ color: 'text.secondary' }}>
                      ({company.rating.count ? fShortenNumber(company.rating.count) : 'sem'}{' '}
                      avaliações)
                    </Link>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="flex-end"
                    justifyContent="flex-end"
                    // sx={isSmUp ? { position: 'absolute', top: '20px', right: '24px' } : {}}
                  >
                    <Typography
                      sx={{
                        display: 'inline-flex',
                        fontWeight: 600,
                        alignItems: 'flex-end',
                        fontSize: '1rem',
                      }}
                    >
                      {company?.pricing.minimum_hourly_rate > 0 &&
                        `Desde ${fCurrency(company.pricing.minimum_hourly_rate)}€ / Hora`}{' '}
                    </Typography>
                  </Stack>
                </Stack>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => {
                    router.push({
                      pathname: `/companies/${company._id}`,
                      query: { ...router.query },
                    });
                  }}
                  sx={{
                    mt: '40px',
                    px: 4,
                    bgcolor: 'primary.main',
                    width: '100%',
                    color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                      color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                    },
                  }}
                >
                  Ver mais
                </Button>
              </Stack>
            )}
          </Stack>
        </Stack>
        {isSmUp && !vertical && (
          <Stack
            direction="row"
            alignItems="flex-end"
            justifyContent="space-between"
            sx={{ width: '100%' }}
          >
            <Stack
              sx={{ mt: '8px' }}
              spacing={1.5}
              direction="column"
              alignItems="flex-start"
              flexWrap="wrap"
              // divider={<Divider orientation="vertical" sx={{ height: 20, my: 'auto' }} />}
            >
              <Stack direction="row" alignItems="center" justifyContent="flex-start" gap="5px">
                <Iconify
                  width={20}
                  icon="carbon:location"
                  sx={{
                    color: 'text.disabled',
                  }}
                />
                <Typography>{company.addresses[0].city}</Typography>
              </Stack>
              <Stack spacing={0.5} direction="row" alignItems="center">
                <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />
                <Box sx={{ typography: 'h6', fontSize: '1rem' }}>
                  {Number.isInteger(company.rating.average)
                    ? `${company.rating.average}.0`
                    : company.rating.average.toFixed(1)}
                </Box>

                <Link variant="body2" sx={{ color: 'text.secondary' }}>
                  ({company.rating.count ? fShortenNumber(company.rating.count) : 'sem'} avaliações)
                </Link>
              </Stack>
              <Stack
                direction="row"
                alignItems="flex-end"
                justifyContent="flex-end"
                // sx={isSmUp ? { position: 'absolute', top: '20px', right: '24px' } : {}}
              >
                <Typography
                  sx={{
                    display: 'inline-flex',
                    fontWeight: 600,
                    alignItems: 'flex-end',
                    fontSize: '1rem',
                  }}
                >
                  {company?.pricing.minimum_hourly_rate > 0 &&
                    `Desde ${fCurrency(company.pricing.minimum_hourly_rate)}€ / Hora`}
                </Typography>
              </Stack>
            </Stack>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => {
                router.push({
                  pathname: `/companies/${company._id}`,
                  query: { ...router.query },
                });
              }}
              sx={{
                px: 4,
                bgcolor: 'primary.main',
                color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                '&:hover': {
                  bgcolor: 'primary.dark',
                  color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                },
              }}
            >
              Ver mais
            </Button>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
