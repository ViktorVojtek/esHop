/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState, ReactChildren } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import Proptypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import {
  PriceHolder, Price, ProductImg, ProductItem, ProductBody, ProductTitle,
} from './styles/products.style';

import { PRODUCTS_QUERY } from '../../../../app-data/graphql/query';

import { Context } from '../../../../app-data/StateManagement/Store';

import Product from './types/Products.type';

interface ProductFillProps {
  products: Product[],
  addProduct: (id: string) => void,
  removeProduct: (id: string) => void
}
const ProductFill: React.FC<ProductFillProps> = (props: ProductFillProps) => {
  const {
    products,
    addProduct,
    removeProduct
  } = props;

  const elements = products.map((item: Product) => {
    const {
      _id,
      description,
      images,
      shortDescription,
      title,
      variant,
    } = item;
  
    return (
      <Col className="col-12" key={_id}>
        <ProductItem>
          {
            images && images.length > 0
              ? (
                <Link
                  href={{
                    pathname: '/eshop/product/',
                    query: { id: _id },
                  }}
                >
                  <ProductImg src={images[0].path} alt={title} />
                </Link>
              ) : null
          }
          <ProductBody>
            <ProductTitle>
              <Link
                href={{
                  pathname: '/eshop/product/',
                  query: { id: _id },
                }}
              >
                <a>
                  {title}
                </a>
              </Link>
            </ProductTitle>
            <p>{shortDescription}</p>
            <PriceHolder>
              <Price>
                {
                  variant.length > 0
                  ? `${variant[0].price.value} ${variant[0].price.currencySign}`
                  : 'Produkt neexistuje'
                }
              </Price>
              {/* TODO: Style it by following graphic design */}
              <button
                type="button"
                onClick={() => addProduct(_id)}
              >
                Add to cart
              </button>
              <button
                type="button"
                onClick={() => removeProduct(_id)}
              >
                Remove from cart
              </button>
            </PriceHolder>
          </ProductBody>
        </ProductItem>
      </Col>
    );
  });

  return (
    <React.Fragment>
      {elements}
    </React.Fragment>
  );
};
const Products = ({ subCategoryID, categoryID }) => {
  const {error, loading, data} = useQuery(PRODUCTS_QUERY);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // const [state, dispatch] = useContext(Context);
  const { state, dispatch } = useContext(Context);
  useEffect(() => {
    if(data !== undefined){
      const { products } = data;
      const newProducts = products.filter((product) => {
        return product.category === categoryID;
      });
      setFilteredProducts(newProducts);
    }
  }, [subCategoryID, categoryID, data]);

  if (error) {
    return <>{error.message}</>;
  }
  if (loading) {
    return <>loading</>;
  }
  // console.log(filteredProducts);

  const handleAddProductToCart = (id: string) => {
    dispatch({ type: 'ADD_TO_CART', payload: { id, count: 1 } });
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