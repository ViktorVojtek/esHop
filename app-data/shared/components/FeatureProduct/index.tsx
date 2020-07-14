import React, { FC } from 'react';

import { Col } from 'reactstrap';
import Link from 'next/link';

import {
  IProductUI,
  IProductsFillProps,
} from '../../../components/pages/eshop/components/Products/components/ProductsFill/types/ProductFill.types';
import Product from '../../../shared/types/Product.types';

import {
  ProductItem,
  ImageWrap,
  ProductImg,
  EyeDetail,
  ProductBody,
  ProductTitle,
  StyledShortDescription,
  PriceHolder,
  Price,
  StyledCartLink,
} from './styles/index.js';
import {
  Del,
  ActionPrice,
} from '../../../components/pages/eshop/components/ProductDetail/styles/productDetail.style';

const FeatureProduct: FC<IProductUI> = ({
  product: { _id, variants, subCategory, title },
  addProduct,
}) => (
  <Col lg="3" sm="6" xs="12" className="mb-4" key={_id}>
    <ProductItem>
      <ImageWrap>
        {variants[0].images.length > 0 ? (
          <Link href={{ pathname: '/eshop/product', query: { id: _id } }}>
            <a>
              <div className="product-image">
                <ProductImg src={variants[0].images[0].path} alt={title} />
                <div className="detail">
                  <EyeDetail />
                </div>
              </div>
            </a>
          </Link>
        ) : null}
      </ImageWrap>{' '}
      <ProductBody>
        <ProductTitle>{title}</ProductTitle>
        <StyledShortDescription>{subCategory.title}</StyledShortDescription>
        <PriceHolder>
          {variants[0].discount > 0 ? (
            <Price>
              <Del>
                {variants[0].price.value.toFixed(2)}
                {variants[0].price.currency}
              </Del>
              <ActionPrice className="ml-2">
                {(
                  variants[0].price.value -
                  (variants[0].price.value * variants[0].discount) / 100
                ).toFixed(2)}
                {variants[0].price.currency}
              </ActionPrice>
            </Price>
          ) : (
            <Price>
              {variants[0].price.value.toFixed(2)}
              {variants[0].price.currency}
            </Price>
          )}
        </PriceHolder>
        <Link href={{ pathname: '/eshop/product', query: { id: _id } }}>
          <StyledCartLink>Ihneď kúpiť</StyledCartLink>
        </Link>
      </ProductBody>
    </ProductItem>
  </Col>
);
const FeaturecProductsFill: React.FC<IProductsFillProps> = ({
  products,
  addProduct,
}) => {
  const elements: JSX.Element[] = products.slice(0, 4).map((item: Product) => {
    const { _id } = item;

    return <FeatureProduct product={item} addProduct={addProduct} key={_id} />;
  });

  return <>{elements}</>;
};

export default FeaturecProductsFill;
