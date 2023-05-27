// @mui
import { MenuItem, Checkbox, FormControl, Typography, Avatar, Stack } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState, ReactNode } from 'react';
// types
import { IRelativeProps } from 'src/types/relative';
import { inputStyle, menuItemStyle, MenuProps } from './styles';

// ----------------------------------------------------------------------

type Props = {
  relativeSelected: string;
  onChangeRelative: (event: SelectChangeEvent<string>, child: ReactNode) => void;
  relatives: Array<IRelativeProps>;
};

export default function RelativeSelector({ relatives, relativeSelected, onChangeRelative }: Props) {
  return (
    <FormControl fullWidth variant="filled" sx={inputStyle}>
      <Select
        displayEmpty
        value={relativeSelected || ''}
        onChange={onChangeRelative}
        MenuProps={MenuProps}
        renderValue={(value) => {
          if (!value) {
            return (
              <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                Escolha o seu familiar
              </Typography>
            );
          }
          console.log(value);
          const selected = JSON.parse(value);
          return (
            <Stack gap="10px" direction="row" alignItems="center" justifyContent="flex-start">
              <Avatar src={selected.profile_picture} />
              <Typography variant="subtitle2" component="span">
                {selected.name}
              </Typography>
            </Stack>
          );
        }}
      >
        {relatives.length > 0 ? (
          relatives.map((item) => (
            <MenuItem key={item._id} value={JSON.stringify(item)} sx={menuItemStyle}>
              <Avatar src={item.profile_picture} />
              {item.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled key="Não tem familiares associados">
            Não tem familiares associados
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
}
