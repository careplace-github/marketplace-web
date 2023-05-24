// utils
import { recurrency } from 'src/data';
// @mui
import { MenuItem, Checkbox, FormControl, Typography } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
//
import { inputStyle, menuItemStyle, MenuProps } from './styles';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

type Props = {
  filterRecurrency: number;
  onChangeRecurrency: (event: SelectChangeEvent<number>) => void;
};

export default function FilterRecurrency({ filterRecurrency, onChangeRecurrency }: Props) {
  return (
    <FormControl fullWidth variant="filled" sx={inputStyle}>
      <Select
        displayEmpty
        value={filterRecurrency || ''}
        onChange={onChangeRecurrency}
        MenuProps={MenuProps}
        renderValue={(value) => {
          if (!value && value !== 0) {
            return (
              <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                Escolha a recurrência
              </Typography>
            );
          }
          let recurrencyText;
          recurrency.forEach((item) => {
            if (item.value === value) recurrencyText = item.text;
          });
          return (
            <Typography variant="subtitle2" component="span">
              {recurrencyText}
            </Typography>
          );
        }}
      >
        {recurrency.map((item) => (
          <MenuItem key={item.value} value={item.value} sx={menuItemStyle}>
            <Checkbox size="small" checked={filterRecurrency === item.value} />
            {item.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
