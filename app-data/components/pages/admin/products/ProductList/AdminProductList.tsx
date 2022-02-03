/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useContext, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
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
  ImageSize,
} from './ProductListStyle';
import { formatPrice } from '../../../../../shared/helpers/formatters';
import Product from '../../../../../shared/types/Product.types';
import AdminSubCategoriesSelect from './Categories';

type AdminProductList = {
  productsData: any;
};

const AdminProductList = (props: AdminProductList) => {
  const { productsData } = props;
  const [idState, setIdState] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [removeProduct] = useMutation(REMOVE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: PRODUCTS_QUERY }],
  });
  const { dispatch, state } = useContext(Context);
  const searchInput = useRef(null);
  const [compareString, setCompareString] = useState('');

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

  useEffect(() => {
    if (productsData) {
      const { products } = productsData.products;
      setFilteredProducts(products);
    }
  }, [productsData]);

  useEffect(() => {
    let searchedProducts = [...productsData.products.products];
    let newArray = searchedProducts.filter((item) =>
      item.title.toLocaleLowerCase().includes(compareString.toLocaleLowerCase())
    );
    setFilteredProducts(newArray);
  }, [compareString]);

  const filterByName = () => {
    setCompareString(searchInput.current.value);
  };

  const productItems: JSX.Element[] = filteredProducts.map(
    ({ title, _id, variants, subCategory }) => (
      <Col lg="3" md="6" key={_id}>
        <ProductItem>
          <ImageSize>{variants[0].images[0].size}</ImageSize>
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

  return (
    <div style={{ minHeight: '400px' }}>
      <Modal title="Delete product" fn={handleDeleteProduct}>
        Ste si istý, že chcete zmazať tento produkt ?
      </Modal>
      <Row className="mb-4">
        <Col md={6}>
          <InputHolder>
            <SearchInput
              type="text"
              name="search"
              id="search"
              placeholder="Vyhľadať produkt"
              onChange={filterByName}
              ref={searchInput}
            />
            <InputIconHolder>
              <InputIcon src="/icons/lupa.svg" />
            </InputIconHolder>
          </InputHolder>
        </Col>
        <Col md={4}>
          <AdminSubCategoriesSelect
            products={productsData.products.products}
            filteredProducts={filteredProducts}
            setFilteredProducts={setFilteredProducts}
          />
        </Col>
      </Row>
      <Row>{productItems}</Row>
    </div>
  );
};

export default AdminProductList;

export const InputHolder = styled.div`
  position: relative;
  margin-bottom: 8px;
`;

export const SearchInput = styled.input`
  border: transparent;
  border-radius: 8px;
  background: #f6f7f8;
  color: black !important;
  padding: 20px 20px;
  width: 100%;
  font-weight: 600;
  font-size: 1rem;
  &: focus {
    outline: none;
  }
  &::placeholder {
    color: black !important;
  }
`;
export const InputIconHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 48px;
  height: 48px;
  position: absolute;
  top: 7px;
  right: 7px;
  border-radius: 8px;
  pointer-events: none;
`;

export const InputIcon = styled.img`
  width: 20px;
`;
