import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Row } from 'reactstrap';
import Proptypes from 'prop-types';

// Graphql Query def
import { PRODUCTS_QUERY } from '../../../../app-data/graphql/query';

// Global state management context
import { Context } from '../../../../app-data/StateManagement/Store';

// Component fullfill the filtered products
import ProductFill from './components/ProductsFill';

interface IProductsProps {
  subCategoryID: string,
  categoryID: string
}
const Products: React.FC<IProductsProps> = ({ subCategoryID, categoryID }) => {
  const {error, loading, data} = useQuery(PRODUCTS_QUERY);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { state, dispatch } = useContext(Context);
  useEffect(() => {
    if(data){
      const { products } = data;
      let newProducts = [];

      if (subCategoryID === '') {
        newProducts = products.filter((product: any) => product.category === categoryID);
      } else {
        newProducts = products.filter((product: any) => product.subCategory === subCategoryID);
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

  const handleAddProductToCart = (id: string, count: Number) => {
    dispatch({ type: 'ADD_TO_CART', payload: { id, count } });
  };
  const handleRemoveProductFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  }

  console.log(state);

  return (
    <Row>
      <ProductFill
        products={filteredProducts}
        addProduct={handleAddProductToCart}
        removeProduct={handleRemoveProductFromCart}
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