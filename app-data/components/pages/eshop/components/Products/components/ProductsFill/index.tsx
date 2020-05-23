import React from 'react';
import Link from 'next/link';
import { Col } from 'reactstrap';
import { useIsClient } from '../../../../../../../lib/util/app.util';

// Styled Components
import {
  ImageWrap,
  PriceHolder,
  Price,
  ProductImg,
  ProductItem,
  ProductBody,
  StyledProductTitle,
  StyledShortDescription,
  StyledCartLink,
  StyledCartBtn,
  EyeDetail,
} from './styles/products.style';

// type Product
import Product from '../../../../../../../shared/types/Product.types';
import {
  IProductsFillProps,
  IProductTitle,
  IProductUI,
} from './types/ProductFill.types';
const ProductTitle: React.FC<IProductTitle> = ({ id, title }) => (
  <Link href={{ pathname: '/eshop/product', query: { id } }}>
    <a>
      <StyledProductTitle>{title}</StyledProductTitle>
    </a>
  </Link>
);

const ProductUI: React.FC<IProductUI> = ({
  product: { _id, description, images, title, shortDescription, variant },
  addProduct,
}) => {
  const isClient = useIsClient();
  const handleAddProductToCart = () => {
    const {
      default: variantDefault,
      itemsInStock,
      ...restVariantData
    } = variant[0];

    addProduct({ id: _id, variant: { ...restVariantData, count: 1 } });
  };

  return (
    <Col className="col-12" key={_id}>
      <ProductItem>
        <ImageWrap>
          {images.length > 0 ? (
            <Link href={{ pathname: '/eshop/product', query: { id: _id } }}>
              <a>
                <div className="product-image">
                  <ProductImg src={images[0].path} alt={title} />
                  <div className="detail">
                    <EyeDetail />
                  </div>
                </div>
              </a>
            </Link>
          ) : null}
        </ImageWrap>{' '}
        <ProductBody>
          <ProductTitle id={_id} title={title} />
          <StyledShortDescription>{shortDescription}</StyledShortDescription>
          <PriceHolder>
            <Price>
              {variant.length > 0
                ? `${variant[0].price.value} ${variant[0].price.currencySign}`
                : 'Produkt neexistuje'}
            </Price>
            {
              variant[0].price.discount > 0
            ? <span>{variant[0].price.value - ((variant[0].price.value * variant[0].price.discount) / 100)}{variant[0].price.currencySign}</span>
              : null
            }
          </PriceHolder>
          {variant.length > 1 ? (
            <Link href={{ pathname: '/eshop/product', query: { id: _id } }}>
              <StyledCartLink>Vložiť do košíka</StyledCartLink>
            </Link>
          ) : (
            <StyledCartBtn
              type="button"
              onClick={() => (isClient ? handleAddProductToCart() : null)}
            >
              Vložiť do košíka
            </StyledCartBtn>
          )}
        </ProductBody>
      </ProductItem>
    </Col>
  );
};
const ProductsFill: React.FC<IProductsFillProps> = ({
  products,
  addProduct,
}) => {
  const elements: JSX.Element[] = products.map((item: Product) => {
    const { _id } = item;

    return <ProductUI product={item} addProduct={addProduct} key={_id} />;
  });

  return <>{elements}</>;
};

export default ProductsFill;
