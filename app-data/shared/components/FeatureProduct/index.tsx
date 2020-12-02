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
import { formatPrice } from '../../helpers/formatters';
import { DiscountRibbon } from '../Ribbon/DiscountRibbon';
import { NewProductRibbon } from '../Ribbon/NewProductRibbon';
import { RibbonHolder } from '../Ribbon/RibbonHolder';

const FeatureProduct: FC<IProductUI> = ({
  product: { _id, variants, subCategory, title },
  addProduct,
}) => (
  <Col lg="3" sm="6" xs="12" className="mb-4" key={_id}>
    <ProductItem>
      <div>
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
      <Link href={{ pathname: '/eshop/product', query: { id: _id } }}>
        <StyledCartLink>Ihneď kúpiť</StyledCartLink>
      </Link>
      <RibbonHolder>
        {variants[0].discount > 0 && (
          <DiscountRibbon text={`ZĽAVA ${variants[0].discount} %`} />
        )}
        <NewProductRibbon text="Novinka" />
      </RibbonHolder>
    </ProductItem>
  </Col>
);
const FeaturecProductsFill: React.FC<IProductsFillProps> = ({
  products,
  addProduct,
}) => {
  const elements: JSX.Element[] = products.slice(0, 8).map((item: Product) => {
    const { _id } = item;
    console.log(products);

    return <FeatureProduct product={item} addProduct={addProduct} key={_id} />;
  });

  return <>{elements}</>;
};

export default FeaturecProductsFill;
