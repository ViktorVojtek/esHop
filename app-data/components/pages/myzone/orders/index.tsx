import React, { FC } from 'react';
import { useQuery } from 'react-apollo';
import { CUSTOMER_QUERY } from '../../../../graphql/query';
import { Spinner, Input, Form, Label, FormGroup, Button } from 'reactstrap';
import { P, H2 } from '../../../../../pages/moja-zona/mojaZona';

type IOrders = {
  id: string;
};

const Orders: FC<IOrders> = ({ id }) => {
  //TODO get orders

  /*const { error, loading, data } = useQuery(CUSTOMER_QUERY, {
    variables: { id: id },
    fetchPolicy: 'network-only',
  });

  if (error) {
    return <>error.message</>;
  }

  if (loading) {
    return <Spinner />;
  }

  const { customer } = data;*/

  return (
    <>
      <H2>Vaše objednávky</H2>
      <P>Aktuálne nemáte vytvorené žiadne objednávky.</P>
    </>
  );
};

export default Orders;
