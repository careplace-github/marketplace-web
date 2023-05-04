// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { MuiTelInput } from 'mui-tel-input';

import styled from 'styled-components';
// ----------------------------------------------------------------------

type Props = {
  phone?: string;
  name: string;
  defaultCountry?: string;
  label?: string;
  forceCallingCode?: boolean;
  helperText?: string;
  flagSize?: string;
  onChange?: (value: string) => void;
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
  forceCallingCode,
  defaultCountry,
  name,
  helperText,
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
          forceCallingCode={forceCallingCode}
          // defaultCountry={defaultCountry}
          // flagSize={flagSize || 'small'}
          helperText={error ? error?.message : helperText}
          onChange={field.onChange}
          {...other}
        />
      )}
    />
  );
}
