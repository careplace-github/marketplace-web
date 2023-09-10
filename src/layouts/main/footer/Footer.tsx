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
  Snackbar,
  Alert,
} from '@mui/material';
// paths
import { PATHS } from 'src/routes/paths';
import { startsWith } from 'lodash';
// hooks
import useResponsive from 'src/hooks/useResponsive';
import { useState, useEffect } from 'react';
// components
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { socials } from 'src/data';
// axios
import axios from 'src/lib/axios';
// auth
import { useSession } from 'next-auth/react';
//
import { ISnackbarProps } from 'src/types/snackbar';
import { footerLinksLoggedIn, footerLinksLoggedOut } from '../nav/config-navigation';
import ListDesktop from './ListDesktop';

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
  const { data: user } = useSession();
  const { pathname } = useRouter();
  const [email, setEmail] = useState<string>('');
  const [showSnackbar, setShowSnackbar] = useState<ISnackbarProps>({
    show: false,
    severity: 'success',
    message: '',
  });
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

  const desktopList = user
    ? footerLinksLoggedIn.sort((listA, listB) => Number(listA.order) - Number(listB.order))
    : footerLinksLoggedOut.sort((listA, listB) => Number(listA.order) - Number(listB.order));

  const renderLists = desktopList;

  const handleSubscribeNewsletter = async () => {
    try {
      await axios.post('/leads/newsletter/customer', {
        email,
        name: user?.name || null,
      });
      setShowSnackbar({
        show: true,
        severity: 'success',
        message: 'Newsletter subscrita com sucesso.',
      });
    } catch (error) {
      if (error?.error?.message === 'Lead already exists') {
        setShowSnackbar({
          show: true,
          severity: 'warning',
          message: 'Já subscreveu a newsletter.',
        });
      } else {
        console.error(error);

        setShowSnackbar({
          show: true,
          severity: 'error',
          message: 'Algo correu mal, tente novamente.',
        });
      }
    }
    if (!user?.email) setEmail('');
  };

  useEffect(() => {
    if (email.length > 0) {
      const isEmail = email.includes('@') && email.split('@')[1].includes('.');
      setIsEmailValid(isEmail);
    } else setIsEmailValid(false);
  }, [email]);

  useEffect(() => {
    if (user?.email) setEmail(user?.email);
  }, [user?.email]);

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
      <Snackbar
        open={showSnackbar.show}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() =>
          setShowSnackbar({
            show: false,
            severity: 'success',
            message: '',
          })
        }
      >
        <Alert
          onClose={() =>
            setShowSnackbar({
              show: false,
              severity: 'success',
              message: '',
            })
          }
          severity={showSnackbar.severity}
          sx={{ width: '100%' }}
        >
          {showSnackbar.message}
        </Alert>
      </Snackbar>
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
                <Logo logoHeight={33} />
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
                  value={email}
                  fullWidth
                  hiddenLabel
                  disabled={!!user?.email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          disabled={!isEmailValid}
                          variant="contained"
                          color="inherit"
                          size="large"
                          onClick={handleSubscribeNewsletter}
                        >
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
              href={PATHS.privacyPolicy}
              target="_blank"
            >
              Política de Privacidade
            </Link>

            <Link
              variant="caption"
              sx={{ color: 'text.secondary' }}
              href={PATHS.termsAndConditions}
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
