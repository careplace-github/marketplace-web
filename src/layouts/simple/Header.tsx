// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Link, Stack, Container } from '@mui/material';
import Badge, { badgeClasses } from '@mui/material/Badge';

// config
import { HEADER } from 'src/layouts';
// components
import Logo from 'src/components/logo';
import { PATHS } from 'src/routes';

//
import Label from 'src/components/label';
import HeaderShadow from '../components/HeaderShadow';

// ----------------------------------------------------------------------

type Props = {
  isOffset: boolean;
};

export default function Header({ isOffset }: Props) {
  const theme = useTheme();

  return (
    <AppBar color="transparent" sx={{ boxShadow: 'none' }}>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_MAIN_DESKTOP,
          },
          color: 'text.primary',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
        }}
      >
        <Container
          sx={{
            height: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Badge
            sx={{
              [`& .${badgeClasses.badge}`]: {
                top: 8,
                right: -16,
              },
            }}
            badgeContent={
              <Label color="info" sx={{ textTransform: 'unset', height: 20, px: 0.5, ml: 1 }}>
                beta
              </Label>
            }
          >
            <Logo logoHeight={33} />
          </Badge>{' '}
          <Stack spacing={1} direction="row" alignItems="center">
            <Link href={PATHS.support} component={NextLink} variant="subtitle2" color="inherit">
              Precisa de Ajuda?
            </Link>
          </Stack>
        </Container>
      </Toolbar>

      <HeaderShadow />
    </AppBar>
  );
}
