/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useContext, useState } from 'react';
import Link from 'next/link';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, ListGroup, ListGroupItem, Col, Row } from 'reactstrap';

import { Context } from '../../../../../lib/state/Store';
import { REMOVE_PRODUCT_MUTATION } from '../../../../../graphql/mutation';
import { PRODUCTS_QUERY } from '../../../../../graphql/query';
import Modal from '../../../../../shared/components/Modal';

const ProductList: FC = () => {
  const [idState, setIdState] = useState('');
  const [removeProduct] = useMutation(REMOVE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: PRODUCTS_QUERY }],
  });
  const { state, dispatch } = useContext(Context);

  const { loading, error, data } = useQuery(PRODUCTS_QUERY);

  if (loading) {
    return <>loading</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  const handleShowModal: (id: string) => void = (id) => {
    setIdState(id);
    dispatch({ type: 'SET_MODAL', payload: true });
  };
  const handleHideModal: () => void = () => {
    dispatch({ type: 'SET_MODAL', payload: false });
  };
  const handleDeleteProduct: () => Promise<void> = async () => {
    try {
      await removeProduct({ variables: { _id: idState } });

      handleHideModal();
    } catch (err) {
      console.log(err);
    }
  };

  const { products } = data;

  const productItems: JSX.Element[] = products.map(({ title, _id }) => (
    <ListGroupItem key={_id}>
      <Row>
        <Col className="d-flex align-items-center">{title}</Col>
        <Col className="text-right">
          <Link
            href={{
              pathname: '/admin/products/update',
              query: { id: _id },
            }}
          >
            <a>
              <Button color="primary">Update</Button>
            </a>
          </Link>{' '}
          <Button color="danger" onClick={() => handleShowModal(_id)}>
            Delete
          </Button>
        </Col>
      </Row>
    </ListGroupItem>
  ));

  return products && products.length > 0 ? (
    <>
      <Modal title="Delete product" fn={handleDeleteProduct}>
        Do you really want to delete this item?
      </Modal>
      <ListGroup>{productItems}</ListGroup>
    </>
  ) : (
    <p>No product has yet been created.</p>
  );
};

export default ProductList;
