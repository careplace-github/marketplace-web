import React, { useState } from 'react';
// mui
import { Grid, Typography, Snackbar, Alert, Box } from '@mui/material';
// types
import { ISnackbarProps } from 'src/types/snackbar';
import GetHelpForm from './GetHelpForm';

function GetHelpView() {
  const [showSnackbar, setShowSnackbar] = useState<ISnackbarProps>({
    show: false,
    severity: 'success',
    message: '',
  });

  return (
    <Box
      id="hello there"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
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
      <Box
        sx={{
          width: '100vw',
          height: { xs: '300px', sm: '200px' },
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ zIndex: 5, width: '100%', maxWidth: '1200px', px: '20px' }}>
          <Typography
            sx={{
              color: 'white',
              fontSize: { xs: '22px', md: '42px' },
              fontWeight: '800',
              width: '100%',
              textAlign: 'center',
            }}
          >
            Descubra o Melhor Apoio para o seu Familiar
          </Typography>
          <Typography
            sx={{
              color: 'white',
              fontSize: { xs: '14px', md: '18px' },
              fontWeight: '600',
              width: '100%',
              textAlign: 'center',
              mt: '10px',
            }}
          >
            Obtenha ajuda personalizada para escolher os serviços de Apoio Domiciliário, Lares de
            Idosos, Residências Sénior, Centros de Dia ou Equipamentos Médicos mais adequados ao seu
            caso e às necessidades do seu familiar de forma segura, rápida e personalizada, sem
            custos adicionais.
          </Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: 'primary.main',
            position: 'absolute',
            opacity: '0.6',
            left: 0,
            top: 0,
            zIndex: 4,
          }}
        />
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: 'primary.main',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 3,
            backgroundImage: 'url("/assets/illustrations/get_help_banner.jpeg")',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        />
      </Box>
      <Box
        sx={{
          maxWidth: '1200px',
          width: '100%',
          px: '20px',
          py: '50px',
          '& .MuiFormLabel-root': {
            pr: '5px',
            backgroundColor: 'white',
          },
        }}
      >
        <Grid container spacing={5}>
          <Grid item md={6}>
            <Box sx={{ width: '100%' }}>
              <Typography
                sx={{ fontSize: { xs: '26px', md: '36px' }, fontWeight: '600', textAlign: 'left' }}
              >
                Preencha o formulário e aguarde o nosso contacto
              </Typography>
              {/* Topic 1 */}
              <Typography
                sx={{
                  fontSize: '14px',
                  color: 'primary.main',
                  fontWeight: '600',
                  textAlign: 'left',
                  mt: '20px',
                }}
              >
                O que acontece a seguir a preencher o formulário?
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '600',
                  textAlign: 'left',
                  mt: '10px',
                }}
              >
                Após preencher o formulário, a equipa da Careplace entra em ação. A sua informação é
                cuidadosamente avaliada para compreender as suas necessidades específicas. Em
                seguida, iremos entrar em contato consigo para fornecer orientação personalizada e
                assistência contínua. O nosso objetivo é ajudá-lo a encontrar as melhores soluções
                de Apoio Domiciliário, Lares de Idosos, Residências Sénior, Centros de Dia ou
                Equipamentos Médicos que atendam às suas necessidades. Pode contar com o nosso apoio
                e compromisso ao longo de todo o processo.
              </Typography>
              {/* Topic 2 */}
              <Typography
                sx={{
                  fontSize: '14px',
                  color: 'primary.main',
                  fontWeight: '600',
                  textAlign: 'left',
                  mt: '20px',
                }}
              >
                Como é que o serviço pode ser gratuito?
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '600',
                  textAlign: 'left',
                  mt: '10px',
                }}
              >
                A nossa consultoria independente é fornecida sem custos para as famílias. Para
                tornar isto possível, a Careplace conta com o apoio de uma rede de prestadores de
                serviços de Apoio Domiciliário, Lares de Idosos, Residências Sénior, Centros de Dia
                e aluguer de Equipamentos Médicos. A nossa plataforma garante a imparcialidade dos
                nossos serviços, e o nosso principal foco é auxiliá-lo a fazer uma escolha segura
                que atenda sempre às suas necessidades.
              </Typography>
              {/* Topic 3 */}
              <Typography
                sx={{
                  fontSize: '14px',
                  color: 'primary.main',
                  fontWeight: '600',
                  textAlign: 'left',
                  mt: '20px',
                }}
              >
                Vou ficar com algum compromisso ao preencher o formulário?
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '600',
                  textAlign: 'left',
                  mt: '10px',
                }}
              >
                Não, o preenchimento do formulário de apoio personalizado da Careplace não implica
                qualquer compromisso. É uma etapa inicial que nos permite entender as suas
                necessidades e fornecer orientação personalizada. Não há obrigações associadas, e a
                decisão de prosseguir com serviços é inteiramente sua. Estamos aqui para ajudar sem
                qualquer vínculo.
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              mt: '20px',
              '& .MuiPaper-root-MuiMenu-paper-MuiPopover-paper': {
                maxHeight: '100px',
              },
            }}
          >
            <GetHelpForm
              onSubmitError={() => {
                setShowSnackbar({
                  show: true,
                  severity: 'error',
                  message: 'Algo correu mal, tente novamente.',
                });
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default GetHelpView;
