// @mui
import { Stack, Select, MenuItem, Typography, FormControl, SelectChangeEvent } from '@mui/material';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: JSON.stringify({ sortBy: 'relevance', sortOrder: 'desc' }), label: 'Relevância' },
  { value: JSON.stringify({ sortBy: 'date', sortOrder: 'desc' }), label: 'Mais recentes' },
  { value: JSON.stringify({ sortBy: 'date', sortOrder: 'asc' }), label: 'Mais antigas' },
];

const inputStyle = {
  width: { md: 140 },
  '& .MuiSelect-select': {
    py: 1.35,
  },
};

const MenuProps = {
  PaperProps: {
    sx: {
      px: 1,
    },
  },
};

// ----------------------------------------------------------------------

type Props = {
  sort: { sortBy: string; sortOrder: string };
  onChangeSort: (event: string) => void;
};

export default function ReviewToolbar({ sort, onChangeSort }: Props) {
  return (
    <Stack
      spacing={5}
      alignItems={{ md: 'center' }}
      direction={{ xs: 'column', md: 'row' }}
      sx={{ mb: 5 }}
    >
      <Typography variant="h4" sx={{ width: 1 }}>
        Avaliações
      </Typography>

      <Stack direction="row" spacing={2} flexShrink={0} alignItems="center">
        <FormControl hiddenLabel variant="filled" sx={inputStyle}>
          <Select
            value={JSON.stringify(sort)}
            onChange={(event: SelectChangeEvent<string>) => {
              const selectedSort = event.target.value as string;
              onChangeSort(selectedSort);
              // Rest of your code
            }}
            MenuProps={MenuProps}
          >
            {SORT_OPTIONS.map((option) => {
              console.log('option:', option);
              console.log('sort:', sort);
              return (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
}
