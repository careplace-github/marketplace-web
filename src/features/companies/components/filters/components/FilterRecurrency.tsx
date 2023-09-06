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
  filterRecurrency: number | undefined;
  onChangeRecurrency: (event: SelectChangeEvent<number>) => void;
  readOnly?: boolean;
};

export default function FilterRecurrency({
  readOnly = false,
  filterRecurrency,
  onChangeRecurrency,
}: Props) {
  return (
    <FormControl fullWidth variant="filled" sx={inputStyle}>
      <Select
        readOnly={!!readOnly}
        displayEmpty
        value={filterRecurrency || filterRecurrency === 0 ? filterRecurrency : ''}
        onChange={onChangeRecurrency}
        MenuProps={MenuProps}
        renderValue={(value) => {
          if (!value && value !== 0) {
            return (
              <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                Selecionar recorrência
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
