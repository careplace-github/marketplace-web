// hooks
import { useState } from 'react';
// @mui
import {
  Stack,
  Box,
  Switch,
  Collapse,
  Typography,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// components
import { RHFTextField } from 'src/components/hook-form';
import {
  FilterServices,
  FilterWeekdays,
  FilterRecurrency,
} from 'src/features/companies/components';
import { IServiceProps } from 'src/types/utils';

// ----------------------------------------------------------------------

type Props = {
  services: IServiceProps[];
  sameBilling: boolean;
  onChangeSameBilling: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function OrderQuestionnaireShippingForm({
  sameBilling,
  onChangeSameBilling,
  services,
}: Props) {
  const [filterServices, setFilterServices] = useState<IServiceProps[]>([]);
  const [filterWeekdays, setFilterWeekdays] = useState<number[]>([]);
  const [filterRecurrency, setFilterRecurrency] = useState<number>();
  const [startDate, setStartDate] = useState<Date>();
  const handleChangeServices = (keyword: IServiceProps[]) => {
    setFilterServices(keyword);
  };

  const handleChangeWeekdays = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;
    const newFilter = value as number[];
    setFilterWeekdays(newFilter);
  };

  const handleChangeRecurrency = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;
    const newFilter = value as number[];
    setFilterRecurrency(newFilter);
  };

  return (
    <Stack spacing={5}>
      <StepLabel title="Informação do Pedido" step="1" />
      <div>
        <Stack spacing={2.5} sx={{ mb: '24px' }}>
          <Stack spacing={{ xs: 2.5, md: 2 }} direction={{ xs: 'column', md: 'row' }}>
            {/* <RHFTextField name="billingAddress.firstName" label="First Name" /> */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block' }}>
                Serviços
              </Typography>
              <FilterServices
                services={services}
                filterServices={filterServices}
                onChangeServices={handleChangeServices}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block' }}>
                Dias da semana
              </Typography>
              <FilterWeekdays
                filterWeekdays={filterWeekdays}
                onChangeWeekdays={handleChangeWeekdays}
              />
            </Box>
          </Stack>
          <Stack spacing={{ xs: 2.5, md: 2 }} direction={{ xs: 'column', md: 'row' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block' }}>
                Recurrência
              </Typography>
              <FilterRecurrency
                filterRecurrency={filterRecurrency}
                onChangeRecurrency={handleChangeRecurrency}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block' }}>
                Data de ínicio
              </Typography>
              <DatePicker
                slotProps={{
                  textField: {
                    hiddenLabel: true,
                  },
                }}
                onChange={(newDate) => setStartDate(newDate)}
                format="dd-MM-yyyy"
                value={new Date()}
                minDate={new Date()}
              />
            </Box>
          </Stack>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
            <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block' }}>
              Segunda Feira
            </Typography>

            <Stack gap="10px" direction="row">
              <TimePicker
                ampm={false}
                seconds={false}
                sx={{ flex: 1 }}
                slotProps={{
                  textField: {
                    hiddenLabel: true,
                  },
                }}
              />
              <Typography
                variant="overline"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'text.secondary',
                }}
              >
                -
              </Typography>
              <TimePicker
                ampm={false}
                seconds={false}
                sx={{ flex: 1 }}
                slotProps={{
                  textField: {
                    hiddenLabel: true,
                  },
                }}
              />
            </Stack>
          </Box>
        </Stack>
      </div>

      <StepLabel title="Escolha o Familiar" step="2" />

      <div>
        <Stack
          sx={{ mt: '24px' }}
          spacing={3}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent={{ md: 'space-between' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          <Typography variant="overline" sx={{ color: 'text.secondary' }}>
            Shipping Address
          </Typography>
          <FormControlLabel
            control={<Switch checked={sameBilling} onChange={onChangeSameBilling} />}
            label="Same as Billing Address"
            labelPlacement="start"
          />
        </Stack>

        <Collapse
          in={!sameBilling}
          unmountOnExit
          sx={{
            ...(!sameBilling && { mt: 3 }),
          }}
        >
          <Stack spacing={2.5}>
            <Stack spacing={{ xs: 2.5, md: 2 }} direction={{ xs: 'column', md: 'row' }}>
              <RHFTextField name="shippingAddress.firstName" label="First Name" />
              <RHFTextField name="shippingAddress.lastName" label="Last Name" />
            </Stack>
            <RHFTextField name="shippingAddress.fullAddress" label="Full Address" />
            <RHFTextField name="shippingAddress.fullAddress2" label="Full Address2" />
          </Stack>
        </Collapse>
      </div>
    </Stack>
  );
}

// -------------------------------- //

type StepLabelProps = {
  step: string;
  title: string;
};

function StepLabel({ step, title }: StepLabelProps) {
  return (
    <Stack direction="row" alignItems="center" sx={{ mb: 3, typography: 'h5' }}>
      <Box
        sx={{
          mr: 1.5,
          width: 28,
          height: 28,
          flexShrink: 0,
          display: 'flex',
          typography: 'h6',
          borderRadius: '50%',
          alignItems: 'center',
          bgcolor: 'primary.main',
          justifyContent: 'center',
          color: 'primary.contrastText',
        }}
      >
        {step}
      </Box>
      {title}
    </Stack>
  );
}
