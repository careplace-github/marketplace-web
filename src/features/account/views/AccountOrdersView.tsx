import { useEffect, useState } from 'react';
// @mui
import {
  Box,
  Tab,
  Tabs,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination,
  CircularProgress,
} from '@mui/material';
// types
import { IOrderProps } from 'src/types/order';
// components
import Scrollbar from 'src/components/scrollbar';
import EmptyState from 'src/components/empty-state/EmptyState';
// lib
import fetch from 'src/lib/fetch';
import {
  AccountLayout,
  stableSort,
  getComparator,
  AccountOrdersTableRow,
  AccountOrdersTableHead,
  AccountOrdersTableToolbar,
} from '../components';

// ----------------------------------------------------------------------

const TABS = [
  { label: 'Todos', value: 'all' },
  { label: 'Aguarda Visita', value: 'accepted' },
  { label: 'Novos', value: 'new' },
  { label: 'Ativos', value: 'active' },
  { label: 'Pagamentos Pendentes', value: 'pending_payment' },
  { label: 'Concluídos', value: 'completed' },
  { label: 'Cancelados', value: 'cancelled' },
];

export const TABLE_HEAD = [
  { id: 'relative', label: 'Familiar', width: '400px', minWidth: '240px' },
  { id: 'services', label: 'Serviços', width: 160 },
  { id: 'schedule_information', label: 'Recorrência', width: 100 },
  { id: '', label: 'Horário' },
  { id: 'status', label: 'Estado', width: 100 },
  // Uncomment this line to add the column with the "options" icon to the table
  // { id: '' },
];

// ----------------------------------------------------------------------

export default function AccountOrdersView() {
  const [tab, setTab] = useState('all');

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [sortBy, setSortBy] = useState('');

  const [selected, setSelected] = useState<string[]>([]);

  const [page, setPage] = useState(0);

  const [dense, setDense] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [ordersFetched, setOrdersFetched] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState([]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
    // Filter the orders by the selected tab
    const ordersFiltered = ordersFetched.filter((order: IOrderProps) => {
      if (newValue === 'all') {
        return order.status !== 'cancelled';
      }
      return order.status === newValue;
    });
    setOrders(ordersFiltered);
  };

  const handleSort = (attribute: string) => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');

    if (attribute === 'patient.name') {
      setSortBy('patient.name');
    }

    setSortBy(attribute);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders/home-care', {
          method: 'GET',
        });
        const auxFilteredOrders = response.data.filter((order: IOrderProps) => {
          if (tab === 'all') {
            return order.status !== 'cancelled';
          }
          return order.status === tab;
        });
        setOrders(auxFilteredOrders);
        setOrdersFetched(response.data);
      } catch (error) {
        console.error(error);
      }
      setOrdersLoading(false);
    };
    fetchOrders();
    handleSort(sortBy);
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

  return (
    <AccountLayout>
      <Box
        sx={{
          p: 3,
          bgcolor: 'white',
          borderRadius: '16px',
          boxShadow:
            'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
        }}
      >
        <Typography variant="h5" sx={{ mb: 5 }}>
          Pedidos
        </Typography>

        <Tabs
          value={tab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={handleChangeTab}
          sx={{ mb: 5 }}
        >
          {TABS.map((_tab) => (
            <Tab key={_tab.value} value={_tab.value} label={_tab.label} />
          ))}
        </Tabs>

        {orders?.length > 0 && (
          <TableContainer
            sx={{
              overflow: 'unset',
              '& .MuiTableCell-head': {
                color: 'text.primary',
              },
              '& .MuiTableCell-root': {
                bgcolor: 'background.default',
                borderBottomColor: (theme) => theme.palette.divider,
              },
            }}
          >
            <AccountOrdersTableToolbar rowCount={orders.length} numSelected={selected.length} />

            <Scrollbar sx={{ maxHeight: '520px' }}>
              <Table
                sx={{
                  minWidth: 720,
                }}
                size={dense ? 'small' : 'medium'}
              >
                <AccountOrdersTableHead
                  order={sortOrder}
                  orderBy={sortBy}
                  onSort={handleSort}
                  headCells={TABLE_HEAD}
                  rowCount={orders.length}
                  numSelected={selected.length}
                />

                <TableBody>
                  {stableSort(orders, getComparator(sortOrder, sortBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order: IOrderProps) => {
                      return (
                        <AccountOrdersTableRow
                          key={order._id}
                          row={order}
                          selected={selected.includes(order._id)}
                        />
                      );
                    })}

                  {emptyRows > 0 && (
                    <TableRow
                      sx={{
                        height: (dense ? 36 : 57) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={9} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
        )}
        {orders?.length === 0 && ordersLoading && (
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              height: '200px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {orders?.length === 0 && !ordersLoading && (
          <EmptyState
            icon="fluent-mdl2:reservation-orders"
            title="Não tem nenhum pedido"
            description="Todos os pedidos que realizar serão apresentados nesta página"
          />
        )}

        <Box sx={{ position: 'relative.name' }}>
          <TablePagination
            page={page}
            component="div"
            count={orders?.length || 0}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            // Rows per page label
            labelRowsPerPage="Pedidos por página"
            // Pagination label
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          />
        </Box>
      </Box>
    </AccountLayout>
  );
}
