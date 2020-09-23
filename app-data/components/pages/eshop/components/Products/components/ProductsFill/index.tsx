import React, { useState } from 'react';
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
  ActionPrice,
  Del,
} from './styles/products.style';

// type Product
import Product from '../../../../../../../shared/types/Product.types';
import {
  IProductsFillProps,
  IProductTitle,
  IProductUI,
} from './types/ProductFill.types';
import ServiceUI from '../ServicesFill';
import { formatPrice } from '../../../../../../../shared/helpers/formatters';
import Service from '../../../../../../../shared/types/Service.types';
const ProductTitle: React.FC<IProductTitle> = ({ id, title }) => (
  <Link href={{ pathname: '/eshop/product', query: { id } }}>
    <a>
      <StyledProductTitle>{title}</StyledProductTitle>
    </a>
  </Link>
);

const ProductUI: React.FC<IProductUI> = ({
  product: { _id, variants, subCategory, title, isEnvelopeSize },
  addProduct,
  toggleModal,
}) => {
  const isClient = useIsClient();
  const handleAddProductToCart = () => {
    const {
      default: variantDefault,
      itemsInStock,
      ...restVariantData
    } = variants[0];

    addProduct({
      id: _id,
      variants: { ...restVariantData, count: 1 },
      isEnvelopeSize: isEnvelopeSize,
    });
    toggleModal();
  };

  return (
    <Col lg="3" sm="6" key={_id}>
      <ProductItem>
        <div>
          <ImageWrap>
            {variants[0].images.length > 0 ? (
              <Link href={{ pathname: '/eshop/product', query: { id: _id } }}>
                <a>
                  <div className="product-image">
                    <ProductImg
                      src={variants[0].images[0].path}
                      alt={variants[0].title}
                    />
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
            <StyledShortDescription>{subCategory.title}</StyledShortDescription>
            <PriceHolder>
              {variants[0].discount > 0 ? (
                <Price>
                  <Del>
                    {formatPrice(variants[0].price.value)}{' '}
                    {variants[0].price.currency}
                  </Del>
                  <ActionPrice className="ml-2">
                    {formatPrice(
                      variants[0].price.value -
                        (variants[0].price.value * variants[0].discount) / 100
                    )}{' '}
                    {variants[0].price.currency}
                  </ActionPrice>
                </Price>
              ) : (
                <Price>
                  {formatPrice(variants[0].price.value)}{' '}
                  {variants[0].price.currency}
                </Price>
              )}
            </PriceHolder>
          </ProductBody>
        </div>
        {variants.length > 1 ? (
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
      </ProductItem>
    </Col>
  );
};
const ProductsFill: React.FC<IProductsFillProps> = ({
  products,
  addProduct,
  toggleModal,
}) => {
  const elements: JSX.Element[] = products.map((item: any) => {
    const { _id, subCategory, variants } = item;
    return (
      <>
        {variants !== undefined ? (
          <ProductUI
            toggleModal={toggleModal}
            product={item}
            addProduct={addProduct}
            key={_id}
          />
        ) : (
          <ServiceUI product={item} key={_id} />
        )}
      </>
    );
  });

  return <>{elements}</>;
};

export default ProductsFill;
