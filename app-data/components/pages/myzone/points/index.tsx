import React, { FC } from 'react';
import { useQuery } from 'react-apollo';
import { CUSTOMER_QUERY } from '../../../../graphql/query';
import { Progress, Row, Col, Button } from 'reactstrap';
import { P, H2 } from '../mojaZona';
import CustomSpinner from '../../../../shared/components/CustomSpinner/CustomerSpinner';
import { Paper, Typography } from '@material-ui/core';
import AnimatedProgress from './AnimatedProgress';
import Products from './Products';

type IPoints = {
  id: string;
};

const Points: FC<IPoints> = ({ id }) => {
  const { error, loading, data } = useQuery(CUSTOMER_QUERY, {
    variables: { id: id },
    fetchPolicy: 'network-only',
  });

  if (error) {
    return <>error.message</>;
  }

  if (loading) {
    return <CustomSpinner />;
  }

  const { customer } = data;

  return (
    <div style={{ marginTop: '36px', marginBottom: '36px' }}>
      <H2 className="text-center">Vernostný program</H2>
      <p className=" mt-4 text-center">Obdarujte seba a svojich blízkych</p>
      <p className="text-center">
        Staňte sa členom vernostného programu Smerdžonka klub a využite
        jedinečné zľavy, výhody a bonusy
      </p>
      <P className="mt-4 text-center mb-4">
        <strong>Počet bodov: </strong>
        <span
          style={{ color: '#007bff', fontSize: '24px', fontWeight: 'bold' }}
        >
          {customer.customerPoints}
        </span>
      </P>
      <Products customer={customer} />
    </div>
  );
};

export default Points;
