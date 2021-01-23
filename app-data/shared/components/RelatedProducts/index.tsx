import React, { FC } from 'react';

import { Col, Row } from 'reactstrap';
import Link from 'next/link';
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
} from '../../../components/pages/eshop/components/Products/components/ProductsFill/styles/products.style';
import { formatPrice } from '../../helpers/formatters';

type RelatedProductType = {
  product: Product;
};
type RelatedProductsType = {
  products: Product[];
};

const RelatedProducts: FC<RelatedProductType> = ({
  product: { _id, variants, subCategory, title, slug },
}) => (
  <Col lg="3" md="6" sm="12" className="mb-4" key={_id}>
    <ProductItem>
      <ImageWrap>
        {variants[0].images.length > 0 ? (
          <Link href={{ pathname: `/eshop/produkt/${slug}` }}>
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
        <Link href={{ pathname: `/eshop/produkt/${slug}` }}>
          <StyledCartLink>Ihneď kúpiť</StyledCartLink>
        </Link>
      </ProductBody>
    </ProductItem>
  </Col>
);
const RelatedProductsFill: React.FC<RelatedProductsType> = ({ products }) => {
  const elements: JSX.Element[] = products.slice(0, 4).map((item: Product) => {
    const { _id } = item;

    return <RelatedProducts product={item} key={_id} />;
  });

  return <Row>{elements}</Row>;
};

export default RelatedProductsFill;
