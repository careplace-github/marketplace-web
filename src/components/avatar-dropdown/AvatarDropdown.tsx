// @mui
import { MenuItem, FormControl, Typography, Avatar, Stack } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ReactNode } from 'react';
// types
import { inputStyle, menuItemStyle, MenuProps } from './styles';

// ----------------------------------------------------------------------

type Props = {
  selected: string;
  onChange?: (event: SelectChangeEvent<string>, child: ReactNode) => void;
  options: Array<any>;
  selectText?: string;
  emptyText?: string;
  readOnly?: boolean;
};

export function AvatarDropdown({
  readOnly = false,
  options,
  selected,
  selectText,
  emptyText,
  onChange,
}: Props) {
  return (
    <FormControl fullWidth variant="filled" sx={inputStyle}>
      <Select
        readOnly={!!readOnly}
        displayEmpty
        value={selected || ''}
        onChange={onChange}
        MenuProps={MenuProps}
        renderValue={(value) => {
          if (!value) {
            return (
              <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                {selectText}
              </Typography>
            );
          }

          const _selected = JSON.parse(value);
          return (
            <Stack gap="10px" direction="row" alignItems="center" justifyContent="flex-start">
              <Avatar src={_selected.profile_picture} />
              <Typography variant="subtitle2" component="span">
                {_selected.name}
              </Typography>
            </Stack>
          );
        }}
      >
        {options.length > 0 ? (
          options.map((item) => (
            <MenuItem key={item._id} value={JSON.stringify(item)} sx={menuItemStyle}>
              <Avatar src={item.profile_picture} />
              {item.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled key={emptyText}>
            {emptyText}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
}
