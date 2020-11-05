import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useQuery } from 'react-apollo';
import { ORDER_QUERY } from '../../../../graphql/query';
import { Badge } from 'reactstrap';
import { P, H2, PDF } from '../mojaZona';
import TablePaginationActions from '../../../../shared/components/TablePaginationActions';
import { TableHead } from '@material-ui/core';
import {
  formatPrice,
  translateStatus,
  translateStatusColor,
} from '../../../../shared/helpers/formatters';
import Link from 'next/link';
import CustomSpinner from '../../../../shared/components/CustomSpinner/CustomerSpinner';

type IOrders = {
  id: string;
};

const Orders: FC<IOrders> = ({ id }) => {
  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { error, loading, data } = useQuery(ORDER_QUERY, {
    variables: { id: id },
    fetchPolicy: 'network-only',
  });

  if (error) {
    return <>error.message</>;
  }

  if (loading) {
    return <CustomSpinner />;
  }

  const { orders } = data;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, orders.length - page * rowsPerPage);

  console.log(emptyRows);
  function getDate(created_at: any) {
    const date = new Date(created_at.slice(0, 10) * 1000);
    return `${date.toLocaleDateString('sk-SK')}, ${date.toLocaleTimeString(
      'sk-SK'
    )}`;
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function statusBadge(value: number) {
    return (
      <Badge color={translateStatusColor(value)}>
        {translateStatus(value)}
      </Badge>
    );
  }

  return (
    <>
      <H2>Vaše objednávky</H2>
      {orders.length > 0 ? (
        <TableContainer
          className={classes.container}
          component={Paper}
          elevation={3}
        >
          <Table className={classes.table} aria-label="custom pagination table">
            <TableHead>
              <TableRow className={classes.tRow}>
                <TableCell>Číslo objednávky</TableCell>
                <TableCell align="left">Vytvorená</TableCell>
                <TableCell align="left">Stav</TableCell>
                <TableCell align="left">Doručenie</TableCell>
                <TableCell align="left">Platba</TableCell>
                <TableCell align="left">Cena spolu</TableCell>
                <TableCell align="left">Objednávka</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? orders.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : orders
              ).map((row) => (
                <TableRow key={row.orderId}>
                  <TableCell component="th" scope="row">
                    {row.orderId}
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {getDate(row.created_at)}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    {statusBadge(row.status)}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    {row.deliveryMethode}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    {row.paymentMethode}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    {`${formatPrice(row.totalPrice)} €`}
                  </TableCell>
                  <TableCell>
                    <Link href={`/static/orders/order-${row.orderId}.pdf`}>
                      <a target="_blank">
                        <PDF></PDF>
                      </a>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[
                    5,
                    10,
                    25,
                    { label: 'Všetko', value: -1 },
                  ]}
                  colSpan={8}
                  count={orders.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : (
        <P>Aktuálne nemáte vytvorené žiadne objednávky.</P>
      )}
    </>
  );
};

const useStyles2 = makeStyles({
  container: {
    marginTop: '16px',
  },
  table: {
    minWidth: 500,
  },
  tRow: {
    '& th': {
      backgroundColor: '#007bff',
      color: '#FFF',
    },
  },
});
export default Orders;
