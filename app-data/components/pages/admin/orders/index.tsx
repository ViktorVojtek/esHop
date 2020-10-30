import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ORDER_QUERY } from '../../../../graphql/query';
import OrdersList from './Orders';

const Orders: FC = () => {
  const { loading, error, data } = useQuery(ORDER_QUERY, {
    pollInterval: 10000,
  });

  if (loading) {
    return <>loading</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  const { orders } = data;
  return <OrdersList orders={orders} />;
};

export default Orders;
