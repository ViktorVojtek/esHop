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
            <ServiceText>
              Produkty sú jednoducho a ekologicky balené.
            </ServiceText>
          </Service>
        </Col>
        <Col lg="3" md="6">
          <Service>
            <ShippingFastIcon />
            <ServiceTitle>Výhodné doručenie</ServiceTitle>
            <Divider />
            <ServiceText>Bez ohľadu na veľkosť Vašej objednávky.</ServiceText>
          </Service>
        </Col>
        <Col lg="3" md="6">
          <Service>
            <HandHoldingHeartIcon />
            <ServiceTitle>Starostlivosť o Vás</ServiceTitle>
            <Divider />
            <ServiceText>
              Pomoc s výberom a vernostný program pre stálych zákazníkov.
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
