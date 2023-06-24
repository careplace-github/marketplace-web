// next
import { useRouter } from 'next/router';
// @mui
import { alpha, styled } from '@mui/material/styles';
import Masonry from '@mui/lab/Masonry';
import {
  Link,
  Box,
  Stack,
  Button,
  Divider,
  Container,
  TextField,
  Typography,
  IconButton,
  StackProps,
  InputAdornment,
  Unstable_Grid2 as Grid,
} from '@mui/material';
// paths
import { PATHS } from 'src/routes/paths';
import { startsWith } from 'lodash';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
// _mock
import { socials } from 'src/data';
//
import { footerLinks, navConfig } from '../nav/config-navigation';
import ListDesktop from './ListDesktop';
import ListMobile from './ListMobile';

// ----------------------------------------------------------------------

const StyledAppStoreButton = styled(Button)(({ theme }) => ({
  flexShrink: 0,
  padding: '5px 12px',
  margin: theme.spacing(1),
  color: theme.palette.common.white,
  border: `solid 1px ${alpha(theme.palette.common.black, 0.24)}`,
  background: `linear-gradient(180deg, ${theme.palette.grey[900]} 0%, ${theme.palette.common.black} 100%)`,
  '& .MuiButton-startIcon': {
    marginLeft: 0,
  },
}));

// ----------------------------------------------------------------------

export default function Footer() {
  const isMdUp = useResponsive('up', 'md');

  const { pathname } = useRouter();

  const mobileList = navConfig.find((i) => i.title === 'Pages')?.children || [];

  const desktopList = footerLinks.sort((listA, listB) => Number(listA.order) - Number(listB.order));

  const renderLists = desktopList;

  // Check if pathname begins with /account
  const isAccount = startsWith(pathname, PATHS.account.root);

  const simpleFooter = (
    <Container sx={{ py: 3, textAlign: 'center', alignItems: 'center' }}>
      <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
        Careplace © 2023. Todos os direitos reservados.
      </Typography>
    </Container>
  );

  const mainFooter = (
    <>
      <Divider />

      <Container
        sx={{
          overflow: 'hidden',
          py: { xs: 8, md: 10 },
        }}
      >
        <Grid container spacing={3} justifyContent={{ md: 'space-between' }}>
          <Grid xs={12} md={4}>
            <Stack spacing={{ xs: 3, md: 5 }}>
              <Stack alignItems="flex-start" spacing={0}>
                <Logo />
              </Stack>

              <Stack spacing={2}>
                <Stack spacing={1}>
                  <Typography variant="h6">Vamos manter o contacto!</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Para estar a par de promoções e não perder nenhuma novidade subscreva a nossa
                    newsletter
                  </Typography>
                </Stack>

                <TextField
                  fullWidth
                  hiddenLabel
                  placeholder="Email"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button variant="contained" color="inherit" size="large">
                          Subscrever
                        </Button>
                      </InputAdornment>
                    ),
                    sx: { pr: 0.5 },
                  }}
                />
              </Stack>
            </Stack>
          </Grid>

          <Grid xs={12} md={6}>
            <Masonry
              columns={3}
              spacing={2}
              defaultColumns={3}
              defaultSpacing={2}
              sx={{ mt: isMdUp ? 0 : 2 }}
            >
              {renderLists.map((list) => (
                <ListDesktop key={list.subheader} list={list} />
              ))}
              <Box>
                <Typography variant="subtitle2">Redes Sociais</Typography>
                <Stack direction="row" alignItems="flex-start" sx={{ ml: '-10px' }}>
                  {socials.map((social) => (
                    <IconButton
                      key={social.value}
                      color="primary"
                      href={social.value}
                      target="_blank"
                    >
                      <Iconify icon={social.icon} />
                    </IconButton>
                  ))}
                </Stack>
              </Box>
            </Masonry>
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <Container>
        <Stack
          spacing={2.5}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          sx={{ py: 3, textAlign: 'center' }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Careplace © 2023. Todos os direitos reservados.
          </Typography>

          <Stack direction="row" spacing={3} justifyContent="center">
            <Link
              variant="caption"
              sx={{ color: 'text.secondary' }}
              href="mailto:geral@careplace.pt"
              target="_blank"
            >
              geral@careplace.pt
            </Link>

            <Link
              variant="caption"
              sx={{ color: 'text.secondary' }}
              href="https://www.careplace.pt/privacy-policy"
              target="_blank"
            >
              Política de Privacidade
            </Link>

            <Link
              variant="caption"
              sx={{ color: 'text.secondary' }}
              href="https://www.careplace.pt/terms-and-conditions"
              target="_blank"
            >
              Termos e Condições
            </Link>
          </Stack>
        </Stack>
      </Container>
    </>
  );

  return <footer>{isAccount ? simpleFooter : mainFooter}</footer>;
}

// ----------------------------------------------------------------------

function AppStoreButton({ ...other }: StackProps) {
  return (
    <Stack direction="row" flexWrap="wrap" {...other}>
      <StyledAppStoreButton startIcon={<Iconify icon="ri:apple-fill" width={28} />}>
        <Stack alignItems="flex-start">
          <Typography variant="caption" sx={{ opacity: 0.72 }}>
            Download on the
          </Typography>

          <Typography variant="h6" sx={{ mt: -0.5 }}>
            Apple Store
          </Typography>
        </Stack>
      </StyledAppStoreButton>

      <StyledAppStoreButton startIcon={<Iconify icon="logos:google-play-icon" width={28} />}>
        <Stack alignItems="flex-start">
          <Typography variant="caption" sx={{ opacity: 0.72 }}>
            Download from
          </Typography>
          <Typography variant="h6" sx={{ mt: -0.5 }}>
            Google Play
          </Typography>
        </Stack>
      </StyledAppStoreButton>
    </Stack>
  );
}
