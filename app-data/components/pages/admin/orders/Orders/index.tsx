import React, { FC, useRef, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ORDER_QUERY } from '../../../../../graphql/query';
import { Table, Badge, Col, FormGroup, Input, Row } from 'reactstrap';
import {
  formatPrice,
  translateStatus,
  translateStatusColor,
} from '../../../../../shared/helpers/formatters';
import Actions from '../Actions';

type IOrders = {
  orders: any;
};

const OrdersList: FC<IOrders> = ({ orders }) => {
  const [compareString, setCompareString] = useState('');
  const [totalOrders, setTotalOrders] = useState([]);
  const statusInput = useRef(null);
  const searchInput = useRef(null);

  const filterByEmail = () => {
    setCompareString(searchInput.current.value);
  };

  const filterByStatus = () => {
    if (statusInput.current.value == 4) {
      return setTotalOrders(orders);
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
    setTotalOrders(results);
  }, [compareString]);

  const listItems =
    totalOrders && totalOrders.length > 0
      ? totalOrders.map((args: any, index: number) => {
          const {
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
            _id,
          } = args;

          return (
            <tr key={index}>
              <th>{index + 1}</th>
              <th>{firstName}</th>
              <th>{lastName}</th>
              <th>{email}</th>
              <th>{phone}</th>
              <th>{`${address}, ${postalCode} ${city}, ${state}`}</th>
              <th>{message}</th>
              <th>{`${formatPrice(totalPrice)} €`}</th>
              <th>{statusBadge(status)}</th>
              <th>
                <Actions id={_id} status={status} />
              </th>
            </tr>
          );
        })
      : null;

  return (
    <>
      <Row>
        <Col md="6" className="mb-2">
          <FormGroup>
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
        <Col md="6" className="mb-2">
          <FormGroup>
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
            <th>Meno</th>
            <th>Priezvisko</th>
            <th>Email</th>
            <th>Telefón</th>
            <th>Adresa</th>
            <th>Správa</th>
            <th>Spolu cena</th>
            <th>Stav objednávky</th>
            <th>Akcie</th>
          </tr>
        </thead>
        <tbody>{listItems}</tbody>
      </Table>
    </>
  );
};

function statusBadge(value: number) {
  return (
    <Badge color={translateStatusColor(value)}>{translateStatus(value)}</Badge>
  );
}

export default OrdersList;
