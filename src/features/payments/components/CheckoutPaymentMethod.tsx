// form
import { useFormContext, Controller } from 'react-hook-form';
import { useEffect } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Stack, Radio, RadioGroup, FormControlLabel } from '@mui/material';
// components
import Iconify from 'src/components/iconify';
import EmptyState from 'src/components/empty-state/EmptyState';

// ----------------------------------------------------------------------

type OptionProps = {
  label: string;
  value: string;
  description: string;
};

type Props = {
  options: OptionProps[];
};

export default function CheckoutPaymentMethod({ options }: Props) {
  const { control } = useFormContext();

  return options.length > 0 ? (
    <Controller
      name="paymentMethodSelect"
      control={control}
      render={({ field }) => (
        <RadioGroup {...field}>
          <Box
            rowGap={2.5}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
          >
            {options.map((option) => (
              <OptionItem
                key={option.value}
                option={option}
                selected={field.value === option.value}
              />
            ))}
          </Box>
        </RadioGroup>
      )}
    />
  ) : (
    <EmptyState
      icon="uil:atm-card"
      title="Sem cartões adicionados"
      description="Neste momento não tem nenhum método de pagamento associado."
    />
  );
}

// ----------------------------------------------------------------------

type OptionItemProps = {
  option: OptionProps;
  selected: boolean;
};

function OptionItem({ option, selected }: OptionItemProps) {
  const { value, label, description } = option;

  const renderLabel = (
    <Stack flexGrow={1} spacing={0.5} sx={{ width: 1 }}>
      <Stack direction="row" alignItems="center">
        <Box component="span" sx={{ typography: 'subtitle1', flexGrow: 1 }}>
          {label}
        </Box>

        <Iconify
          icon={
            (value === 'visa' && 'logos:visa') ||
            (value === 'mastercard' && 'logos:mastercard') ||
            'logos:paypal'
          }
          width={24}
        />
      </Stack>

      <Box component="span" sx={{ typography: 'body2' }}>
        {description}
      </Box>
    </Stack>
  );

  return (
    <FormControlLabel
      value={value}
      control={
        <Radio
          disableRipple
          checkedIcon={<Iconify color="primary.main" width={24} icon="carbon:checkmark-outline" />}
          sx={{ mx: 1, color: (theme) => alpha(theme.palette.grey[500], 0.24) }}
        />
      }
      label={renderLabel}
      sx={{
        m: 0,
        py: 3,
        pr: 2,
        borderRadius: 1,
        border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
        ...(selected && {
          boxShadow: (theme) => `0 0 0 2px ${theme.palette.primary.main}`,
        }),
        '& .MuiFormControlLabel-label': {
          width: 1,
        },
      }}
    />
  );
}
