/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import Proptypes from 'prop-types';
import {
  Row, Col
} from 'reactstrap';
import {
  PriceHolder, Price, ProductImg, ProductItem, ProductBody, ProductTitle,
} from './styles/products.style';

import { PRODUCTS_QUERY } from '../../../../app-data/graphql/query';

import { Context } from '../../../../app-data/StateManagement/Store';

const Products = ({ subCategoryID, categoryID }) => {
  const {error, loading, data} = useQuery(PRODUCTS_QUERY);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [state, dispatch] = useContext(Context);
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

  const handleAddProductToCart = (id) => {
    dispatch({ type: 'ADD_TO_CART', payload: { id, count: 1 } });
  };
  const handleRemoveProductFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  }

  const productsToShow = filteredProducts.map((item) => {
    return (
      <Col className="col-12" key={item._id}>
        <ProductItem>
          <Link
            href={{
              pathname: '/eshop/product/',
              query: { id: item._id },
            }}
          >
            <ProductImg src={item.images[0].path} alt={item.title} />
          </Link>
          <ProductBody>
            <ProductTitle>
              <Link
                href={{
                  pathname: '/eshop/product/',
                  query: { id: item._id },
                }}
              >
                <a>
                  {item.title}
                </a>
              </Link>
            </ProductTitle>
            <p>{item.shortDescription}</p>
            <PriceHolder>
              <Price>
                {
                  item.variant.length > 0
                  ? `${item.variant[0].price.value} ${item.variant[0].price.currencySign}`
                  : 'Produkt neexistuje'
                }
              </Price>
              {/* TODO: Style it by following graphic design */}
              <button
                type="button"
                onClick={() => handleAddProductToCart(item._id)}
              >
                Add to cart
              </button>
              <button
                type="button"
                onClick={() => handleRemoveProductFromCart(item._id)}
              >
                Remove from cart
              </button>
            </PriceHolder>
          </ProductBody>
        </ProductItem>
      </Col>
    );
  });

  console.log(state);

  return (
    <Row>
      {productsToShow}
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