/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import Proptypes from 'prop-types';
import {
  Row, Col, Card, CardImg, CardBody, CardTitle, 
} from 'reactstrap';
import {
  PriceHolder, Price, ProductImg, ProductItem, ProductBody,
} from './styles/products.style';

import { PRODUCTS_QUERY } from '../../../../app-data/graphql/query';

const Products = ({ categoryID }) => {
  const {error, loading, data} = useQuery(PRODUCTS_QUERY);
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    if(data !== undefined){
      const { products } = data;
      const newProducts = products.filter(function(product){
        return product.category === categoryID;
      });
      setFilteredProducts(newProducts);
    }
  }, [categoryID, data]);

  if (error) {
    return <>{error.message}</>;
  }
  if (loading) {
    return <>loading</>;
  }
  console.log(filteredProducts);

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
            <p>{item.title}</p>
            <p>{item.shortDescription}</p>
            <PriceHolder>
              <Price>{item.variant.length > 0 ? `${item.variant[0].price.value} ${item.variant[0].price.currencySign}` : 'Produkt neexistuje'}</Price>
            </PriceHolder>
          </ProductBody>
        </ProductItem>
      </Col>
    );
  });
  return (
    <Row>
      {productsToShow}
    </Row>
  );
};

Products.defaultProps = {
  categoryID: '',
};

Products.propTypes = {
  categoryID: Proptypes.string,
};

export default Products;