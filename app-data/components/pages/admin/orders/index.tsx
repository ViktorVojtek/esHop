import React, { FC, useRef, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ORDER_QUERY } from '../../../../graphql/query';
import OrdersList from './Orders';

const Orders: FC = () => {
  const orderQuery = useQuery(ORDER_QUERY);

  const { loading, error, data } = orderQuery;

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
