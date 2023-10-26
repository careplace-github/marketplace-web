// @mui
import { List, Stack } from '@mui/material';
// auth
import { useAuthContext } from 'src/contexts';
//
import { NavSectionProps } from 'src/components/nav-section/types';
import { StyledSubheader } from './styles';
import NavList from './NavList';

// ----------------------------------------------------------------------

export default function NavSectionVertical({ data, sx, ...other }: NavSectionProps) {
  const { isAuthenticated } = useAuthContext();
  return (
    <Stack sx={sx} {...other}>
      {data.map((item) => {
        return (
          <List key={item.title} disablePadding sx={{ px: 2 }}>
            <NavList key={item.title + item.path} data={item} depth={1} />
          </List>
        );
      })}
    </Stack>
  );
}
