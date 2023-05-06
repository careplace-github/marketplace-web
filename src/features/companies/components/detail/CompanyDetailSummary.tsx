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
};

export default function CompanyDetailSummary({ company }: Props) {
  //   const {
  //     program,
  //     includes,
  //     tourGuide,
  //     highlights,
  //     description,
  //     availableEnd,
  //     availableStart,
  //   } = company;
  //   return (
  //     <Stack spacing={5}>
  //       {/* -- Tour Overview -- */}
  //       <div>
  //         <Typography variant="h5" sx={{ mb: 3 }}>
  //           Tour Overview
  //         </Typography>
  //         <Box
  //           sx={{
  //             rowGap: 2.5,
  //             columnGap: 3,
  //             display: 'grid',
  //             gridTemplateColumns: {
  //               xs: 'repeat(1, 1fr)',
  //               sm: 'repeat(2, 1fr)',
  //             },
  //           }}
  //         >
  //           <OverviewItem
  //             icon="carbon:calendar"
  //             label="Available"
  //             text={`${fDate(availableStart, 'src/yyyy')} - ${fDate(availableEnd, 'src/yyyy')}`}
  //           />
  //           <OverviewItem icon="carbon:user" label="Contact name" text="Jayvion Simon" />
  //           <OverviewItem icon="carbon:location" label="Location" text="Kenya" />
  //           <OverviewItem
  //             icon="carbon:mobile"
  //             label="Contact phone"
  //             text={tourGuide?.phoneNumber || ''}
  //           />
  //           <OverviewItem icon="carbon:time" label="Durations" text="3 days 2 nights" />
  //           <OverviewItem icon="carbon:translate" label="Languages" text="Russian, Spanish"/>
  //         </Box>
  //       </div>
  //       <Divider sx={{ borderStyle: 'dashed', my: 5 }} />
  //       {/* -- Tour Description -- */}
  //       <div>
  //         <Typography variant="h5" paragraph>
  //           Tour Description
  //         </Typography>
  //         <Typography>{description}</Typography>
  //       </div>
  //       {/* -- Tour Highlights -- */}
  //       <div>
  //         <Typography variant="h5" paragraph>
  //           Tour Highlights
  //         </Typography>
  //         <ul>
  //           {highlights.map((highlight) => (
  //             <li key={highlight}>{highlight}</li>
  //           ))}
  //         </ul>
  //       </div>
  //       {/* -- Tour Includes -- */}
  //       <div>
  //         <Typography variant="h5" paragraph>
  //           Tour Includes
  //         </Typography>
  //         <Box
  //           sx={{
  //             rowGap: 2,
  //             columnGap: 3,
  //             display: 'grid',
  //             gridTemplateColumns: {
  //               xs: 'repeat(1, 1fr)',
  //               sm: 'repeat(2, 1fr)',
  //             },
  //           }}
  //         >
  //           {includes.map((option) => (
  //             <Stack
  //               key={option.label}
  //               direction="row"
  //               alignItems="center"
  //               sx={{
  //                 ...(!option.enabled && { color: 'text.disabled' }),
  //               }}
  //             >
  //               <Iconify
  //                 icon="carbon:checkmark"
  //                 sx={{
  //                   mr: 2,
  //                   color: 'primary.main',
  //                   ...(!option.enabled && { color: 'currentColor' }),
  //                 }}
  //               />
  //               {option.label}
  //             </Stack>
  //           ))}
  //         </Box>
  //       </div>
  //       {/* -- Tour Program -- */}
  //       <Stack spacing={2}>
  //         <Typography variant="h5">Tour Program</Typography>
  //         {program.map((content) => (
  //           <HighlightItem key={content.label} label={content.label} text={content.text} />
  //         ))}
  //       </Stack>
  //     </Stack>
  //   );
  // }
  // // ----------------------------------------------------------------------
  // type OverviewItemProp = {
  //   text: string;
  //   label: string;
  //   icon: IconifyProps;
  // };
  // function OverviewItem({ icon, label, text = '-' }: OverviewItemProp) {
  //   return (
  //     <Stack spacing={1.5} direction="row" alignItems="flex-start">
  //       <Iconify icon={icon} width={24} />
  //       <Stack spacing={0.5}>
  //         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
  //           {label}
  //         </Typography>
  //         <Typography>{text}</Typography>
  //       </Stack>
  //     </Stack>
  //   );
  // }
  // // ----------------------------------------------------------------------
  // type HighlightItemProps = {
  //   label: string;
  //   text: string;
  // };
  // function HighlightItem({ label, text }: HighlightItemProps) {
  //   return (
  //     <Stack spacing={1}>
  //       <Typography
  //         variant="subtitle1"
  //         sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}
  //       >
  //         <Box
  //           component="span"
  //           sx={{ width: 12, height: 2, borderRadius: 1, bgcolor: 'currentColor', mr: 1.5 }}
  //         />
  //         {label}
  //       </Typography>
  //       <Typography>{text}</Typography>
  //     </Stack>
  //   );
}
