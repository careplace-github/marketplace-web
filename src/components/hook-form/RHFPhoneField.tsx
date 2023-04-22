// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
// 
import styled from 'styled-components';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  helperText?: string;
  focusOnSelectCountry?: boolean ;
  defaultCountry?: string ;
  forceCallingCode?: string;
  flagSize?: string | 'small';
};

/**
 * @see https://viclafouch.github.io/mui-tel-input/docs/css/
 */
// Country code font size should be the same has the input font size
const MuiTelInputStyled = styled(MuiTelInput)`
  .MuiTelInput-Input {
    font-size: 0.875rem;
  }

  .MuiTelInput-Typography-calling-code {
    font-size: 0.875rem;
    &.MuiTypography-root {
      font-size: 0.875rem;
    }
  }

  .MuiTypography-root {
    font-size: 0.875rem;
    margin-top: 1px;
  }
`;

/**
 * @see https://viclafouch.github.io/mui-tel-input/docs/api-reference/
 */
export default function RHFPhoneField({
  name,
  helperText,
  focusOnSelectCountry,
  defaultCountry,
  forceCallingCode,
  flagSize,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MuiTelInputStyled
          {...field}
          fullWidth
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          error={!!error}
          helperText={error ? error?.message : helperText}
          defaultCountry={defaultCountry}
          forceCallingCode={forceCallingCode}
          flagSize={flagSize || 'small'}
          focusOnSelectCountry={focusOnSelectCountry}
        />
      )}
    />
  );
}
