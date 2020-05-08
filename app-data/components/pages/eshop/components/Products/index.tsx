import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Row } from 'reactstrap';
import Proptypes from 'prop-types';

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
}
interface IProductToCartData {
  id: string;
  count?: number;
  variant?: VariantOfProduct;
}
const Products: React.FC<IProductsProps> = ({ subCategoryID, categoryID }) => {
  const { error, loading, data } = useQuery(PRODUCTS_QUERY, {
    // fetchPolicy: 'network-only',
  });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { dispatch } = useContext(Context);
  useEffect(() => {
    if (data) {
      const { products } = data;
      let newProducts = [];

      if (subCategoryID === '') {
        newProducts = products.filter(
          (product: any) => product.category === categoryID
        );
      } else {
        newProducts = products.filter(
          (product: any) => product.subCategory === subCategoryID
        );
      }

      setFilteredProducts(newProducts);
    }
  }, [subCategoryID, categoryID, data]);

  if (error) {
    return <>{error.message}</>;
  }
  if (loading) {
    return <>loading</>;
  }

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
        products={filteredProducts}
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
