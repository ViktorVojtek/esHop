import React, { FC, useRef, useEffect, useState } from 'react';
import { Table, Badge, Col, FormGroup, Input, Row, Label } from 'reactstrap';
import {
  formatPrice,
  translateStatus,
  translateStatusColor,
} from '../../../../../shared/helpers/formatters';
import Actions from '../Actions';
import styled from 'styled-components';
import { FilePdf } from '@styled-icons/fa-solid';
import Link from 'next/link';

type IOrders = {
  orders: any;
};

const PDF = styled(FilePdf)`
  width: 30px;
  color: #007bff;
`;

const OrdersList: FC<IOrders> = ({ orders }) => {
  const [compareString, setCompareString] = useState('');
  const [totalOrders, setTotalOrders] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);
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
            state,
            status,
            created_at,
            _id,
          } = args;
          const date = new Date(created_at.slice(0, 10) * 1000);
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{`${firstName} ${lastName}`}</td>
              <td>{email}</td>
              <td>{phone}</td>
              <td>{`${address}, ${postalCode} ${city}, ${state}`}</td>
              <td>{message}</td>
              <td>{`${formatPrice(totalPrice)} €`}</td>
              <td>{statusBadge(status)}</td>
              <td>{`${date.toLocaleDateString(
                'sk-SK'
              )}, ${date.toLocaleTimeString('sk-SK')}`}</td>
              <td><Link href={`/static/orders/order-${orderId}.pdf`}><a target="_blank"><PDF></PDF></a></Link></td>
              <td>
                <Actions id={_id} />
              </td>
            </tr>
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
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Zákazník</th>
            <th>Email</th>
            <th>Telefón</th>
            <th>Adresa</th>
            <th>Správa</th>
            <th>Spolu cena</th>
            <th>Stav</th>
            <th>Dátum vytvorenia</th>
            <th>Objednávka</th>
            <th>Akcie</th>
          </tr>
        </thead>
        <tbody>{listItems}</tbody>
      </Table>
    </div>
  );
};

function statusBadge(value: number) {
  return (
    <Badge color={translateStatusColor(value)}>{translateStatus(value)}</Badge>
  );
}

export default OrdersList;
