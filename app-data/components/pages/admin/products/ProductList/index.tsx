/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useContext, useState } from 'react';
import Link from 'next/link';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Col, Container, Row } from 'reactstrap';

import { Context } from '../../../../../lib/state/Store';
import { REMOVE_PRODUCT_MUTATION } from '../../../../../graphql/mutation';
import { PRODUCTS_QUERY } from '../../../../../graphql/query';
import Modal from '../../../../../shared/components/Modal';
import {
  ProductImg,
  ProductItem,
  ProductBody,
  ProductTitle,
  SubCategoryTitle,
  PriceHolder,
  Price,
  ActionPrice,
  Del,
  ActionHolder,
} from './ProductListStyle';
import { formatPrice } from '../../../../../shared/helpers/formatters';

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

  const productItems: JSX.Element[] = products.map(
    ({ title, _id, variants, subCategory }) => (
      <Col lg="3" md="6" key={_id}>
        <ProductItem>
          {variants[0].images[0].path && (
            <div className="product-image">
              <ProductImg
                src={variants[0].images[0].path}
                alt={variants[0].title}
              />
            </div>
          )}
          <ProductBody>
            <ProductTitle>{title}</ProductTitle>
            <SubCategoryTitle>{subCategory.title}</SubCategoryTitle>
            <PriceHolder>
              {variants[0].discount > 0 ? (
                <Price>
                  <Del>
                    {formatPrice(variants[0].price.value)}{' '}
                    {variants[0].price.currency}
                  </Del>
                  <ActionPrice className="ml-2">
                    {formatPrice(
                      variants[0].price.value -
                        (variants[0].price.value * variants[0].discount) / 100
                    )}{' '}
                    {variants[0].price.currency}
                  </ActionPrice>
                </Price>
              ) : (
                <Price>
                  {formatPrice(variants[0].price.value)}{' '}
                  {variants[0].price.currency}
                </Price>
              )}
            </PriceHolder>
          </ProductBody>
          <ActionHolder>
            <Link
              href={{
                pathname: '/admin/products/update',
                query: { id: _id },
              }}
            >
              <a>
                <Button style={{ fontSize: '.9rem' }} color="primary">
                  Upraviť
                </Button>
              </a>
            </Link>{' '}
            <Button
              style={{ fontSize: '.9rem' }}
              color="danger"
              onClick={() => handleShowModal(_id)}
            >
              Zmazať
            </Button>
          </ActionHolder>
        </ProductItem>
      </Col>
    )
  );

  return products && products.length > 0 ? (
    <>
      <Modal title="Delete product" fn={handleDeleteProduct}>
        Ste si istý, že chcete zmazať tento produkt ?
      </Modal>
      <Row>{productItems}</Row>
    </>
  ) : (
    <p>Nemáte žiaden vytvorený produkt.</p>
  );
};

export default ProductList;
