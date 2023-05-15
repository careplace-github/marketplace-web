// @mui
import { Box, Autocomplete, Checkbox, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
// assets
import { countries } from 'src/data';
// types
import { ICountriesProps, ServiceProps } from 'src/types/utils';

// ----------------------------------------------------------------------

type Props = {
  filterServices: ServiceProps[];
  onChangeLanguage: (keyword: ServiceProps[]) => void;
  services: Array<ServiceProps>;
};

export default function FilterServices({ services, filterServices, onChangeLanguage }: Props) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const aux: string[] = [];
    filterServices.forEach((item) => {
      aux.push(item._id);
    });
    setSelectedIds(aux);
  }, [filterServices]);

  return (
    <Autocomplete
      multiple
      limitTags={1}
      disableCloseOnSelect
      options={services}
      getOptionLabel={(option) => option.name}
      value={filterServices}
      onChange={(event, value) => {
        onChangeLanguage(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          hiddenLabel
          variant="filled"
          placeholder={filterServices.length > 0 ? undefined : 'Todos os serviços'}
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