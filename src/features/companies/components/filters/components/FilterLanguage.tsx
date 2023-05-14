// @mui
import { Box, Autocomplete, Checkbox, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
// assets
import { countries } from 'src/data';
// types
import { ICountriesProps, ServiceProps } from 'src/types/utils';

// ----------------------------------------------------------------------

type Props = {
  filterLanguage: ServiceProps[];
  onChangeLanguage: (keyword: ServiceProps[]) => void;
  services: Array<ServiceProps>;
};

export default function FilterLanguage({ services, filterLanguage, onChangeLanguage }: Props) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const aux: string[] = [];
    filterLanguage.forEach((item) => {
      aux.push(item._id);
    });
    setSelectedIds(aux);
  }, [filterLanguage]);

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
          placeholder={filterLanguage.length > 0 ? undefined : 'Todos os serviços'}
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
          <Checkbox
            key={option._id}
            size="small"
            disableRipple
            checked={selectedIds.includes(option._id)}
          />
          {option.name}
        </Box>
      )}
    />
  );
}
