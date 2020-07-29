import React, { FC } from 'react';
import { Container, Row, Col } from 'reactstrap';

import {
  ServiceHolder,
  ServiceTitle,
  ServiceText,
  ShippingFastIcon,
  Service,
  GiftIcon,
  HandHoldingHeartIcon,
  LeafIcon,
  Divider,
} from './styles';

const Services: FC = () => (
  <ServiceHolder>
    <Container>
      <Row className="align-items-center">
        <Col lg="3" md="6">
          <Service>
            <GiftIcon />
            <ServiceTitle>Originálne balíčky</ServiceTitle>
            <Divider />
            <ServiceText>Produkty sú balene v originálnom balení.</ServiceText>
          </Service>
        </Col>
        <Col lg="3" md="6">
          <Service>
            <ShippingFastIcon />
            <ServiceTitle>Doručenie zdarma</ServiceTitle>
            <Divider />
            <ServiceText>Nakúp nad 50 € a doručenie máš zdarma.</ServiceText>
          </Service>
        </Col>
        <Col lg="3" md="6">
          <Service>
            <HandHoldingHeartIcon />
            <ServiceTitle>Starostlivosť o Vás</ServiceTitle>
            <Divider />
            <ServiceText>
              Radi Vám poradíme pri výbere produktov a služieb.
            </ServiceText>
          </Service>
        </Col>
        <Col lg="3" md="6">
          <Service>
            <LeafIcon />
            <ServiceTitle>Vyskúšajte v Pieninách</ServiceTitle>
            <Divider />
            <ServiceText>
              Našu krásnu prírodu a množstvo kvalitných služieb.
            </ServiceText>
          </Service>
        </Col>
      </Row>
    </Container>
  </ServiceHolder>
);

export default Services;
