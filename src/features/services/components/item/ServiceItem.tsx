 
// next
import NextLink from 'next/link';
// @mui
import { Stack, Typography, Link } from '@mui/material';
// components
import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';
// types
import { IServiceProps } from 'src/types/service';
 

// ----------------------------------------------------------------------

type Props = {
  service: IServiceProps;
};

export default function ServiceItem({ service }: Props) {
  const { title, coverImg, category } = service;

  return (
    <div>
      <Image src={coverImg} alt={title} ratio="1/1" sx={{ borderRadius: 2 }} />

      <Stack spacing={1} sx={{ pt: 2.5, px: 2.5 }}>
        <Typography variant="overline" sx={{ color: 'text.disabled' }}>
          {category}
        </Typography>

        <Link component={NextLink} href="/" color="inherit">
          <TextMaxLine variant="h5" line={1}>
            {title}
          </TextMaxLine>
        </Link>
      </Stack>
    </div>
  );
}
