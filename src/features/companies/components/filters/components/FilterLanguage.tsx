// @mui
import { Box, Autocomplete, Checkbox, TextField } from '@mui/material';
// assets
import { countries } from 'src/data';
// types
import { ICountriesProps } from 'src/types/utils';

// ----------------------------------------------------------------------
type ServiceProps = {
  _id: string;
  description: string;
  image: string;
  name: string;
  short_description: string;
};

type Props = {
  filterLanguage: ICountriesProps[];
  onChangeLanguage: (keyword: ICountriesProps[]) => void;
  services: Array<ServiceProps>;
};

export default function FilterLanguage({ services, filterLanguage, onChangeLanguage }: Props) {
  return (
    <Autocomplete
      multiple
      limitTags={1}
      disableCloseOnSelect
      options={services}
      getOptionLabel={(option) => option.name}
      value={filterLanguage}
      onChange={(event, value) => {
        console.log(value);
        onChangeLanguage(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          hiddenLabel
          variant="filled"
          placeholder={filterLanguage.length > 0 ? null : 'Todos os serviços'}
          InputProps={{
            ...params.InputProps,
            autoComplete: 'search',
            sx: { pb: 1 },
          }}
        />
      )}
      ChipProps={{ color: 'info', size: 'small' }}
      renderOption={(props, option, { selected }) => (
        <Box component="li" {...props} sx={{ p: '3px' }} key={option._id}>
          <Checkbox key={option._id} size="small" disableRipple checked={selected} />
          {option.name}
        </Box>
      )}
    />
  );
}
