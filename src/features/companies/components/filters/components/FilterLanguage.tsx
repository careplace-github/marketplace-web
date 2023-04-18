 
// @mui
import { Box, Autocomplete, Checkbox, TextField } from '@mui/material';
// assets
import { countries } from 'src/data';
// types
import { ICountriesProps } from 'src/types/utils';

// ----------------------------------------------------------------------

type Props = {
  filterLanguage: ICountriesProps[];
  onChangeLanguage: (keyword: ICountriesProps[]) => void;
};

export default function FilterLanguage({ filterLanguage, onChangeLanguage }: Props) {
  return (
    <Autocomplete
      multiple
      limitTags={1}
      disableCloseOnSelect
      options={countries}
      getOptionLabel={(option) => option.label}
      value={filterLanguage}
      onChange={(event, value) => onChangeLanguage(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          hiddenLabel
          variant="filled"
          placeholder="All Language"
          InputProps={{
            ...params.InputProps,
            autoComplete: 'search',
            sx: { pb: 1 },
          }}
        />
      )}
      ChipProps={{ color: 'info', size: 'small' }}
      renderOption={(props, option, { selected }) => (
        <Box component="li" {...props} sx={{ p: '0 !important' }}>
          <Checkbox size="small" disableRipple checked={selected} />
          {option.label}
        </Box>
      )}
    />
  );
}