import PropTypes from 'prop-types';
// @mui
import { MenuItem, Checkbox, FormControl, Typography } from '@mui/material';
import Select from '@mui/material/Select';

// ----------------------------------------------------------------------

const DURATIONS = ['Diária', 'Semanal', 'Quinzenal', 'Mensal'];

const inputStyle = {
  '& .MuiFilledInput-input': { py: 2 },
};

const ITEM_HEIGHT = 40;

const MenuProps = {
  PaperProps: {
    sx: {
      px: 1,
      maxHeight: ITEM_HEIGHT * 5,
      '& .MuiList-root': {
        py: 0.5,
      },
    },
  },
};

const placeholder = (
  <Typography variant="body2" sx={{ color: 'text.disabled' }}>
    Ver todas
  </Typography>
);

// ----------------------------------------------------------------------

ElearningCourseFrequencyFilter.propTypes = {
  filterDuration: PropTypes.arrayOf(PropTypes.string),
  onChangeDuration: PropTypes.func,
};

export default function ElearningCourseFrequencyFilter({ filterDuration, onChangeDuration }) {
  return (
    <FormControl fullWidth variant="filled" sx={{ ...inputStyle }}>
      <Select
        multiple
        displayEmpty
        value={filterDuration}
        onChange={onChangeDuration}
        MenuProps={MenuProps}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return placeholder;
          }
          return (
            <Typography variant="subtitle2" component="span">
              {selected.join(', ')}
            </Typography>
          );
        }}
      >
        {DURATIONS.map((duration) => (
          <MenuItem key={duration} value={duration} sx={{ p: 0, my: 0.5 }}>
            <Checkbox size="small" checked={filterDuration.includes(duration)} />
            {duration}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
