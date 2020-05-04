import React from 'react';

import { Container, Row, Col } from 'reactstrap';
import { Wrapper, Image, Title } from './styles/productDetail.style';
import Product from '../Products/types/Products.type';

interface IProductDetailProps{
  product: Product
}

const ProductDetailBody: React.FC<IProductDetailProps> = ({ product }) => {
  console.log(product);
  return (
    <Wrapper>
      <Container>
        <Row>
          <Col md="6">
            <Image src={product.images[0].path} alt={product.title} />  
          </Col> 
          <Col md="6">
            <Title>{product.title}</Title>
            <p>{product.shortDescription}</p>
            <p>{product.description}</p>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default ProductDetailBody;