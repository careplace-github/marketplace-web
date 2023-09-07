// next
import { useRouter } from 'next/router';
// animations
import { m } from 'framer-motion';
// next
import NextLink from 'next/link';
// react
import { useState, useEffect } from 'react';
// axios
import axios from 'src/lib/axios';
// @mui
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Container,
  Avatar,
  Card,
  Rating,
  Snackbar,
  Alert,
  FormControl as Form,
} from '@mui/material';
// hooks
import { useResponsive } from 'src/hooks';
// components
import Iconify from 'src/components/iconify';
import { MotionContainer, varBounce } from 'src/components/animate';
import CompanyPicture from 'src/features/orders/components/questionnaire/completed/CompanyPicture';
// types
import { ICompanyProps } from 'src/types/company';
import { ISnackbarProps } from 'src/types/snackbar';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';

//

// ----------------------------------------------------------------------

type Props = {
  update?: boolean;
};

export default function ReviewPageView({ update }: Props) {
  const router = useRouter();
  const [companyInfo, setCompanyInfo] = useState<ICompanyProps>();
  const [loading, setLoading] = useState<boolean>(true);
  const [prevReview, setPrevReview] = useState<{ id: string }>();
  const [reviewRating, setReviewRating] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [reviewComment, setReviewComment] = useState<string>();
  const isMdUp = useResponsive('up', 'md');
  const [showSnackbar, setShowSnackbar] = useState<ISnackbarProps>({
    show: false,
    severity: 'success',
    message: '',
  });

  useEffect(() => {
    if (router.isReady) {
      setLoading(true);
      const companyId = router.asPath.split('/')[2];
      const fetchCompany = async () => {
        const response = await axios.get(`/health-units/${companyId}`);
        setCompanyInfo(response.data);
      };

      fetchCompany();
      if (update) {
        const fetchPrevReview = async () => {
          const response = await axios.get(`/customers/health-units/${companyId}/reviews`);
          console.log('Prev review', response.data);
          setPrevReview({
            id: response.data._id,
          });
          setReviewRating(response.data.rating);
          setReviewComment(response.data.comment);
        };
        fetchPrevReview();
      }
      setLoading(false);
    }
  }, [router.asPath, router.isReady]);

  const handleSubmitReview = async () => {
    try {
      if (update) {
        await axios.put(`/health-units/reviews/${prevReview?.id}`, {
          comment: reviewComment,
          rating: reviewRating,
        });
      } else {
        await axios.post(`/health-units/${companyInfo?._id}/reviews`, {
          comment: reviewComment,
          rating: reviewRating,
        });
      }
      setSubmitted(true);
    } catch (error) {
      console.error('error:', error?.error?.message);
      setShowSnackbar({
        show: true,
        severity: 'error',
        message: 'Algo correu mal, tente de novo.',
      });
    }
  };

  return loading ? (
    <LoadingScreen />
  ) : (
    <>
      <Snackbar
        open={showSnackbar.show}
        autoHideDuration={3000}
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
          pt: { xs: 5, md: 15 },
          pb: { xs: 8, md: 15 },
          gap: 10,
          display: 'grid',
          alignItems: 'flex-start',
          gridTemplateColumns: { md: 'repeat(2, 1fr)' },
        }}
      >
        {isMdUp && (
          <Card
            sx={{
              mb: 8,
              height: '100%',
              position: 'relative',
            }}
          >
            {companyInfo && (
              <CompanyPicture
                name={companyInfo.business_profile.name}
                image={companyInfo.business_profile.logo}
                location={companyInfo.addresses[0].city}
              />
            )}
          </Card>
        )}

        <Stack spacing={5}>
          <Typography variant="h2">{!submitted ? 'Avaliação de Empresa' : ''}</Typography>
          {!isMdUp && (
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Avatar
                src={companyInfo?.business_profile.logo}
                sx={{ width: '160px', height: '160px' }}
              />
              <Typography variant="h3" sx={{ fontSize: '26px', fontWeight: '600' }}>
                {companyInfo?.business_profile.name}
              </Typography>
            </Box>
          )}
          <Form sx={{ gap: 2, width: '100%' }}>
            {!submitted && (
              <>
                <Typography
                  variant="overline"
                  sx={{ color: 'text.secondary', display: 'block', textAlign: 'left' }}
                >
                  Classificação
                </Typography>

                <Rating
                  name="simple-controlled"
                  value={reviewRating}
                  size="large"
                  onChange={(event, newValue) => {
                    if (newValue) setReviewRating(newValue);
                  }}
                />
                <Typography
                  variant="overline"
                  sx={{ color: 'text.secondary', display: 'block', textAlign: 'left' }}
                >
                  Comentários
                </Typography>
                <TextField
                  multiline
                  minRows={5}
                  hiddenLabel
                  value={reviewComment}
                  onChange={(event) => setReviewComment(event.target.value)}
                />
                <Button
                  onClick={handleSubmitReview}
                  size="large"
                  sx={{ bgColor: 'primary.main', width: '100%', mt: 4 }}
                  variant="contained"
                  disabled={
                    reviewRating < 1 ||
                    reviewRating > 5 ||
                    !reviewComment ||
                    reviewComment.trim() === ''
                  }
                >
                  Submeter
                </Button>
              </>
            )}
            {submitted && (
              <Box sx={{ textAlign: 'center' }}>
                <m.div variants={varBounce().in}>
                  <Iconify
                    icon="bxs:check-circle"
                    sx={{ color: 'green' }}
                    width="100px"
                    height="100px"
                  />
                </m.div>
                <Stack spacing={1} sx={{ my: 5 }}>
                  <Typography variant="h3">
                    A sua avaliação foi {update ? 'atualizada' : 'submetida'} com sucesso!
                  </Typography>

                  <Typography sx={{ color: 'text.secondary' }}>
                    Obrigado por contribuir para o melhoramento da nossa plataforma.
                  </Typography>
                </Stack>
                <Button
                  component={NextLink}
                  href="/"
                  size="large"
                  color="inherit"
                  variant="contained"
                  startIcon={<Iconify icon="carbon:chevron-left" />}
                >
                  Voltar
                </Button>
              </Box>
            )}
          </Form>
        </Stack>
      </Container>
    </>
  );
}
