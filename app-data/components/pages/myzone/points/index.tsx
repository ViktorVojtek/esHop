import React, { FC } from 'react';
import { useQuery } from 'react-apollo';
import { CUSTOMER_QUERY } from '../../../../graphql/query';
import { Spinner, Progress, Row, Col } from 'reactstrap';
import { P, H2 } from '../mojaZona';

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
    return <Spinner />;
  }

  const { customer } = data;

  return (
    <div style={{ marginTop: '36px', marginBottom: '36px' }}>
      <H2 className="mt4">Vernostný program</H2>
      <Row>
        <Col md={4}>
          <P className="mt-2">
            <strong>Počet bodov: </strong>
            <span
              style={{ color: '#01aeef', fontSize: '24px', fontWeight: 'bold' }}
            >
              {customer.customerPoints}
            </span>
          </P>
        </Col>
        <Col md={4}>
          <div className="text-center">Zľava 10%</div>
          <Progress
            className="mb-4"
            value={`${customer.customerPoints / 100}`}
          />
        </Col>
        <Col md={4}>
          <div className="text-center">Zľava 20%</div>
          <Progress
            className="mb-4"
            value={`${customer.customerPoints / 200}`}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Points;
