import React, { FC } from 'react';

import { Col, Row } from 'reactstrap';
import Link from 'next/link';
import Service from '../../../shared/types/Service.types';
import {
  ProductItem,
  ImageWrap,
  ProductImg,
  EyeDetail,
  ProductBody,
  StyledShortDescription,
  PriceHolder,
  Price,
  StyledCartLink,
} from './styles/index.js';
import {
  Del,
  ActionPrice,
  StyledProductTitle,
} from '../../../components/pages/eshop/components/Products/components/ProductsFill/styles/products.style';
import { formatPrice } from '../../helpers/formatters';
import { ProductButton } from '../../design';
import { RibbonHolder } from '../Ribbon/RibbonHolder';
import { DiscountRibbon } from '../Ribbon/DiscountRibbon';
import { IProductTitle } from '../../../components/pages/eshop/components/Products/components/ProductsFill/types/ProductFill.types';

type RelatedServiceType = {
  service: Service;
};
type RelatedServicesType = {
  services: Service[];
};

const ProductTitle: React.FC<IProductTitle> = ({ id, title }) => (
  <Link href={{ pathname: '/eshop/product', query: { id } }}>
    <a>
      <StyledProductTitle>{title}</StyledProductTitle>
    </a>
  </Link>
);

const RelatedService: FC<RelatedServiceType> = ({
  service: { _id, title, subCategory, html, img, price, video, discount },
}) => (
  <Col lg="3" md="6" sm="12" className="mb-4" key={_id}>
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
const RelatedServicesFill: React.FC<RelatedServicesType> = ({ services }) => {
  const elements: JSX.Element[] = services.slice(0, 4).map((item: Service) => {
    const { _id } = item;

    return <RelatedService service={item} key={_id} />;
  });

  return <Row>{elements}</Row>;
};

export default RelatedServicesFill;
