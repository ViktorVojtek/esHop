import React, { FC } from 'react';
import { Container, Row, Col } from 'reactstrap';

import {
  ServiceHolder, ServiceTitle, ServiceText, ShippingFastIcon, Service, GiftIcon,
  HandHoldingHeartIcon, LeafIcon, Divider,
} from './styles';

const Services: FC = () => (
  <ServiceHolder>
    <Container>
      <Row className="align-items-center">
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
            <GiftIcon />
            <ServiceTitle>Krásne balíčky</ServiceTitle>
            <Divider />
            <ServiceText>Každý produkt je jemne balený v krásnom farebnom balíčku.</ServiceText>
          </Service>
        </Col>
        <Col lg="3" md="6">
          <Service>
            <HandHoldingHeartIcon />
            <ServiceTitle>Ručne vyrobené</ServiceTitle>
            <Divider />
            <ServiceText>Všetky produkty z nášho eshopu boli vyrobené ručne a s láskou.</ServiceText>
          </Service>
        </Col>
        <Col lg="3" md="6">
          <Service>
            <LeafIcon />
            <ServiceTitle>100% organické</ServiceTitle>
            <Divider />
            <ServiceText>Naša kozmenika je bez akejkoľvek syntetiky.</ServiceText>
          </Service>
        </Col>
      </Row>
    </Container>
  </ServiceHolder>
);

 export default Services;