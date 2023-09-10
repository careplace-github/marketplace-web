import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// router
import { useRouter } from 'next/router';
// @mui
import {
  Stack,
  Container,
  Typography,
  Unstable_Grid2 as Grid,
  Snackbar,
  Alert,
} from '@mui/material';
// lib
import fetch from 'src/lib/fetch';
// types
import { ICompanyProps } from 'src/types/company';
import { IServiceProps } from 'src/types/utils';
import { IRelativeProps } from 'src/types/relative';
import { ISnackbarProps } from 'src/types/snackbar';
// utils
import { getAvailableServices } from 'src/utils/getAvailableServices';
import { PATHS } from 'src/routes';
// components
import FormProvider from 'src/components/hook-form';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import Page404 from 'src/pages/404';
//
import { useSession } from 'next-auth/react';
import CheckoutSummary from '../components/CheckoutSummary';
import CheckoutQuestionnaireInfo from '../components/CheckoutQuestionnaireInfo';

// ----------------------------------------------------------------------

type BillingDetailsProps = {
  name: string;
  nif: string;
  address: {
    street: string;
    postal_code: string;
    city: string;
    country: string;
  };
};

type CardProps = {
  id: string;
};

export default function CheckoutView() {
  const [loading, setLoading] = useState<boolean>(true);
  const [relativesLoading, setRelativesLoading] = useState<boolean>(true);
  const [userRelatives, setUserRelatives] = useState<IRelativeProps[]>();
  const [companyInfo, setCompanyInfo] = useState<ICompanyProps>();
  const [availableServices, setAvailableServices] = useState<IServiceProps[]>([]);
  const [billingDetails, setBillingDetails] = useState<BillingDetailsProps>();
  const [selectedCard, setSelectedCard] = useState<CardProps>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [orderInfo, setOrderInfo] = useState<any>();
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [selectedWeekdays, setSelectedWeekdays] = useState<number[]>([]);
  const [discountCode, setDiscountCode] = useState<string>();
  const [invalidCardAlreadySubmitted, setInvalidCardAlreadySubmitted] = useState<boolean>(false);
  const router = useRouter();
  const [showSnackbar, setShowSnackbar] = useState<ISnackbarProps>({
    show: false,
    severity: 'success',
    message: '',
  });

  const { data: user } = useSession();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const orderId = router.asPath.split('/').at(2);
        const response = await fetch(`/api/orders/home-care/${orderId}`, {
          method: 'GET',
        });

        const order = response.data;

        if (order?.stripe_information?.subscription_id) {
          setLoading(true);
          router.push(PATHS.orders.view(order._id));
        }

        setOrderInfo(order);

        const auxWeekdays: number[] = [];
        response.data.schedule_information.schedule.forEach((item) => {
          auxWeekdays.push(item.week_day);
        });
        setSelectedWeekdays(auxWeekdays);
        fetchCompany(response.data.health_unit._id);
      } catch (error) {
        if (error?.error?.type === 'FORBIDDEN') {
          router.push('/404');
        }
        console.error(error);
      }
    };
    if (router.isReady) {
      fetchData();
    }
  }, [router.isReady]);

  const fetchUserRelatives = async () => {
    try {
      const response = await fetch(`/api/patients`, {
        method: 'GET',
      });
      setUserRelatives(response.data.data);
    } catch (error) {
      console.error(error);
    }
    setRelativesLoading(false);
  };

  useEffect(() => {
    fetchUserRelatives();
  }, []);

  const fetchCompany = async (companyId) => {
    try {
      const response = await fetch(`/api/health-units/${companyId}`, {
        method: 'GET',
      });
      setCompanyInfo(response.data);
      const available = await getAvailableServices(response.data.services);
      setAvailableServices(available);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const CheckoutSchema = Yup.object().shape({
    billingAddress: Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      fullAddress: Yup.string().required('Full address is required'),
    }),
    paymentMethods: Yup.object().shape({
      card: Yup.object().shape({
        cardNumber: Yup.string().test((number) => !!number),
      }),
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
      methods: '',
      card: {
        cardNumber: '',
        cardHolder: '',
        expirationDate: '',
        ccv: '',
      },
    },
    paymentMethodSelect: {
      label: '',
      value: '',
      description: '',
    },
  };

  const methods = useForm({
    resolver: yupResolver(CheckoutSchema),
    defaultValues,
  });

  const onCheckoutSubmit = async () => {
    setIsSubmitting(true);
    const orderId = router.asPath.split('/').at(2);
    try {
      const response = await fetch(`/api/payments/orders/home-care/${orderId}/subscription`, {
        method: 'POST',
        body: JSON.stringify({
          payment_method: selectedCard?.id,
          promotion_code: discountCode,
          billing_details: {
            name: billingDetails?.name,
            email: user?.email,
            tax_id: billingDetails?.nif,
            address: {
              street: billingDetails?.address.street,
              city: billingDetails?.address.city,
              country: billingDetails?.address.country,
              postal_code: billingDetails?.address.postal_code,
            },
          },
        }),
      });

      if (invalidCardAlreadySubmitted) {
        await fetch(`/api/payments/orders/home-care/${orderInfo._id}/subscription/payment-method`, {
          method: 'PUT',
          body: JSON.stringify({ payment_method: selectedCard?.id }),
        });

        await fetch(
          `/api/payments/orders/home-care/${orderInfo._id}/subscription/billing-details`,
          {
            method: 'PUT',
            body: JSON.stringify({
              billing_details: {
                name: billingDetails?.name,
                email: user?.email,
                tax_id: billingDetails?.nif,
                address: {
                  street: billingDetails?.address.street,
                  city: billingDetails?.address.city,
                  country: billingDetails?.address.country,
                  postal_code: billingDetails?.address.postal_code,
                },
              },
            }),
          }
        );
      }
      router.push(PATHS.orders.checkoutSucess(orderId || ''));
    } catch (error) {
      if (error?.error?.type === 'PAYMENT_REQUIRED') {
        setInvalidCardAlreadySubmitted(true);
      }
      if (error?.error?.message === 'Order already has a subscription') {
        setShowSnackbar({
          show: true,
          severity: 'error',
          message: 'Já foi confirmado um pagamento para este pedido ',
        });
        return;
      }
      setShowSnackbar({
        show: true,
        severity: 'error',
        message: 'Algo correu mal, tente de novo.',
      });
    }
    setIsSubmitting(false);
  };

  const handleBillingDetailsChange = (details) => {
    setBillingDetails(details);
  };

  useEffect(() => {
    const isNifValid = (value) => {
      if (value.length === 11 && value[3] === ' ' && value[7] === ' ') return true;
      return false;
    };
    const isPostalCodeValid = (value) => {
      if (value.length === 8 && value[4] === '-') return true;
      return false;
    };

    const disable =
      !selectedCard ||
      !billingDetails?.name ||
      (billingDetails?.nif && !isNifValid(billingDetails?.nif)) ||
      !billingDetails?.address.street ||
      !billingDetails?.address.city ||
      !billingDetails?.address.country ||
      !isPostalCodeValid(billingDetails?.address.postal_code);
    if (disable) {
      setSubmitButtonDisabled(true);
    } else {
      setSubmitButtonDisabled(false);
    }
  }, [billingDetails, selectedCard]);

  return !loading && !relativesLoading ? (
    <Container
      sx={{
        overflow: 'hidden',
        pt: 5,
        pb: { xs: 8, md: 15 },
      }}
    >
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
      <Typography variant="h2" sx={{ mb: 5, mt: 10 }}>
        Checkout
      </Typography>

      <FormProvider key="checkout_view_form" methods={methods}>
        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={7}>
            <Stack>
              {userRelatives && (
                <CheckoutQuestionnaireInfo
                  onPaymentMethodSelect={(card) => setSelectedCard(card)}
                  relatives={userRelatives}
                  selectedRelative={orderInfo?.patient}
                  checkoutVersion
                  services={availableServices}
                  onValidChange={() => {}}
                  selectedWeekdays={selectedWeekdays}
                  selectedServices={orderInfo?.services}
                  selectedRecurrency={orderInfo?.schedule_information?.recurrency}
                  schedule={orderInfo?.schedule_information?.schedule}
                  startDate={new Date(orderInfo?.schedule_information?.start_date)}
                  onBillingDetailsChange={handleBillingDetailsChange}
                />
              )}
            </Stack>
          </Grid>

          <Grid xs={12} md={5}>
            {companyInfo && (
              <CheckoutSummary
                hasSubsciptionId={!!orderInfo?.stripe_information?.subscription_id}
                handleSubmit={onCheckoutSubmit}
                disabled={submitButtonDisabled}
                subtotal={orderInfo?.order_total}
                company={companyInfo}
                isSubmitting={isSubmitting}
                onDiscountApplied={(code) => setDiscountCode(code)}
                orderStatus={orderInfo.status}
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
