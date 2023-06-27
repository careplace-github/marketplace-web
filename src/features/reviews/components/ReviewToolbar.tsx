// @mui
import { Stack, Select, MenuItem, Typography, FormControl, SelectChangeEvent } from '@mui/material';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'desc', label: 'Mais recentes' },
  { value: 'asc', label: 'Mais antigas' },
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
  sort: string;
  onChangeSort: (event: SelectChangeEvent) => void;
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
          <Select value={sort} onChange={onChangeSort} MenuProps={MenuProps}>
            {SORT_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
}
