import React, { useContext, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Row } from 'reactstrap';
import Proptypes from 'prop-types';
import Product from '../../../../../shared/types/Product.types';

// Graphql Query def
import { PRODUCTS_QUERY } from '../../../../../graphql/query';

// Global state management context
import { Context } from '../../../../../lib/state/Store';

// Component fullfill the filtered products
import ProductFill from './components/ProductsFill';

import { VariantOfProduct } from '../../../../../shared/types/Store.types';

interface IProductsProps {
  subCategoryID: string;
  categoryID: string;
  products: Product[];
  getProducts: Dispatch<SetStateAction<Array<object>>>;
}
interface IProductToCartData {
  id: string;
  count?: number;
  variant?: VariantOfProduct;
}
const Products: React.FC<IProductsProps> = ({ products, getProducts, subCategoryID, categoryID }) => {
  const { error, loading, data } = useQuery(PRODUCTS_QUERY, {
    // fetchPolicy: 'network-only',
  });
  const { dispatch } = useContext(Context);
  

  const handleAddProductToCart: (data: IProductToCartData) => void = (data) => {
    const { id, variant } = data;

    dispatch({ type: 'ADD_TO_CART', payload: { id, variant } });
  };
  /* const handleRemoveProductFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  }; */

  return (
    <Row>
      <ProductFill
        products={products}
        addProduct={handleAddProductToCart}
      />
    </Row>
  );
};

Products.defaultProps = {
  subCategoryID: '',
  categoryID: '',
};

Products.propTypes = {
  subCategoryID: Proptypes.string,
  categoryID: Proptypes.string,
};

export default Products;
