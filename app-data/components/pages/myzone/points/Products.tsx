import { useQuery } from '@apollo/react-hooks';
import { Paper, Typography } from '@material-ui/core';
import React, { FC, useCallback, useContext } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { LOYALITY_PRODUCTS_QUERY } from '../../../../graphql/query';
import { Context } from '../../../../lib/state/Store';
import CustomSpinner from '../../../../shared/components/CustomSpinner/CustomerSpinner';
import { P } from '../mojaZona';
import AnimatedProgress from './AnimatedProgress';

type IProducts = {
  customer: any;
};

type ILoyalityProduct = {
  product: {
    costPoints: number;
    discount?: number;
    isDiscount: boolean;
    image: string;
    title: string;
  };
};

const Products = (props: IProducts) => {
  const { customer } = props;
  const { dispatch, state } = useContext(Context);
  const { error, loading, data } = useQuery(LOYALITY_PRODUCTS_QUERY, {
    fetchPolicy: 'network-only',
  });

  if (error) {
    return <>error.message</>;
  }

  if (loading) {
    return <CustomSpinner />;
  }

  const { loyalityProducts } = data;

  const handleAddToCart = (product) => {
    console.log(product);
    dispatch({
      type: 'ADD_LOYALITY_PRODUCT',
      payload: product,
    });
  };

  console.log(state);

  const Product = (props: ILoyalityProduct) => {
    const { product } = props;
    const { title, costPoints } = product;
    return (
      <Col md={4} className="mb-4">
        <Paper elevation={2} style={{ padding: '32px 16px' }}>
          <Typography
            color="primary"
            variant="h6"
            component="h6"
            align="center"
            style={{ padding: '0px 32px', paddingBottom: '48px' }}
          >
            {title}
          </Typography>
          <P className="text-center mb-0">{`${customer.customerPoints} / ${costPoints}`}</P>
          <AnimatedProgress
            value={customer.customerPoints}
            divide={costPoints / 100}
          />
          <Button
            style={{
              backgroundColor: '#007bff',
              margin: '0 auto',
              display: 'block',
            }}
            disabled={!(customer.customerPoints >= costPoints)}
            onClick={() => handleAddToCart(product)}
          >
            Pridať do košíka
          </Button>
        </Paper>
      </Col>
    );
  };

  return (
    <Row>
      {loyalityProducts.map((product, i) => (
        <Product product={product} key={i} />
      ))}
    </Row>
  );
};

export default Products;
