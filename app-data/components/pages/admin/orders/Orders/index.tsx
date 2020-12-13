import React, { FC, useRef, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, Badge, Col, FormGroup, Input, Row, Label } from 'reactstrap';
import {
  formatPrice,
  translatePaymentStatus,
  translatePaymentStatusColor,
  translateStatus,
  translateStatusColor,
} from '../../../../../shared/helpers/formatters';
import Actions from '../Actions';
import styled from 'styled-components';
import { FilePdf, Envelope } from '@styled-icons/fa-solid';
import Link from 'next/link';
import CustomMessage from './CustomMessage';
import PaymentActions from '../PaymentActions';
import {
  createStyles,
  Paper,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  withStyles,
} from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import TablePaginationActions from '../../../../../shared/components/TablePaginationActions';

type IOrders = {
  orders: any;
};

const PDF = styled(FilePdf)`
  width: 30px;
  color: #007bff;
`;

const OrdersList: FC<IOrders> = ({ orders }) => {
  const classes = useStyles2();
  const [compareString, setCompareString] = useState('');
  const [totalOrders, setTotalOrders] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const statusInput = useRef(null);
  const searchInput = useRef(null);

  const filterByEmail = () => {
    setCompareString(searchInput.current.value);
  };

  const filterByStatus = () => {
    if (statusInput.current.value == 4) {
      return setTotalOrders([...orders]);
    }
    const results = orders.filter(
      (order) => order.status == statusInput.current.value
    );
    setTotalOrders(results);
  };

  useEffect(() => {
    const results = orders.filter((order) =>
      order.email.toLowerCase().includes(compareString)
    );

    setTotalOrders([...results]);
  }, [compareString, orders]);

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

  const listItems =
    totalOrders && totalOrders.length > 0
      ? totalOrders.map((args: any, index: number) => {
          const {
            orderId,
            firstName,
            lastName,
            address,
            city,
            email,
            message,
            phone,
            postalCode,
            totalPrice,
            paymentMethode,
            paymentStatus,
            state,
            status,
            created_at,
            _id,
            invoiceId,
          } = args;
          const date = new Date(created_at.slice(0, 10) * 1000);
          // console.log(paymentStatus);

          return (
            <StyledTableRow key={index}>
              <TableCell component="td" scope="row">
                {orderId}
              </TableCell>
              <TableCell component="td" scope="row">
                {`${firstName} ${lastName}`}
                <br />
                {email}
                <br />
                {phone}
              </TableCell>
              <TableCell
                component="td"
                scope="row"
              >{`${address}, ${postalCode} ${city}, ${state}`}</TableCell>
              <TableCell component="td" scope="row">
                {message && (
                  <CustomMessage id={`envelope-${index}`} message={message} />
                )}
              </TableCell>
              <TableCell component="td" scope="row">{`${date.toLocaleDateString(
                'sk-SK'
              )}, ${date.toLocaleTimeString('sk-SK')}`}</TableCell>
              <TableCell component="td" scope="row">{`${formatPrice(
                totalPrice
              )} €`}</TableCell>
              <TableCell component="td" scope="row">
                {statusBadge(status)}
              </TableCell>
              <TableCell component="td" scope="row">
                {paymentMethode}
              </TableCell>
              <TableCell component="td" scope="row">
                {paymentStatusBadge(paymentStatus)}
              </TableCell>
              <TableCell component="td" scope="row">
                <Link href={`/static/orders/order-${orderId}.pdf?admin=true`}>
                  <a target="_blank">
                    <PDF></PDF>
                  </a>
                </Link>
              </TableCell>
              <TableCell component="td" scope="row">
                {invoiceId && (
                  <Link
                    href={`/static/invoice/invoice-${invoiceId}.pdf?admin=true`}
                  >
                    <a target="_blank">
                      <PDF></PDF>
                    </a>
                  </Link>
                )}
              </TableCell>
              <TableCell component="td" scope="row">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Actions id={_id} />
                  <PaymentActions id={_id} />
                </div>
              </TableCell>
            </StyledTableRow>
          );
        })
      : null;

  return (
    <div style={{ paddingBottom: '100px' }}>
      <Row>
        <Col md="3" className="mb-2">
          <FormGroup>
            <Label for="status">Email zákaznika</Label>
            <Input
              type="text"
              name="search"
              id="search"
              placeholder="Vyhľadávať podla emailu"
              onChange={filterByEmail}
              innerRef={searchInput}
            />
          </FormGroup>
        </Col>
        <Col md="3" className="mb-2">
          <FormGroup>
            <Label for="status">Stav objednávky</Label>
            <Input
              type="select"
              name="status"
              id="status"
              placeholder="Vyhľadávať podla stavu objednávky"
              onChange={filterByStatus}
              innerRef={statusInput}
            >
              <option value="4">Všetko</option>
              <option value="0">Nová</option>
              <option value="1">Odoslaná</option>
              <option value="2">Vybavená</option>
              <option value="3">Zrušená</option>
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <TableContainer component={Paper}>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow className={classes.tRow}>
              <TableCell>#</TableCell>
              <TableCell align="left">Zákazník</TableCell>
              <TableCell align="left">Adresa</TableCell>
              <TableCell align="left">Správa</TableCell>
              <TableCell align="left">Dátum vytvorenia</TableCell>
              <TableCell align="left">Spolu cena</TableCell>
              <TableCell align="left">Stav</TableCell>
              <TableCell align="left">Spôsob platby</TableCell>
              <TableCell align="left">Stav Platby</TableCell>
              <TableCell align="left">Objednávka</TableCell>
              <TableCell align="left">Faktúra</TableCell>
              <TableCell align="left">Akcie</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{listItems}</TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'Všetko', value: -1 }]}
                count={totalOrders.length}
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
    </div>
  );
};

function statusBadge(value: number) {
  return (
    <Badge color={translateStatusColor(value)}>{translateStatus(value)}</Badge>
  );
}

function paymentStatusBadge(value: number) {
  return (
    <Badge color={translatePaymentStatusColor(value)}>
      {translatePaymentStatus(value)}
    </Badge>
  );
}

const StyledTableRow = withStyles(() =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
  })
)(TableRow);

const useStyles2 = makeStyles({
  container: {
    marginTop: '16px',
  },
  table: {
    width: '100%',
  },
  tRow: {
    '& th': {
      backgroundColor: '#007bff',
      color: '#FFF',
    },
  },
});

export default OrdersList;
