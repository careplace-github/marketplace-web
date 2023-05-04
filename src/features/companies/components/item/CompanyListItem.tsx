// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { Divider, Stack, Card, Typography, Box, Link, Avatar } from '@mui/material';
// utils
import { fCurrency, fShortenNumber } from 'src/utils/formatNumber';
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
  console.log(company);
  const isMdUp = useResponsive('up', 'md');
  const isSmUp = useResponsive('up', 'sm');

  return (
    <Card
      sx={{
        minHeight: '250px',
        display: { sm: 'flex' },
        '&:hover': {
          boxShadow: (theme) => theme.customShadows.z24,
        },
        ...(vertical && {
          flexDirection: 'column',
        }),
      }}
      onClick={() => {
        router.push({
          pathname: `/companies/${company.slug}`,
          query: { ...router.query },
        });
      }}
    >
      <Box sx={{ flexShrink: { sm: 0 } }}>
        <Image
          src={company.business_profile.logo}
          sx={{
            '& > span > img': {
              objectFit: 'contain',
            },
            height: isSmUp ? 1 : 240,
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

      <Stack spacing={3} sx={{ p: 3, width: '100%', justifyContent: 'space-between' }}>
        <Stack
          spacing={{
            xs: 3,
            sm: vertical ? 3 : 1,
          }}
          direction={isSmUp ? 'row-reverse' : 'column-reverse'}
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <Typography variant="h4" sx={{ display: 'inline-flex', alignItems: 'flex-end' }}>
              {/* {priceSale > 0 && (
                <Box
                  component="span"
                  sx={{ mr: 0.5, color: 'text.disabled', textDecoration: 'line-through' }}
                >
                  {fCurrency(priceSale)}
                </Box>
              )} */}
              {`${fCurrency(company.business_profile.average_hourly_rate)} €/`}
              <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', mb: isSmUp ? '4px' : '2px' }}>
                hora
              </Typography>
            </Typography>
          </Stack>

          <Stack>
            <Stack spacing={1}>
              <Link component={NextLink} href="/" color="inherit">
                <TextMaxLine variant="h6" line={1}>
                  {company.business_profile.name}
                </TextMaxLine>
              </Link>

              <TextMaxLine
                variant="body2"
                color="text.secondary"
                sx={{
                  ...(vertical && {
                    display: { sm: 'none' },
                  }),
                }}
              >
                {company.business_profile.about}
              </TextMaxLine>
            </Stack>
            {!isSmUp && (
              <Stack
                sx={{ mt: '8px' }}
                spacing={1.5}
                direction="row"
                alignItems="center"
                flexWrap="wrap"
                divider={<Divider orientation="vertical" sx={{ height: 20, my: 'auto' }} />}
              >
                <Stack spacing={0.5} direction="row" alignItems="center">
                  <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />
                  <Box sx={{ typography: 'h6' }}>
                    {Number.isInteger(company.rating.average)
                      ? `${company.rating.average}.0`
                      : company.rating.average}
                  </Box>

                  {company.rating.count && (
                    <Link variant="body2" sx={{ color: 'text.secondary' }}>
                      ({fShortenNumber(company.rating.count)} reviews)
                    </Link>
                  )}
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack>
        {isSmUp && (
          <Stack
            sx={{ mt: '8px' }}
            spacing={1.5}
            direction="row"
            alignItems="center"
            flexWrap="wrap"
            divider={<Divider orientation="vertical" sx={{ height: 20, my: 'auto' }} />}
          >
            <Stack spacing={0.5} direction="row" alignItems="center">
              <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />
              <Box sx={{ typography: 'h6' }}>
                {Number.isInteger(company.rating.average)
                  ? `${company.rating.average}.0`
                  : company.rating.average}
              </Box>

              {company.rating.count && (
                <Link variant="body2" sx={{ color: 'text.secondary' }}>
                  ({fShortenNumber(company.rating.count)} reviews)
                </Link>
              )}
            </Stack>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
