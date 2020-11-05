import React, { FC } from 'react';
import { useQuery } from 'react-apollo';
import { CUSTOMER_QUERY } from '../../../../graphql/query';
import { Progress, Row, Col, Button } from 'reactstrap';
import { P, H2 } from '../mojaZona';
import CustomSpinner from '../../../../shared/components/CustomSpinner/CustomerSpinner';
import { Paper, Typography } from '@material-ui/core';
import AnimatedProgress from './AnimatedProgress';

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
      <H2 className="mt4 text-center">Vernostný program</H2>
      <P className="mt-4 text-center mb-4">
        <strong>Počet bodov: </strong>
        <span
          style={{ color: '#007bff', fontSize: '24px', fontWeight: 'bold' }}
        >
          {customer.customerPoints}
        </span>
      </P>
      <Row>
        <Col md={4}>
          <Paper elevation={2} style={{ padding: '32px 16px' }}>
            <Typography
              color="primary"
              variant="h6"
              component="h6"
              align="center"
              style={{ padding: '0px 32px', paddingBottom: '48px' }}
            >
              Zľava 10% na nákup
            </Typography>
            <P className="text-center mb-0">{`${customer.customerPoints} / 10000`}</P>
            <AnimatedProgress value={customer.customerPoints} divide={100} />
            <Button
              style={{
                backgroundColor: '#007bff',
                margin: '0 auto',
                display: 'block',
              }}
            >
              Využiť
            </Button>
          </Paper>
        </Col>
        <Col md={4}>
          <Paper elevation={2} style={{ padding: '32px 16px' }}>
            <Typography
              color="primary"
              variant="h6"
              component="h6"
              align="center"
              style={{ padding: '0px 32px', paddingBottom: '48px' }}
            >
              Zľava 20% na nákup
            </Typography>
            <P className="text-center mb-0">{`${customer.customerPoints} / 20000`}</P>
            <AnimatedProgress value={customer.customerPoints} divide={200} />
            <Button
              style={{
                backgroundColor: '#007bff',
                margin: '0 auto',
                display: 'block',
              }}
            >
              Využiť
            </Button>
          </Paper>
        </Col>
        <Col md={4}>
          <Paper elevation={2} style={{ padding: '32px 16px' }}>
            <Typography
              color="primary"
              variant="h6"
              component="h6"
              align="center"
              style={{ padding: '0px 32px', paddingBottom: '48px' }}
            >
              Vybraný produkt zadarmo
            </Typography>
            <P className="text-center mb-0">{`${customer.customerPoints} / 25000`}</P>
            <AnimatedProgress value={customer.customerPoints} divide={250} />
            <Button
              style={{
                backgroundColor: '#007bff',
                margin: '0 auto',
                display: 'block',
              }}
            >
              Vybrať produkt
            </Button>
          </Paper>
        </Col>
      </Row>
    </div>
  );
};

export default Points;
