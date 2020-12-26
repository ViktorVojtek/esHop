import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Badge } from 'reactstrap';
import { PDF, H6, P } from '../mojaZona';
import Link from 'next/link';
import {
  translateStatusColor,
  translateStatus,
  formatPrice,
} from '../../../../shared/helpers/formatters';

type IProps = {
  row: any;
  id: string;
};

const MobileTable = (props: IProps) => {
  const { row, id } = props;
  const [open, setOpen] = useState(false);

  function getDate(created_at: any) {
    const date = new Date(created_at.slice(0, 10) * 1000);
    return `${date.toLocaleDateString('sk-SK')}`;
  }

  function statusBadge(value: number) {
    return (
      <Badge color={translateStatusColor(value)}>
        {translateStatus(value)}
      </Badge>
    );
  }

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.orderId}
        </TableCell>
        <TableCell>{`${formatPrice(row.totalPrice)} €`}</TableCell>
        <TableCell align="left">{statusBadge(row.status)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <H6 className="font-weight-bold">Detail objednávky</H6>

            <P>
              Vytvorená: <strong>{getDate(row.created_at)}</strong>
            </P>
            <P>
              Doručenie: <strong>{row.deliveryMethode}</strong>
            </P>
            <P>
              Platba: <strong>{row.paymentMethode}</strong>
            </P>
            <div style={{ display: 'flex' }}>
              <P className="mr-4">Objednávka</P>
              <Link href={`/static/orders/order-${row.orderId}.pdf?user=${id}`}>
                <a target="_blank">
                  <PDF></PDF>
                </a>
              </Link>
            </div>
            {row.invoiceId && (
              <div style={{ display: 'flex' }}>
                <P className="mr-4">Faktúra</P>
                <Link
                  href={`/static/invoice/invoice-${row.invoiceId}.pdf?user=${id}`}
                >
                  <a target="_blank">
                    <PDF></PDF>
                  </a>
                </Link>
              </div>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default MobileTable;
