import React, { FC } from 'react';
import { useQuery } from 'react-apollo';
import { CUSTOMER_QUERY } from '../../../../graphql/query';
import { Spinner, Input, Form, Label, FormGroup, Button } from 'reactstrap';
import { P, H2 } from '../mojaZona';

type IPoints = {
  id: string;
};

const Points: FC<IPoints> = ({ id }) => {
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
      <H2>Vernostný program</H2>
      <P>
        <strong>Počet bodov: </strong>0
      </P>
    </>
  );
};

export default Points;
