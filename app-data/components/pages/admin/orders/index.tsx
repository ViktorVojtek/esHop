import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ORDER_QUERY } from '../../../../graphql/query';
import { Table, Badge } from 'reactstrap';
import {
  formatPrice,
  translateStatus,
  translateStatusColor,
} from '../../../../shared/helpers/formatters';
import Actions from './Actions';

const OrdersList: FC = () => {
  const { loading, error, data } = useQuery(ORDER_QUERY);

  if (loading) {
    return <>loading</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  const { orders } = data;

  const listItems =
    orders && orders.length > 0
      ? orders.map((args: any, index: number) => {
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

          console.log(status);

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
                <Actions id={_id} />
              </th>
            </tr>
          );
        })
      : null;

  return orders && orders.length > 0 ? (
    <Table style={{ minHeight: '400px' }} striped>
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
  ) : (
    <p>Neexistujú žiadne objednávky.</p>
  );
};

function statusBadge(value: number) {
  return (
    <Badge color={translateStatusColor(value)}>{translateStatus(value)}</Badge>
  );
}

export default OrdersList;
