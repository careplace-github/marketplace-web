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
// axios
import axios from 'src/lib/axios';
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
//
import isObjectEmpty from 'src/utils/functions';
import { useAuthContext } from 'src/contexts';
import CheckoutSummary from 'src/features/payments/components/CheckoutSummary';
import CheckoutQuestionnaireInfo from 'src/features/payments/components/CheckoutQuestionnaireInfo';

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

export default function OrderView() {
  const [loading, setLoading] = useState<boolean>(true);
  const [relativesLoading, setRelativesLoading] = useState<boolean>(true);
  const [userRelatives, setUserRelatives] = useState<IRelativeProps[]>();
  const [companyInfo, setCompanyInfo] = useState<ICompanyProps>();
  const [availableServices, setAvailableServices] = useState<IServiceProps[]>([]);
  const [billingDetails, setBillingDetails] = useState<BillingDetailsProps>();
  const [selectedCard, setSelectedCard] = useState<CardProps>();
  const [orderInfo, setOrderInfo] = useState<any>();
  const [selectedWeekdays, setSelectedWeekdays] = useState<number[]>([]);
  const [discountCode, setDiscountCode] = useState<string>();
  const [previousPaymentMethod, setPreviousPaymentMethod] = useState<string>();
  const [disableSubmitButton, setDisableSubmitButton] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState<ISnackbarProps>({
    show: false,
    severity: 'success',
    message: '',
  });
  const router = useRouter();

  const { user } = useAuthContext();

  const fetchUserRelatives = async () => {
    try {
      const response = await axios.get('customers/patients');
      setUserRelatives(response.data.data);
    } catch (error) {
      console.log('error fetching relatives:', error);
    }
    setRelativesLoading(false);
  };

  useEffect(() => {
    fetchUserRelatives();
  }, []);

  const fetchCompany = async (companyId) => {
    try {
      const response = await axios.get(`/health-units/${companyId}`);
      setCompanyInfo(response.data);
      const available = await getAvailableServices(response.data.services);
      setAvailableServices(available);
    } catch (error) {
      console.log('error fetching companies:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const orderId = router.asPath.split('/').at(2);
        const response = await axios.get(`/customers/orders/home-care/${orderId}`);

        if (
          response.data.status === 'pending_payment' &&
          !response.data.stripe_information.subscription_id &&
          orderId
        ) {
          router.push(PATHS.orders.checkout(orderId));
          return;
        }
        setOrderInfo(response.data);
        const auxWeekdays: number[] = [];
        response.data.schedule_information.schedule.forEach((item) => {
          auxWeekdays.push(item.week_day);
        });
        if (!isObjectEmpty(response.data.billing_details)) {
          setBillingDetails({
            name: response.data.billing_details.name || '',
            nif: response.data.billing_details.tax_id || '',
            address: {
              street: response.data.billing_details.address.street || '',
              postal_code: response.data.billing_details.address.postal_code || '',
              city: response.data.billing_details.address.city || '',
              country: response.data.billing_details.address.country || '',
            },
          });
        }
        setSelectedWeekdays(auxWeekdays);
        setPreviousPaymentMethod(response.data.stripe_information?.payment_method || null);
        setSelectedCard(response.data.stripe_information?.payment_method || null);
        fetchCompany(response.data.health_unit._id);
      } catch (error) {
        if (error.error.type === 'FORBIDDEN') {
          router.push('/404');
        }
      }
    };
    if (router.isReady) {
      fetchData();
    }
  }, [router.isReady]);

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

  const handleBillingDetailsChange = (details) => {
    setBillingDetails(details);
  };

  const updateOrderPayments = async () => {
    try {
      await axios.put(`/payments/orders/${orderInfo._id}/subscription/payment-method`, {
        payment_method: selectedCard.id,
      });
      setShowSnackbar({
        show: true,
        severity: 'success',
        message: 'Informações de Pagamento atualizadas com sucesso.',
      });
      await axios.post(`payments/orders/${orderInfo._id}/subscription/charge`, {
        payment_method_id: selectedCard?.id,
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
      });
    } catch (error) {
      console.log('error', error);
    }
  };

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
      <Typography variant="h2" sx={{ mb: 5, mt: 10 }}>
        Pedido
      </Typography>

      <FormProvider key="checkout_view_form" methods={methods}>
        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={7}>
            <Stack>
              {userRelatives && (
                <CheckoutQuestionnaireInfo
                  isOrderView
                  onPaymentMethodSelect={(card) => {
                    setSelectedCard(card);
                    setPreviousPaymentMethod(null);
                  }}
                  relatives={userRelatives}
                  selectedRelative={orderInfo?.patient}
                  checkoutVersion
                  orderBillingDetails={billingDetails}
                  services={availableServices}
                  onValidChange={() => {}}
                  selectedWeekdays={selectedWeekdays}
                  selectedServices={orderInfo?.services}
                  selectedRecurrency={orderInfo?.schedule_information?.recurrency}
                  schedule={orderInfo?.schedule_information?.schedule}
                  startDate={new Date(orderInfo?.schedule_information?.start_date)}
                  onBillingDetailsChange={handleBillingDetailsChange}
                  orderStatus={orderInfo.status}
                  previousPaymentMethod={previousPaymentMethod}
                />
              )}
            </Stack>
          </Grid>

          <Grid xs={12} md={5}>
            {companyInfo && (
              <CheckoutSummary
                handleSubmit={updateOrderPayments}
                isOrderView
                disabled={disableSubmitButton}
                orderStatus={orderInfo.status}
                subtotal={orderInfo?.order_total}
                company={companyInfo}
                onDiscountApplied={(code) => setDiscountCode(code)}
                hasSubsciptionId={!!orderInfo?.stripe_information?.subscription_id}
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
