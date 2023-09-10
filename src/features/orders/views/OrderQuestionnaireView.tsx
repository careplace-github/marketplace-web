import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSession } from 'next-auth/react';
// router
import { useRouter } from 'next/router';
import { PATHS } from 'src/routes';
// @mui
import {
  Snackbar,
  Alert,
  Stack,
  Container,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
// lib
import fetch from 'src/lib/fetch';
// types
import { ICompanyProps } from 'src/types/company';
import { IServiceProps } from 'src/types/utils';
import { IRelativeProps } from 'src/types/relative';
import { IScheduleProps } from 'src/types/order';
// utils
import { getAvailableServices } from 'src/utils/getAvailableServices';
// components
import FormProvider from 'src/components/hook-form';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
//
import { ISnackbarProps } from 'src/types/snackbar';
import { OrderQuestionnaireSummary, OrderQuestionnaireForm } from '../components';

// ----------------------------------------------------------------------

type OrderRequestProps = {
  health_unit: string;
  patient: string;
  services: string[];
  schedule_information: {
    start_date: Date;
    recurrency: number;
    schedule: IScheduleProps[];
  };
};

export default function OrderQuestionnaireView() {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [relativesLoading, setRelativesLoading] = useState<boolean>(true);
  const [userRelatives, setUserRelatives] = useState<IRelativeProps[]>();
  const [companyInfo, setCompanyInfo] = useState<ICompanyProps>();
  const [availableServices, setAvailableServices] = useState<IServiceProps[]>([]);
  const [formData, setFormData] = useState<OrderRequestProps>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState<ISnackbarProps>({
    show: false,
    severity: 'success',
    message: '',
  });
  const router = useRouter();
  const { data: user } = useSession();

  const fetchUserRelatives = async () => {
    const response = await fetch(`/api/patients`, {
      method: 'GET',
    });
    setUserRelatives(response.data || []);

    setRelativesLoading(false);
  };

  useEffect(() => {
    fetchUserRelatives();
  }, []);

  useEffect(() => {
    if (router.isReady) {
      const fetchCompany = async (companyId) => {
        const response = await fetch(`/api/health-units${companyId}`, {
          method: 'GET',
        });
        setCompanyInfo(response.data);
        const available = await getAvailableServices(response.data.services);
        setAvailableServices(available);
        setLoading(false);
      };

      fetchCompany(router.query.id);
    }
  }, [router.isReady]);

  const [guests, setGuests] = useState({
    adults: 2,
    children: 1,
  });

  const TravelCheckoutSchema = Yup.object().shape({
    billingAddress: Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      fullAddress: Yup.string().required('Full address is required'),
    }),
  });

  const defaultValues = {
    billingAddress: {
      firstName: '',
      lastName: '',
      fullAddress: '',
      fullAddress2: '',
    },
    shippingAddress: {
      firstName: '',
      lastName: '',
      fullAddress: '',
      fullAddress2: '',
    },
    paymentMethods: {
      methods: 'paypal',
      card: {
        cardNumber: '',
        cardHolder: '',
        expirationDate: '',
        ccv: '',
      },
    },
  };

  const methods = useForm({
    resolver: yupResolver(TravelCheckoutSchema),
    defaultValues,
  });

  const { reset } = methods;

  const onSubmit = async (data) => {
    const canPlaceAnOrder = user?.email_verified && user?.phone_verified;
    if (!canPlaceAnOrder) {
      setShowSnackbar({
        show: true,
        severity: 'warning',
        message: 'Para fazer um pedido tem que ter o seu Email e Telémovel verificados.',
      });
      setIsSubmitting(false);
      return;
    }
    if (companyInfo && canPlaceAnOrder) {
      setIsSubmitting(true);
      try {
        const response = await fetch(`/api/orders/home-care`, {
          method: 'POST',
          body: JSON.stringify({
            ...formData,
          }),
        });

        reset();
        router.push(PATHS.orders.questionnaireCompleted(response.data._id));
      } catch (error) {
        console.error(error);
      }
      setIsSubmitting(false);
    }
  };

  const handleValidChange = (valid, data) => {
    if (valid && companyInfo && user) {
      const dataToSubmit: OrderRequestProps = {
        health_unit: companyInfo._id,
        patient: data.relativeSelected,
        services: data.servicesSelected,
        schedule_information: {
          start_date: data.startDateSelected,
          recurrency: data.recurrency,
          schedule: data.schedule,
        },
      };
      setFormData(dataToSubmit);
    }
    setIsFormValid(valid);
  };

  return !loading && !relativesLoading ? (
    <Container
      sx={{
        overflow: 'hidden',
        pt: 5,
        pb: { xs: 8, md: 15 },
      }}
    >
      {showSnackbar.show && (
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
      )}
      <Typography variant="h2" sx={{ mb: 5 }}>
        Orçamento
      </Typography>

      <FormProvider methods={methods} onSubmit={() => {}}>
        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={7}>
            <Stack>
              {userRelatives && (
                <OrderQuestionnaireForm
                  relatives={userRelatives}
                  services={availableServices}
                  onValidChange={handleValidChange}
                />
              )}
            </Stack>
          </Grid>

          <Grid xs={12} md={5}>
            {companyInfo && (
              <OrderQuestionnaireSummary
                handleSubmit={onSubmit}
                disabled={!isFormValid}
                company={companyInfo}
                isSubmitting={isSubmitting}
              />
            )}
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  ) : (
    <LoadingScreen />
  );
}
