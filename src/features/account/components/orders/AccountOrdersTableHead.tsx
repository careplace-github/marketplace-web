// @mui
import { Box, TableRow, TableCell, TableHead, TableSortLabel, Stack } from '@mui/material';
//
import { useResponsive } from 'src/hooks';
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
  const isMdUp = useResponsive('up', 'md');
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
            {headCell.id !== 'actions' ? (
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
            ) : (
              <Stack
                sx={{ width: '70px', textAlign: 'left', pl: 2, flex: !isMdUp ? 1 : undefined }}
              />
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
