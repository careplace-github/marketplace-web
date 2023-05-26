import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from 'src/contexts';
// router
import { useRouter } from 'next/router';
// @mui
import { Box, Stack, Divider, Container, Typography, Unstable_Grid2 as Grid } from '@mui/material';
// _mock
import { _tours as _companies } from 'src/_mock';
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
import { OrderQuestionnaireSummary, OrderQuestionnaireShippingForm } from '../components';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

// const requestBody = {
//   company: { type: Schema.ObjectId, ref: 'Company', required: true },

//   // The customer is the user that is paying for the order
//   user: { type: Schema.ObjectId, ref: 'marketplace_users', required: true },

//   // The client is the user that is receiving the service (home care support).
//   relative: { type: Schema.ObjectId, ref: 'Relative', required: true },

//   services: [{ type: Schema.ObjectId, ref: 'Service', required: true }],

//   // Json with all the information about the order schedule
//   schedule_information: {
//     start_date: startDate,

//     // 0 -> Every 0 weeks -> Not recurrent, one time only order.
//     // 1 -> Every 1 week -> Weekly
//     // 2 -> Every 2 weeks -> Biweekly
//     // 4 -> Every 4 weeks -> Monthly
//     recurrency: recurrency,
//     schedule: [
//       {
//         week_day: {
//           type: Number,
//           required: true,
//           enum: [1, 2, 3, 4, 5, 6, 7],
//         },
//         start: { type: Date, required: true },
//         end: { type: Date, required: true },
//       },
//     ],
//   },
// };

type OrderRequestProps = {
  companyId: string;
  userId: string;
  relative: string;
  services: string[];
  scheduleInfo: {
    startDate: Date;
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
  const router = useRouter();
  const { user } = useAuthContext();

  const fetchUserRelatives = async () => {
    const response = await axios.get('users/relatives');
    setUserRelatives(response.data.data);
    setRelativesLoading(false);
    console.log(response.data.data);
  };

  useEffect(() => {
    fetchUserRelatives();
  }, []);

  useEffect(() => {
    if (router.isReady) {
      const fetchCompany = async (companyId) => {
        const response = await axios.get(`/companies/${companyId}`);
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
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
    } catch (error) {
      console.error(error);
    }
    setIsSubmitting(false);
  };

  const handleValidChange = (valid, data) => {
    if (valid) {
      const dataToSubmit: OrderRequestProps = {
        company: companyInfo._id,
        user: user._id,
        relative: data.relativeSelected,
        services: data.servicesSelected,
        scheduleInfo: {
          startDate: data.startDateSelected,
          recurrency: data.recurrency,
          schedule: data.schedule,
        },
      };
      setFormData(dataToSubmit);
    }
    setIsFormValid(valid);
  };

  useEffect(() => {
    console.log('data to submit:', formData);
  }, [formData]);

  return !loading && !relativesLoading ? (
    <Container
      sx={{
        overflow: 'hidden',
        pt: 5,
        pb: { xs: 8, md: 15 },
      }}
    >
      <Typography variant="h2" sx={{ mb: 5 }}>
        Orçamento
      </Typography>

      <FormProvider methods={methods} onSubmit={() => {}}>
        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={7}>
            <Stack>
              {userRelatives && (
                <OrderQuestionnaireShippingForm
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
