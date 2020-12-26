import { useMutation } from '@apollo/react-hooks';
import { Button, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { Col } from 'reactstrap';
import { REMOVE_LOYALITY_PRODUCT_MUTATION } from '../../../../graphql/mutation';
import { LOYALITY_PRODUCTS_QUERY } from '../../../../graphql/query';

type LoyalityProductProps = {
  loyalityProduct: any;
};

const LoyalityProduct = (props: LoyalityProductProps) => {
  const { loyalityProduct } = props;
  const [removeLoyalityProduct] = useMutation(
    REMOVE_LOYALITY_PRODUCT_MUTATION,
    {
      refetchQueries: [{ query: LOYALITY_PRODUCTS_QUERY }],
    }
  );

  const removeProduct = () => {
    removeLoyalityProduct({
      variables: { id: loyalityProduct._id },
    });
  };

  return (
    <Col md={4} className="mb-4">
      <Paper elevation={2} style={{ padding: '32px 16px' }}>
        <Typography
          color="primary"
          variant="h6"
          component="h6"
          align="center"
          style={{ padding: '0px 32px', paddingBottom: '24px' }}
        >
          {loyalityProduct.title}
        </Typography>
        <Typography
          color="primary"
          variant="subtitle1"
          align="center"
          style={{ padding: '0px 16px', paddingBottom: '16px' }}
        >
          {`Hodnota: ${loyalityProduct.costPoints} bodov.`}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: '0 auto', display: 'block' }}
          onClick={removeProduct}
        >
          Odstrániť
        </Button>
      </Paper>
    </Col>
  );
};

export default LoyalityProduct;
