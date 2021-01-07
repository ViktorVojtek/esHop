import React, { useEffect, useState } from 'react';
import {
  Wrapper,
  Image,
  Title,
  TitleMobile,
  Price,
  Description,
  ActionPrice,
  Del,
  DetailInfo,
} from './styles/productDetail.style';
import Link from 'next/link';

import { Container, Row, Col, Spinner } from 'reactstrap';
// Types
import Service from '../../../../../shared/types/Service.types';

import { formatPrice } from '../../../../../shared/helpers/formatters';
import {
  Head,
  RelatedTitle,
  VariantTitle,
} from '../ProductDetail/styles/productDetail.style';
import DescriptionEl from './Description';
import { ProductButton } from '../../../../../shared/design';
import { useQuery } from '@apollo/react-hooks';
import { SERVICES_QUERY } from '../../../../../graphql/query';
import RelatedServices from '../../../../../shared/components/RelatedServices';

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

  const [services, setServices] = useState([]);

  const { error, loading, data } = useQuery(SERVICES_QUERY, {
    variables: { subCategoryId: subCategory.id },
  });
  useEffect(() => {
    if (data) {
      let { services } = data;
      setRelatedServices(services);
    }
  }, [data]);

  if (error) {
    return <>{error.message}</>;
  }
  if (loading) {
    return <Spinner color="primary" />;
  }

  const setRelatedServices = (services: Service[]) => {
    const filteredServices = services.filter((item) => item._id !== _id);
    setServices(filteredServices);
  };

  function renderDescription(description) {
    return { __html: description };
  }
  return (
    <Wrapper>
      <Container>
        <Row>
          <Col md="6">
            <TitleMobile className="mb-3">{title}</TitleMobile>
            {img && <Image src={img.path} alt={img.title} className="mb-3" />}
          </Col>
          <Col>
            <DetailInfo>
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
              <Link href={`/rezervacia?service=${title}`}>
                <ProductButton className="mt-0">Rezervovať</ProductButton>
              </Link>
              <VariantTitle className="mt-4">Popis produktu</VariantTitle>
              <DescriptionEl text={html} />
            </DetailInfo>
          </Col>
        </Row>
      </Container>
      <Container>
        <RelatedTitle>Súvisiace služby</RelatedTitle>
        <RelatedServices services={services} />
      </Container>
    </Wrapper>
  );
};

export default ServiceDetailBody;
