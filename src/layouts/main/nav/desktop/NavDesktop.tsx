// @mui
import { Stack } from '@mui/material';
// components
import { Searchbar } from 'src/components/searchbar';

// ----------------------------------------------------------------------

type NavDesktopProps = {
  sx?: object;
};

export default function NavDesktop({ sx }: NavDesktopProps) {
  return (
    <Stack
      component="nav"
      direction="row"
      spacing={6}
      sx={{
        ml: 6,
        height: 1,
        alignItems: 'center',
        ...sx,
      }}
    >
      <Searchbar />
    </Stack>
  );
}
