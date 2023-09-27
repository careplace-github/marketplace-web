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
  Button,
} from '@mui/material';
// fetch

import fetch from 'src/lib/fetch';
// types
import { ICompanyProps } from 'src/types/company';
import { IServiceProps } from 'src/types/utils';
import { IRelativeProps } from 'src/types/relative';
import { ISnackbarProps } from 'src/types/snackbar';
import { IScheduleProps } from 'src/types/order';
//
import isObjectEmpty from 'src/utils/functions';
import { useSession } from 'next-auth/react';
// utils
import { getAvailableServices } from 'src/utils/getAvailableServices';
import { PATHS } from 'src/routes';
// components
import CheckoutSummary from 'src/features/payments/components/CheckoutSummary';
import ConfirmPhoneModal from 'src/components/confirm-phone-modal/ConfirmPhoneModal';
import CheckoutQuestionnaireInfo from 'src/features/payments/components/CheckoutQuestionnaireInfo';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import { OrderQuestionnaireForm, OrderQuestionnaireSummary } from '../components';
import CancelOrderModal from '../components/cancel-order-modal/CancelOrderModal';

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

type CardProps = {
  id: string;
};

export default function OrderView() {
  const [loading, setLoading] = useState<boolean>(true);
  const [relativesLoading, setRelativesLoading] = useState<boolean>(true);
  const [userRelatives, setUserRelatives] = useState<IRelativeProps[]>();
  const [companyInfo, setCompanyInfo] = useState<ICompanyProps>();
  const [availableServices, setAvailableServices] = useState<IServiceProps[]>([]);
  const [showConfirmPhoneModal, setShowConfirmPhoneModal] = useState<boolean>(false);
  const [firstBillingDetailsData, setFirstBillingDetailsData] = useState<
    BillingDetailsProps | 'not fetched'
  >('not fetched');
  const [billingDetails, setBillingDetails] = useState<BillingDetailsProps>();
  const [selectedCard, setSelectedCard] = useState<CardProps>();
  const [orderInfo, setOrderInfo] = useState<any>();
  const [selectedWeekdays, setSelectedWeekdays] = useState<number[]>([]);
  const [discountCode, setDiscountCode] = useState<string>();
  const [previousPaymentMethod, setPreviousPaymentMethod] = useState<string>();
  const [disableSubmitButton, setDisableSubmitButton] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [customIsDirty, setCustomIsDirty] = useState<boolean>(false);
  const [dataToSubmit, setDataToSubmit] = useState<any>();
  const [showCancelOrderModal, setShowCancelOrderModal] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState<ISnackbarProps>({
    show: false,
    severity: 'success',
    message: '',
  });
  const router = useRouter();

  const { data: user } = useSession();

  const fetchUserRelatives = async () => {
    try {
      const response = await fetch(`/api/patients`, {
        method: 'GET',
      });
      setUserRelatives(response.data);
      setRelativesLoading(false);
    } catch (error) {
      console.error(error);
      setRelativesLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRelatives();
  }, []);

  useEffect(() => {
    if (billingDetails) {
      const { address, nif } = billingDetails;
      const { city, country, postal_code, street } = address;
      if (
        // !customIsDirty ||
        !city ||
        !country ||
        !postal_code ||
        postal_code.length !== 8 ||
        !street ||
        (nif && nif.length !== 11)
      ) {
        setDisableSubmitButton(true);
        return;
      }
      setDisableSubmitButton(false);
    } else {
      setDisableSubmitButton(true);
    }
  }, [billingDetails, selectedCard, customIsDirty]);

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

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const orderId = router.asPath.split('/').at(2);
        const response = await fetch(`/api/orders/home-care/${orderId}`, {
          method: 'GET',
        });

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
          const auxBillingDetails = {
            name: response.data.billing_details.name || '',
            nif: response.data.billing_details.tax_id || '',
            address: {
              street: response.data.billing_details.address.street || '',
              postal_code: response.data.billing_details.address.postal_code || '',
              city: response.data.billing_details.address.city || '',
              country: response.data.billing_details.address.country || '',
            },
          };
          setFirstBillingDetailsData(auxBillingDetails);
          setBillingDetails(auxBillingDetails);
        }
        setSelectedWeekdays(auxWeekdays);
        setPreviousPaymentMethod(response.data.stripe_information?.payment_method || null);
        fetchCompany(response.data.health_unit._id);
      } catch (error) {
        console.error(error);
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

  useEffect(() => {
    if (
      (JSON.stringify(firstBillingDetailsData) === JSON.stringify(billingDetails) &&
        selectedCard?.id === previousPaymentMethod) ||
      !selectedCard
    ) {
      setCustomIsDirty(false);
    } else {
      setCustomIsDirty(true);
    }
  }, [billingDetails, firstBillingDetailsData, previousPaymentMethod, selectedCard]);

  const handleBillingDetailsChange = (details) => {
    setBillingDetails(details);
  };

  const updateOrderPayments = async () => {
    setIsSubmitting(true);
    try {
      await fetch(`/api/payments/orders/home-care/${orderInfo._id}/subscription/payment-method`, {
        method: 'PUT',
        body: JSON.stringify({ payment_method: selectedCard?.id || previousPaymentMethod }),
      });

      await fetch(`/api/payments/orders/home-care/${orderInfo._id}/subscription/billing-details`, {
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
      });

      setShowSnackbar({
        show: true,
        severity: 'success',
        message: 'Informações de Pagamento atualizadas com sucesso.',
      });
    } catch (error) {
      setIsSubmitting(false);
      console.error(error);
      setShowSnackbar({
        show: true,
        severity: 'error',
        message: 'Algo correu mal, tente novamente.',
      });
      return;
    }
    try {
      await fetch(`/api/payments/orders/home-care/${orderInfo._id}/subscription/charge`, {
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
    } catch (error) {
      console.error(error);
    }
    setIsSubmitting(false);
  };

  const handleValidChange = (valid, data) => {
    setDisableSubmitButton(!valid);
    setDataToSubmit(data);
  };

  const handleUpdateOrder = async () => {
    setIsSubmitting(true);
    if (!user?.phone_verified) {
      setIsSubmitting(false);
      try {
        await fetch(`/api/account/send-confirm-phone-code`, {
          method: 'POST',
          body: JSON.stringify({ email: user?.email }),
        });
      } catch (error) {
        console.error(error);
      }
      setShowConfirmPhoneModal(true);
      return;
    }
    try {
      const updatedOrder: OrderRequestProps = {
        health_unit: companyInfo?._id as string,
        patient: dataToSubmit?.relativeSelected,
        services: dataToSubmit?.servicesSelected,
        schedule_information: {
          start_date: dataToSubmit?.startDateSelected,
          recurrency: dataToSubmit?.recurrency,
          schedule: dataToSubmit?.schedule,
        },
      };

      await fetch(`/api/orders/home-care/${orderInfo._id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedOrder),
      });

      setShowSnackbar({
        show: true,
        severity: 'success',
        message: 'O seu pedido foi atualizado com sucesso.',
      });
    } catch (error) {
      console.error(error);
      setShowSnackbar({
        show: true,
        severity: 'error',
        message: 'Algo correu mal, tente novamente',
      });
    }
    setDisableSubmitButton(true);
    setIsSubmitting(false);
  };

  if (
    !loading &&
    !relativesLoading &&
    (orderInfo?.status === 'cancelled' || orderInfo.status === 'declined')
  ) {
    return (
      <Stack direction="column" alignItems="center" justifyContent="center">
        <Typography
          sx={{
            color: 'text.secondary',
            fontSize: '16px',
            width: '100%',
            textAlign: 'center',
            p: '30px',
            pt: '60px',
            pb: '0px',
          }}
        >
          {`Este pedido foi ${orderInfo.status === 'cancelled' ? 'cancelado' : 'recusado'}.`}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 10, textAlign: 'center' }}>
          <br />
          Se achar que isto é um erro por favor contacte-nos através do email{' '}
          <a href="mailto:suporte@careplace.pt"> suporte@careplace.pt </a>
        </Typography>
      </Stack>
    );
  }

  return !loading && !relativesLoading ? (
    <Container
      sx={{
        overflow: 'hidden',
        pt: 5,
        pb: { xs: 8, md: 15 },
      }}
    >
      <ConfirmPhoneModal
        setShowSnackbar={setShowSnackbar}
        open={showConfirmPhoneModal}
        onSuccess={() => {
          if (user) user.phone_verified = true;
          handleUpdateOrder();
        }}
        onClose={() => setShowConfirmPhoneModal(false)}
        updateOrder
      />
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
      <CancelOrderModal
        orderId={orderInfo?._id}
        onClose={() => setShowCancelOrderModal(false)}
        open={showCancelOrderModal}
      />

      <Grid container spacing={{ xs: 5, md: 8 }}>
        <Grid xs={12} md={7}>
          <Stack>
            {userRelatives && orderInfo.status !== 'new' && orderInfo.status !== 'accepted' && (
              <CheckoutQuestionnaireInfo
                methods={methods}
                isOrderView
                onPaymentMethodSelect={(card) => {
                  setSelectedCard(card);
                  setCustomIsDirty(true);
                  // setPreviousPaymentMethod(undefined);
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

            {userRelatives && (orderInfo.status === 'new' || orderInfo.status === 'accepted') && (
              <OrderQuestionnaireForm
                fetchUserRelatives={() => {
                  fetchUserRelatives();
                }}
                setShowSnackbar={setShowSnackbar}
                relatives={userRelatives}
                disableAllFields={orderInfo.status === 'accepted'}
                orderInfo={orderInfo || null}
                services={availableServices}
                onValidChange={handleValidChange}
              />
            )}
          </Stack>
        </Grid>

        <Grid xs={12} md={5}>
          {companyInfo && orderInfo.status !== 'new' && orderInfo.status !== 'accepted' && (
            <CheckoutSummary
              handleSubmit={updateOrderPayments}
              isOrderView
              disabled={disableSubmitButton}
              orderStatus={orderInfo.status}
              subtotal={orderInfo?.order_total}
              isSubmitting={isSubmitting}
              company={companyInfo}
              onDiscountApplied={(code) => setDiscountCode(code)}
              hasSubsciptionId={!!orderInfo?.stripe_information?.subscription_id}
            />
          )}
          {companyInfo && (orderInfo.status === 'new' || orderInfo.status === 'accepted') && (
            <OrderQuestionnaireSummary
              handleSubmit={handleUpdateOrder}
              disabled={disableSubmitButton}
              orderStatus={orderInfo.status}
              company={companyInfo}
              updateVersion
              isSubmitting={isSubmitting}
            />
          )}
        </Grid>
      </Grid>
      {orderInfo.status !== 'new' && (
        <Stack sx={{ alignItems: 'flex-start', justifyContent: 'flex-start', mt: '50px' }}>
          <Button
            onClick={() => setShowCancelOrderModal(true)}
            variant="outlined"
            sx={{
              backgroundColor: 'white',
              color: 'red',
              width: 'fit-content',
              height: '48px',
              borderColor: 'red',
              '& :hover': {
                backgroundColor: 'red',
                color: 'white',
              },
            }}
          >
            Cancelar Pedido
          </Button>
        </Stack>
      )}
    </Container>
  ) : (
    <LoadingScreen />
  );
}
