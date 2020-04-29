/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Proptypes from 'prop-types';
import {
  Row, Col, Card, CardImg, CardBody, CardTitle, 
} from 'reactstrap';
import {
  PriceHolder, Price, ProductImg, Icons, IconCart, IconLink, IconFavorite, IconDetail,
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
      <Col sm="4" xs="12" key={item._id}>
        <Card className="product-item" key={item._id}>
          <ProductImg>
            <CardImg top width="100%" src={item.images[0].path} alt={item.title} /> 
            <Icons className="p_icon">
              <IconLink>
                <IconDetail />
              </IconLink>
              <IconLink>
                <IconFavorite />
              </IconLink>
              <IconLink>
                <IconCart />
              </IconLink>
            </Icons>
          </ProductImg>
          <CardBody>
            <CardTitle>{item.title}</CardTitle>
            <PriceHolder>
              <Price>{item.variant.length > 0 ? `${item.variant[0].price.value} ${item.variant[0].price.currencySign}` : 'Produkt neexistuje'}</Price>
            </PriceHolder>
          </CardBody>
        </Card>
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