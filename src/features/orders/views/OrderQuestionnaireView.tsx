import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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
// utils
import { getAvailableServices } from 'src/utils/getAvailableServices';
// components
import FormProvider from 'src/components/hook-form';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
//
import { OrderQuestionnaireSummary, OrderQuestionnaireShippingForm } from '../components';
import { IServiceProps } from 'src/types/utils';

// ----------------------------------------------------------------------

export default function OrderQuestionnaireView() {
  const [sameBilling, setSameBilling] = useState(false);
  const [departureDay, setDepartureDay] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [companyInfo, setCompanyInfo] = useState<ICompanyProps>();
  const [availableServices, setAvailableServices] = useState<IServiceProps[]>([]);
  const router = useRouter();

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

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeDepartureDay = (newValue) => {
    setDepartureDay(newValue);
  };

  const handleIncrementGuests = (guest) => {
    if (guest === 'children') {
      setGuests({ ...guests, children: guests.children + 1 });
    } else {
      setGuests({ ...guests, adults: guests.adults + 1 });
    }
  };

  const handleDecreaseGuests = (guest) => {
    if (guest === 'children') {
      setGuests({ ...guests, children: guests.children - 1 });
    } else {
      setGuests({ ...guests, adults: guests.adults - 1 });
    }
  };

  const handleChangeSameBilling = (event) => {
    setSameBilling(event.target.checked);
  };

  return !loading ? (
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

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={7}>
            <Stack>
              <OrderQuestionnaireShippingForm
                services={availableServices}
                sameBilling={sameBilling}
                onChangeSameBilling={handleChangeSameBilling}
              />
            </Stack>
          </Grid>

          <Grid xs={12} md={5}>
            <OrderQuestionnaireSummary
              guests={guests}
              company={companyInfo}
              departureDay={departureDay}
              isSubmitting={isSubmitting}
              onDecreaseGuests={handleDecreaseGuests}
              onIncrementGuests={handleIncrementGuests}
              onChangeDepartureDay={handleChangeDepartureDay}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  ) : (
    <LoadingScreen />
  );
}
