import { useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { Divider, Stack, Card, Typography, Box, Link, Checkbox } from '@mui/material';
// utils
import { fCurrency } from 'src/utils/formatNumber';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
// types
import { ICompanyProps } from 'src/types/company';

// ----------------------------------------------------------------------

type Props = {
  company: ICompanyProps;
};

export default function CompanyDetailtem({ company }: Props) {
  // const { slug, location, price, priceSale, favorited, duration, ratings, coverImg } = company;
  // const [favorite, setFavorite] = useState(favorited);
  // const handleChangeFavorite = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setFavorite(event.target.checked);
  // };
  // return (
  //   <Card>
  //     <Stack
  //       direction="row"
  //       alignItems="center"
  //       justifyContent="space-between"
  //       sx={{
  //         pt: 1.5,
  //         pl: 2,
  //         pr: 1.5,
  //         top: 0,
  //         width: 1,
  //         zIndex: 9,
  //         position: 'absolute',
  //       }}
  //     >
  //       <Stack
  //         spacing={0.5}
  //         direction="row"
  //         sx={{
  //           px: 1,
  //           borderRadius: 0.75,
  //           typography: 'subtitle2',
  //           bgcolor: 'text.primary',
  //           color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
  //         }}
  //       >
  //         {priceSale > 0 && (
  //           <Box sx={{ color: 'grey.500', textDecoration: 'line-through', mr: 0.5 }}>
  //             {fCurrency(priceSale)}
  //           </Box>
  //         )}
  //         {fCurrency(price)}
  //       </Stack>
  //       <Checkbox
  //         color="error"
  //         checked={favorite}
  //         onChange={handleChangeFavorite}
  //         icon={<Iconify icon="carbon:favorite" />}
  //         checkedIcon={<Iconify icon="carbon:favorite-filled" />}
  //         sx={{ color: 'common.white' }}
  //       />
  //     </Stack>
  //     <Image alt={slug} src={coverImg} ratio="1/1" />
  //     <Stack spacing={0.5} sx={{ p: 2.5 }}>
  //       <Typography variant="body2" sx={{ color: 'text.secondary' }}>
  //         {location}
  //       </Typography>
  //       <Link component={NextLink} href="/" color="inherit">
  //         <TextMaxLine variant="h6" persistent>
  //           {slug}
  //         </TextMaxLine>
  //       </Link>
  //     </Stack>
  //     <Divider sx={{ borderStyle: 'dashed' }} />
  //     <Stack direction="row" alignItems="center" sx={{ p: 2.5 }}>
  //       <Stack
  //         flexGrow={1}
  //         direction="row"
  //         alignItems="center"
  //         sx={{ typography: 'body2', color: 'text.disabled' }}
  //       >
  //         <Iconify icon="carbon:time" width={16} sx={{ mr: 1 }} /> {duration}
  //       </Stack>
  //       <Stack spacing={0.5} direction="row" alignItems="center">
  //         <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />
  //         <Box sx={{ typography: 'h6' }}>
  //           {Number.isInteger(ratings) ? `${ratings}.0` : ratings}
  //         </Box>
  //       </Stack>
  //     </Stack>
  //   </Card>
  // );
}
