import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from 'src/contexts';
// router
import { useRouter } from 'next/router';
// @mui
import { Stack, Container, Typography, Unstable_Grid2 as Grid } from '@mui/material';
// axios
import axios from 'src/lib/axios';
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
import CheckoutSummary from '../components/CheckoutSummary';
import CheckoutQuestionnaireInfo from '../components/CheckoutQuestionnaireInfo';

// ----------------------------------------------------------------------

type OrderRequestProps = {
  company: string;
  user: string;
  relative: string;
  services: string[];
  schedule_information: {
    start_date: Date;
    recurrency: number;
    schedule: IScheduleProps[];
  };
};

export default function CheckoutView() {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [relativesLoading, setRelativesLoading] = useState<boolean>(true);
  const [userRelatives, setUserRelatives] = useState<IRelativeProps[]>();
  const [companyInfo, setCompanyInfo] = useState<ICompanyProps>();
  const [availableServices, setAvailableServices] = useState<IServiceProps[]>([]);
  const [formData, setFormData] = useState<OrderRequestProps>();
  const [selectedCard, setSelectedCard] = useState();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [orderInfo, setOrderInfo] = useState();
  const [selectedWeekdays, setSelectedWeekdays] = useState<number[]>([]);
  const router = useRouter();
  const { user } = useAuthContext();

  const fetchUserRelatives = async () => {
    try {
      const response = await axios.get('users/relatives');
      setUserRelatives(response.data.data);
      console.log(response.data.data);
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
      const response = await axios.get(`/companies/${companyId}`);
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
        const response = await axios.get(`/users/orders/${orderId}`);
        setOrderInfo(response.data);
        const auxWeekdays: number[] = [];
        response.data.schedule_information.schedule.forEach((item) => {
          auxWeekdays.push(item.week_day);
        });
        setSelectedWeekdays(auxWeekdays);
        console.log('order info:', response.data);
        fetchCompany(response.data.company._id);
      } catch (error) {
        console.log('error fetching order:', error);
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

  const { reset, getValues } = methods;

  const onCheckoutSubmit = () => {
    console.log('Submit card:', selectedCard);
  };

  return !loading && !relativesLoading ? (
    <Container
      sx={{
        overflow: 'hidden',
        pt: 5,
        pb: { xs: 8, md: 15 },
      }}
    >
      <Typography variant="h2" sx={{ mb: 5, mt: 10 }}>
        Checkout
      </Typography>

      <FormProvider
        key="checkout_view_form"
        methods={methods}
        onSubmit={() => {
          // submit when "confirmar pagamento" button is clicked
          console.log('values:', getValues());
          // router.push('/merda');
        }}
      >
        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={7}>
            <Stack>
              {userRelatives && (
                <CheckoutQuestionnaireInfo
                  onPaymentMethodSelect={(card) => setSelectedCard(card)}
                  relatives={userRelatives}
                  selectedRelative={orderInfo.relative}
                  checkoutVersion
                  services={availableServices}
                  onValidChange={() => {}}
                  selectedWeekdays={selectedWeekdays}
                  selectedServices={orderInfo.services}
                  selectedRecurrency={orderInfo.schedule_information.recurrency}
                  schedule={orderInfo.schedule_information.schedule}
                  startDate={new Date(orderInfo.schedule_information.start_date)}
                />
              )}
            </Stack>
          </Grid>

          <Grid xs={12} md={5}>
            {companyInfo && (
              <CheckoutSummary
                handleSubmit={onCheckoutSubmit}
                disabled={!selectedCard}
                subtotal={orderInfo.order_total}
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
