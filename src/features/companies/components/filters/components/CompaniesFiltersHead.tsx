// @mui
import { Box, TableRow, Checkbox, TableCell, TableHead, TableSortLabel } from '@mui/material';
//
import { visuallyHidden } from 'src/features/account/components';

// ----------------------------------------------------------------------

interface Prop {
  order: 'asc' | 'desc';
  orderBy: string;
  rowCount: number;
  headCells: any[];
  numSelected: number;
  onSort: (id: string) => void;
}

export default function CompaniesFiltersHead({
  order,
  onSort,
  orderBy,
  rowCount,
  headCells,
  numSelected,
}: Prop) {
  return (
    <TableHead
      sx={{
        display: 'flex',
        width: '100%',
        borderRadius: '16px',
        boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
        mb: '20px',
      }}
    >
      <TableRow sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'normal' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              backgroundColor: 'white',
              width: headCell.width,
              minWidth: headCell.minWidth,
              textAlign: headCell.textAlign,
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={() => onSort(headCell.id)}
              sx={{
                alignItems: 'center',
              }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
