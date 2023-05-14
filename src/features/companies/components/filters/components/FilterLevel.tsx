// utils
import Weekdays from 'src/data/Weekdays';
import { WeekdaysProps } from 'src/types/utils';
// @mui
import { MenuItem, Checkbox, FormControl, Typography } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
//
import { inputStyle, menuItemStyle, MenuProps } from './styles';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

type Props = {
  filterLevel: WeekdaysProps[];
  onChangeLevel: (event: SelectChangeEvent<WeekdaysProps[]>) => void;
};

export default function FilterLevel({ filterLevel, onChangeLevel }: Props) {
  return (
    <FormControl fullWidth variant="filled" sx={inputStyle}>
      <Select
        multiple
        displayEmpty
        value={filterLevel}
        onChange={onChangeLevel}
        MenuProps={MenuProps}
        renderValue={(items) => {
          const selected: string[] = [];
          items.forEach((item) => selected.push(item.text));
          if (items.length === 0) {
            return (
              <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                Todos os dias
              </Typography>
            );
          }
          return (
            <Typography variant="subtitle2" component="span">
              {selected.join(', ')}
            </Typography>
          );
        }}
      >
        {Weekdays.map((day) => (
          <MenuItem key={day.value} value={day} sx={menuItemStyle}>
            <Checkbox size="small" checked={filterLevel.includes(day)} />
            {day.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
