import React, { useState, useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import {
  Wrapper,
  Image,
  Title,
  Price,
  Description,
  StyledCartBtn,
  VariantOption,
  VariantsSelect,
} from './styles/productDetail.style';
import Product from '../Products/types/Products.type';

import { Context } from '../../../../app-data/StateManagement/Store';

interface IProductDetailProps {
  product: Product;
}

const ProductDetailBody: React.FC<IProductDetailProps> = ({ product }) => {
  const { _id, description, images, variant, title } = product;
  const [activeVariant, setActiveVariant] = useState(0);
  const { state, dispatch } = useContext(Context);

  const handleAddProductToCart = (id: string, count: Number) => {
    dispatch({ type: 'ADD_TO_CART', payload: { id, count } });
  };

  const variantOptions: JSX.Element[] = variant.map(({ title }) => (
    <VariantOption key={title} value={title}>
      {title}
    </VariantOption>
  ));

  return (
    <Wrapper>
      <Container>
        <form onSubmit={() => handleAddProductToCart(_id, 1)}>
          <Row>
            <Col md="6">
              <Image src={images[0].path} alt={title} />
            </Col>
            <Col md="6">
              <Title>{title}</Title>
              <Price>
                {variant[activeVariant].price.value}{' '}
                {variant[activeVariant].price.currencySign}
              </Price>
              <Description>{description}</Description>
              <VariantsSelect id="variants" name="variants">
                {variantOptions}
              </VariantsSelect>
              <StyledCartBtn type="submit">Vložiť do košíka</StyledCartBtn>
            </Col>
          </Row>
        </form>
      </Container>
    </Wrapper>
  );
};

export default ProductDetailBody;
