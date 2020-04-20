/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, ListGroup, ListGroupItem, Col, Row } from 'reactstrap';

import { Context } from '../../../../../app-data/StateManagement/Store';
import { REMOVE_PRODUCT_MUTATION } from '../../../../../app-data/graphql/mutation';
import { PRODUCTS_QUERY } from '../../../../../app-data/graphql/query';
import Modal from '../../../../../shared/components/Modal';

const ProductList = () => {
  const [idState, setIdState] = useState('');
  const [removeProduct] = useMutation(REMOVE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: PRODUCTS_QUERY }],
  });
  const [state, dispatch] = useContext(Context);

  const { loading, error, data } = useQuery(PRODUCTS_QUERY);

  if (loading) {
    return <>loading</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  const handleShowModal = (id) => {
    setIdState(id);
    dispatch({ type: 'SET_MODAL', payload: true });
  };
  const handleHideModal = () => {
    dispatch({ type: 'SET_MODAL', payload: false });
  };
  const handleDeleteProduct = async () => {
    try {
      await removeProduct({ variables: { _id: idState } });

      handleHideModal();
    } catch (err) {
      console.log(err);
    }
  };

  const { products } = data;

  return products && products.length > 0 ? (
    <>
      <Modal>
        <p className="text-center">
          Do you really want to delete this item?
          <br />
          <Button color="danger" onClick={() => handleDeleteProduct()}>
            Yes
          </Button>
          {' '}
          <Button color="secondary" onClick={() => handleHideModal()}>
            Cancel
          </Button>
        </p>
      </Modal>
      <ListGroup>
        {products.map(({ title, _id }) => (
          <ListGroupItem key={_id}>
            <Row>
              <Col>{title}</Col>
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
                </Link>
                {' '}
                <Button color="danger" onClick={() => handleShowModal(_id)}>
                  Delete
                </Button>
              </Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  ) : (
    <p>No product has yet been created.</p>
  );
};

export default ProductList;
