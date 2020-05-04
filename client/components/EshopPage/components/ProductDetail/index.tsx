import React, { useState, useContext } from 'react';

import { Container, Row, Col } from 'reactstrap';
import {
  Wrapper, Image, Title, Price, Description, StyledCartBtn, VariantOption, VariantsSelect,
} from './styles/productDetail.style';
import Product from '../Products/types/Products.type';

import { Context } from '../../../../app-data/StateManagement/Store';

interface IProductDetailProps{
  product: Product
}

const ProductDetailBody: React.FC<IProductDetailProps> = ({ product }) => {
  const [activeVariant, setActiveVariant] = useState(0);
  const { state, dispatch } = useContext(Context);

  const handleAddProductToCart = (id: string, count: Number) => {
    dispatch({ type: 'ADD_TO_CART', payload: { id, count } });
  };

  const variantOptions = product.variant.map((item) => {
    return (
      <VariantOption
        key={item.title} 
        value={item.title}
      >
        {item.title}
      </VariantOption>
    );
  });

  return (
    <Wrapper>
      <Container>
        <Row>
          <Col md="6">
            <Image src={product.images[0].path} alt={product.title} />  
          </Col> 
          <Col md="6">
            <Title>{product.title}</Title>
            <Price>{product.variant[activeVariant].price.value} {product.variant[activeVariant].price.currencySign}</Price>
            <Description>{product.description}</Description>
            <VariantsSelect id="variants" name="variants">
              {variantOptions}
            </VariantsSelect>
            <StyledCartBtn
                type="button"
                onClick={() => handleAddProductToCart(product._id,  1)}
              >
                Vložiť do košíka
            </StyledCartBtn>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default ProductDetailBody;