// @mui
import { Box, Autocomplete, Checkbox, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
// types
import { IServiceProps } from 'src/types/utils';

// ----------------------------------------------------------------------

type Props = {
  filterServices: IServiceProps[];
  onChangeServices: (keyword: IServiceProps[]) => void;
  services: Array<IServiceProps>;
  readOnly?: boolean;
};

export default function FilterServices({
  services,
  filterServices,
  onChangeServices,
  readOnly = false,
}: Props) {
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
      readOnly={!!readOnly}
      multiple
      limitTags={1}
      disableCloseOnSelect
      sx={{
        '& .MuiButtonBase-root-MuiChip-root': {
          backgroundColor: 'yellow',
        },
      }}
      options={services}
      getOptionLabel={(option) => option.name}
      value={filterServices}
      onChange={(event, value) => {
        onChangeServices(value);
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
            readOnly: !!readOnly,
            sx: { pb: 1 },
          }}
        />
      )}
      ChipProps={{ color: 'info', size: 'small', sx: { backgroundColor: 'primary.main' } }}
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
