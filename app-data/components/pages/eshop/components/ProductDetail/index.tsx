import React, { useState, useContext, useRef, ChangeEvent } from 'react';
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
  Input,
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
  const { _id, variants } = product;

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
    const { price, title } = variants[activeVariant];

    handleAddProductToCart({
      id: _id,
      variant: {
        count,
        price,
        title,
      },
    });
  };

  const variantOptions: JSX.Element[] = variants.map(({ title }) => (
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
              {variants[activeVariant].images.length > 0 ? (
                <Image src={variants[activeVariant].images[0].path} alt={variants[activeVariant].title} />
              ) : null}
            </Col>
            <Col md="6">
              <Title>{variants[activeVariant].title}</Title>
              <Price>
                {variants[activeVariant].price.value}{' '}
                {variants[activeVariant].price.currencySign}
              </Price>
              <Description>{variants[activeVariant].description}</Description>{' '}
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
                className="mt-4 mb-4"
                defaultValue={1}
                step={1}
                ref={productCountRef}
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
