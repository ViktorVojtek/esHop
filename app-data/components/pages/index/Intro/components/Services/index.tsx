import { useQuery } from '@apollo/react-hooks';
import React, { FC } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { FREEDELIVERY_QUERY } from '../../../../../../graphql/query';

import {
  ServiceHolder,
  ServiceTitle,
  ServiceText,
  ServiceIcon,
  Service,
} from './styles';

const Services: FC = () => {
  const freeDelivery = useFreeDelivery();
  return (
    <ServiceHolder>
      <Container>
        <Row>
          <Col lg="3" md="6" className="mb-4">
            <Service>
              <ServiceIcon src="/icons/gift.svg" />
              <ServiceTitle>Originálne balíčky</ServiceTitle>
              <ServiceText>
                Produkty sú jednoducho a ekologicky balené.
              </ServiceText>
            </Service>
          </Col>
          <Col lg="3" md="6" className="mb-4">
            <Service>
              <ServiceIcon src="/icons/delivery.svg" />
              <ServiceTitle>Výhodné doručenie</ServiceTitle>
              <ServiceText>
                {freeDelivery
                  ? `Doručenie zdarma pri objednávke nad ${freeDelivery} €.`
                  : `Bez ohľadu na veľkosť Vašej objednávky.`}
              </ServiceText>
            </Service>
          </Col>
          <Col lg="3" md="6" className="mb-4">
            <Service>
              <ServiceIcon src="/icons/heart.svg" />
              <ServiceTitle>Starostlivosť o Vás</ServiceTitle>
              <ServiceText>
                Pomoc s výberom a vernostný program pre stálych zákazníkov.
              </ServiceText>
            </Service>
          </Col>
          <Col lg="3" md="6" className="mb-4">
            <Service>
              <ServiceIcon src="/icons/leaf.svg" />
              <ServiceTitle>Vyskúšajte v Pieninách</ServiceTitle>
              <ServiceText>
                Našu krásnu prírodu a množstvo kvalitných služieb.
              </ServiceText>
            </Service>
          </Col>
        </Row>
      </Container>
    </ServiceHolder>
  );
};

export default Services;

function useFreeDelivery() {
  const { data } = useQuery(FREEDELIVERY_QUERY, {
    fetchPolicy: 'network-only',
  });
  if (data) {
    const { freeDeliveries } = data;
    if (freeDeliveries.length > 0) {
      return freeDeliveries[0].value;
    }
    return null;
  }
}
