import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { ListGroup, ListGroupItem } from 'reactstrap';

import { PRODUCT_QUERY } from '../../../../../app-data/graphql/query';

const ProductList = () => {
  const { loading, error, data } = useQuery(PRODUCT_QUERY);

  if (loading) {
    return <>loading</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  const { products } = data;

  return products && products.length > 0 ? (
    <ListGroup>
      {products.map(({ title, _id }) => (
        <ListGroupItem key={_id}>{title}</ListGroupItem>
      ))}
    </ListGroup>
  ) : (
    <p>No product has yet been created.</p>
  );
};

export default ProductList;
