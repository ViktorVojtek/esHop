/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';

import { Button, ListGroup, ListGroupItem, Col, Row } from 'reactstrap';

import { PRODUCTS_QUERY } from '../../../../../app-data/graphql/query';

const ProductList = () => {
  const { loading, error, data } = useQuery(PRODUCTS_QUERY);

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
        <ListGroupItem key={_id}>
          <Row>
            <Col>{title}</Col>
            <Col className="text-right">
              <Button color="primary">
                <Link
                  href={{
                    pathname: '/admin/products/update',
                    query: { id: _id },
                  }}
                >
                  <a>Update</a>
                </Link>
              </Button>
            </Col>
          </Row>
        </ListGroupItem>
      ))}
    </ListGroup>
  ) : (
    <p>No product has yet been created.</p>
  );
};

export default ProductList;
