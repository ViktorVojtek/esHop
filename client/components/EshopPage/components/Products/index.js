/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
  Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, 
} from 'reactstrap';
import {
  PriceHolder, Price, ProductImg, Icons, IconCart, IconLink, IconFavorite, IconDetail,
} from './styles/products.style';

import { PRODUCTS_QUERY } from '../../../../app-data/graphql/query';

const Products = () => {
  const {error, loading, data} = useQuery(PRODUCTS_QUERY);
  if (error) {
    return <>{error.message}</>;
  }
  if (loading) {
    return <>loading</>;
  }
  const { products } = data;
  console.log(products);

  const productsToShow = products.map((item) => {
    return (
      <Col sm="4" xs="12">
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

export default Products;