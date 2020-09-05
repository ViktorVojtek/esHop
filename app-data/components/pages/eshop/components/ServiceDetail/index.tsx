import React from 'react';
import {
  Wrapper,
  Image,
  Title,
  TitleMobile,
  Price,
  Description,
  StyledCartBtn,
  ActionPrice,
  Del,
} from './styles/productDetail.style';
import Link from 'next/link';

import { Container, Row, Col, Spinner } from 'reactstrap';
import ProductModal from '../../../../../shared/components/ProductModal';
// Types
import Service from '../../../../../shared/types/Service.types';

import { formatPrice } from '../../../../../shared/helpers/formatters';
import { StyledCartLink } from '../Products/components/ProductsFill/styles/products.style';
import { Head } from '../ProductDetail/styles/productDetail.style';

interface IServiceDetailProps {
  service: Service;
}

const ServiceDetailBody: React.FC<IServiceDetailProps> = ({ service }) => {
  // product prop destruct
  const {
    _id,
    title,
    subCategory,
    html,
    img,
    price,
    video,
    discount,
  } = service;

  function renderDescription(description) {
    return { __html: description };
  }
  return (
    <Wrapper>
      <Container>
        <Row>
          <Col>
            <Title>{title}</Title>
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
            <Link href={{ pathname: '/rezervacia' }}>
              <StyledCartLink className="mt-0">Rezervovať</StyledCartLink>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Head>Popis produktu</Head>
            <Description dangerouslySetInnerHTML={renderDescription(html)} />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default ServiceDetailBody;
