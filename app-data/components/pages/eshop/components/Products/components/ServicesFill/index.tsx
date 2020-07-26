import React, { FC } from 'react';
import Service from '../../../../../../../shared/types/Service.types';
import { Col } from 'reactstrap';
import {
  ProductItem,
  ImageWrap,
  ProductImg,
  EyeDetail,
  ProductBody,
  StyledShortDescription,
  PriceHolder,
  Price,
  Del,
  ActionPrice,
  StyledCartLink,
  StyledProductTitle,
} from '../ProductsFill/styles/products.style';
import Link from 'next/link';
import { formatPrice } from '../../../../../../../shared/helpers/formatters';
import { IProductTitle } from '../ProductsFill/types/ProductFill.types';

type IServiceUI = {
  product: Service;
};

const ProductTitle: React.FC<IProductTitle> = ({ id, title }) => (
  <Link href={{ pathname: '/eshop/product', query: { id } }}>
    <a>
      <StyledProductTitle>{title}</StyledProductTitle>
    </a>
  </Link>
);

const ServiceUI: FC<IServiceUI> = ({
  product: { _id, subCategory, title, img, discount, price },
}) => {
  return (
    <Col lg="3" sm="6" key={_id}>
      <ProductItem>
        <ImageWrap>
          <Link href={{ pathname: '/eshop/service', query: { id: _id } }}>
            <a>
              <div className="product-image">
                <ProductImg src={img.path} alt={title} />
                <div className="detail">
                  <EyeDetail />
                </div>
              </div>
            </a>
          </Link>
        </ImageWrap>{' '}
        <ProductBody>
          <ProductTitle id={_id} title={title} />
          <StyledShortDescription>{subCategory.title}</StyledShortDescription>
          <PriceHolder>
            {discount > 0 ? (
              <Price>
                <Del>
                  {formatPrice(price.value)} {price.currency}
                </Del>
                <ActionPrice className="ml-2">
                  {formatPrice(price.value - (price.value * discount) / 100)}{' '}
                  {price.currency}
                </ActionPrice>
              </Price>
            ) : (
              <Price>
                {formatPrice(price.value)} {price.currency}
              </Price>
            )}
          </PriceHolder>
          <Link href={{ pathname: '/rezervacia' }}>
            <StyledCartLink>Rezervovať</StyledCartLink>
          </Link>
        </ProductBody>
      </ProductItem>
    </Col>
  );
};

export default ServiceUI;
