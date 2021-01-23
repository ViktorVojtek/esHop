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
  StyledProductTitle,
} from '../ProductsFill/styles/products.style';
import Link from 'next/link';
import { formatPrice } from '../../../../../../../shared/helpers/formatters';
import { IProductTitle } from '../ProductsFill/types/ProductFill.types';
import { ProductButton } from '../../../../../../../shared/design';
import { RibbonHolder } from '../../../../../../../shared/components/Ribbon/RibbonHolder';
import { DiscountRibbon } from '../../../../../../../shared/components/Ribbon/DiscountRibbon';

type IServiceUI = {
  product: Service;
};

const ProductTitle: React.FC<IProductTitle> = ({ id, title, slug }) => (
  <Link href={{ pathname: `/eshop/sluzba/${slug}` }}>
    <a>
      <StyledProductTitle>{title}</StyledProductTitle>
    </a>
  </Link>
);

const ServiceUI: FC<IServiceUI> = ({
  product: { _id, subCategory, title, img, discount, price, slug },
}) => {
  return (
    <Col lg="3" sm="6" key={_id}>
      <ProductItem>
        <ImageWrap>
          <Link href={{ pathname: `/eshop/sluzba/${slug}` }}>
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
          <ProductTitle id={_id} title={title} slug={slug} />
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
          <Link href={`/rezervacia?service=${title}`}>
            <ProductButton>Rezervovať</ProductButton>
          </Link>
        </ProductBody>
        <RibbonHolder>
          {discount > 0 && <DiscountRibbon text={`ZĽAVA ${discount} %`} />}
        </RibbonHolder>
      </ProductItem>
    </Col>
  );
};

export default ServiceUI;
