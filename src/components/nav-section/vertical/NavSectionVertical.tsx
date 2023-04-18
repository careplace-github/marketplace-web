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
      {data.map((group) => {
        const key = group.subheader || group.items[0].title;

        return (
          <List key={key} disablePadding sx={{ px: 2 }}>
            {group.subheader && <StyledSubheader disableSticky>{group.subheader}</StyledSubheader>}

            {group.items.map((list) => {
              if (isAuthenticated && (list.title === "Entrar" || list.title === "Registar")) return null;
              return (
                <NavList
                  key={list.title + list.path}
                  data={list}
                  depth={1}
                  hasChild={!!list.children}
                />
              )
            })}
          </List>
        );
      })}
    </Stack>
  );
}
