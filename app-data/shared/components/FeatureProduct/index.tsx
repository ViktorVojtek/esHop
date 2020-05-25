import React, { FC } from 'react';

import { Col } from 'reactstrap';
import Link from 'next/link';


import {
  IProductUI, IProductsFillProps,
} from '../../../components/pages/eshop/components/Products/components/ProductsFill/types/ProductFill.types';
import Product from '../../../shared/types/Product.types';

import {
  ProductItem, ImageWrap, ProductImg, EyeDetail, ProductBody, ProductTitle,
  StyledShortDescription, PriceHolder, Price, StyledCartLink,
} from './styles/index.js';

const FeatureProduct: FC<IProductUI> =  ({
  product: { _id, description, images, title, shortDescription, variant },
  addProduct,
}) => (
  <Col lg="3" md="4" key={_id}>
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
        <ProductTitle>{title}</ProductTitle>
        <StyledShortDescription>SubKategória</StyledShortDescription>
        <PriceHolder>
          <Price>
            {variant.length > 0
              ? `${variant[0].price.value} ${variant[0].price.currencySign}`
              : 'Produkt neexistuje'}
          </Price>
          {
            variant[0].price.discount > 0
          ? <Price>{variant[0].price.value - ((variant[0].price.value * variant[0].price.discount) / 100)}{variant[0].price.currencySign}</Price>
            : null
          }
        </PriceHolder>
        <Link href={{ pathname: '/eshop/product', query: { id: _id } }}>
          <StyledCartLink>Kúpiť</StyledCartLink>
        </Link>
      </ProductBody>
    </ProductItem>
  </Col>
);
const FeaturecProductsFill: React.FC<IProductsFillProps> = ({
  products,
  addProduct,
}) => {
  const elements: JSX.Element[] = products.slice(0,4).map((item: Product) => {
    const { _id } = item;

    return <FeatureProduct product={item} addProduct={addProduct} key={_id} />;
  });

  return <>{elements}</>;
};

export default FeaturecProductsFill;