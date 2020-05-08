import React, { useState, useContext, useRef, ChangeEvent } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
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

// Types
import Product from '../../../../../shared/types/Product.types';
import { VariantOfProduct } from '../../../../../shared/types/Store.types';

import { Context } from '../../../../../lib/state/Store';

interface IProductDetailProps {
  product: Product;
}
interface IProductToCartData {
  id: string;
  count?: number;
  variant?: VariantOfProduct;
}

const ProductDetailBody: React.FC<IProductDetailProps> = ({ product }) => {
  // product prop destruct
  const { _id, description, images, variant, title } = product;

  // hooks used in components
  const productCountRef = useRef(null);
  const [activeVariant, setActiveVariant] = useState(0);
  const { dispatch } = useContext(Context);

  const handleSetActiveVariant: (i: number) => void = (i) => {
    setActiveVariant(i);
  };

  const handleAddProductToCart: (data: IProductToCartData) => void = (data) => {
    const { id, variant } = data;

    dispatch({ type: 'ADD_TO_CART', payload: { id, variant } });
  };

  const handleSubmitProductToCart: (
    event: React.FormEvent<HTMLFormElement>
  ) => void = (event) => {
    event.preventDefault();

    const count: number = +productCountRef.current.value as number;
    const { price, title } = variant[activeVariant];

    handleAddProductToCart({
      id: _id,
      variant: {
        count,
        price,
        title,
      },
    });
  };

  const variantOptions: JSX.Element[] = variant.map(({ title }) => (
    <VariantOption key={title} value={title}>
      {title}
    </VariantOption>
  ));

  return (
    <Wrapper>
      <Container>
        <form onSubmit={handleSubmitProductToCart}>
          <Row>
            <Col md="6">
              {images.length > 0 ? (
                <Image src={images[0].path} alt={title} />
              ) : null}
            </Col>
            <Col md="6">
              <Title>{title}</Title>
              <Price>
                {variant[activeVariant].price.value}{' '}
                {variant[activeVariant].price.currencySign}
              </Price>
              <Description>{description}</Description>{' '}
              <VariantsSelect
                id="variants"
                name="variants"
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                  const idx: number = event.currentTarget.selectedIndex;

                  handleSetActiveVariant(idx);
                }}
              >
                {variantOptions}
              </VariantsSelect>
              <Input
                type="number"
                defaultValue={1}
                step={1}
                innerRef={productCountRef}
              />
              <StyledCartBtn type="submit">Vložiť do košíka</StyledCartBtn>
            </Col>
          </Row>
        </form>
      </Container>
    </Wrapper>
  );
};

export default ProductDetailBody;
