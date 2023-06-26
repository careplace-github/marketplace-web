// @mui
import { Box, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
//
import { visuallyHidden } from './utils';

// ----------------------------------------------------------------------

interface Prop {
  order: 'asc' | 'desc';
  orderBy: string;
  rowCount: number;
  headCells: any[];
  numSelected: number;
  onSort: (id: string) => void;
}

export default function AccountOrdersTableHead({
  order,
  onSort,
  orderBy,
  rowCount,
  headCells,
  numSelected,
}: Prop) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'normal' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
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
