import React, { FC, useState } from 'react';
import { useQuery } from 'react-apollo';
import { ORDER_QUERY } from '../../../../graphql/query';
import { Spinner, Table, Button, Badge } from 'reactstrap';
import { P, H2 } from '../mojaZona';

import OrdersFill from './OrdersFill';

type IOrders = {
  id: string;
};

const Orders: FC<IOrders> = ({ id }) => {
  const { error, loading, data } = useQuery(ORDER_QUERY, {
    variables: { id: id },
    fetchPolicy: 'network-only',
  });

  if (error) {
    return <>error.message</>;
  }

  if (loading) {
    return <Spinner />;
  }

  const { orders } = data;

  return (
    <>
      <H2>Vaše objednávky</H2>
      {orders.length > 0 ? (
        <Table striped responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Dátum vytvorenia</th>
              <th>Stav objednávky</th>
              <th>Spôsob doručenia</th>
              <th>Spôsob platby</th>
              <th>Cena spolu</th>
              <th>Objednávka</th>
            </tr>
          </thead>
          <tbody>
          {orders.map((order, index) => (
            <OrdersFill key={index} order={order} />
          ))}
          </tbody>
        </Table>
      ) : (
        <P>Aktuálne nemáte vytvorené žiadne objednávky.</P>
      )}
    </>
  );
};

export default Orders;
