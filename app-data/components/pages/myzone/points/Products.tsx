import { useQuery } from '@apollo/react-hooks';
import { Paper, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useContext } from 'react';
import { Col, Row } from 'reactstrap';
import styled from 'styled-components';
import { LOYALITY_PRODUCTS_QUERY } from '../../../../graphql/query';
import { Context } from '../../../../lib/state/Store';
import CustomSpinner from '../../../../shared/components/CustomSpinner/CustomerSpinner';
import { Button } from '../../../../shared/design';
import { P } from '../mojaZona';
import AnimatedProgress from './AnimatedProgress';

type IProducts = {
  customer: any;
};

type ILoyalityProduct = {
  costPoints: number;
  discount?: number;
  isDiscount: boolean;
  image: string;
  title: string;
};

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 32px 16px;
  height: 100%;
`;

const Products = (props: IProducts) => {
  const { customer } = props;
  const { enqueueSnackbar } = useSnackbar();
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
  const { loyalityProduct, cart, giftCards, coupon } = state;

  const handleAddToCart = (product) => {
    if (
      loyalityProduct === null &&
      coupon === null &&
      (cart.length > 0 || giftCards.length > 0)
    ) {
      dispatch({
        type: 'ADD_LOYALITY_PRODUCT',
        payload: product,
      });
      return enqueueSnackbar(`Úspešne pridané: ${product.title}`, {
        variant: 'success',
      });
    } else if (cart.length === 0 && giftCards.length === 0) {
      return enqueueSnackbar(`Košík je prázdny`, {
        variant: 'error',
      });
    } else {
      enqueueSnackbar(`Nie je možné kombinovať zľavy`, {
        variant: 'error',
      });
    }
  };

  const Product = (props) => {
    const { product } = props;
    const { title, costPoints } = product;
    return (
      <Col md={4} className="mb-4">
        <StyledPaper elevation={2}>
          <div>
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
          </div>
          <div className="w-100">
            <AnimatedProgress
              value={customer.customerPoints}
              divide={costPoints / 100}
            />
            <Button
              disabled={!(customer.customerPoints >= costPoints)}
              onClick={() => handleAddToCart(product)}
              style={{ margin: '0 auto' }}
            >
              Pridať do košíka
            </Button>
          </div>
        </StyledPaper>
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
