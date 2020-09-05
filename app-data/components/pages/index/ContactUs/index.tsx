import React, { FC } from 'react';

import { Container, Col, Row } from 'reactstrap';
import { H3, Link, P, Wrapper } from './style/index';

import { ITelItem } from './TS/ContactUs.interface';

const ContactItemCol: FC<ITelItem> = ({ email, tel, title }) => (
  <Col md="6">
    <P>{email ? 'Email' : title}</P>
    <Link href={email ? `mailto:${email}` : `tel:${tel}`}>
      {email ? email : tel}
    </Link>
  </Col>
);
const ContactUs = () => (
  <Wrapper>
    <Container fluid>
      <Row>
        <Col xl="4" md="12">
          <H3>Kontaktujte nás</H3>
        </Col>
        <Col xl="8" md="12">
          <Row>
            <Col sm="8">
              <P>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy text ever since the 1550s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book.
              </P>
            </Col>
          </Row>
          <Row>
            <Col xl="6" md="6">
              <Row>
                <ContactItemCol tel="+421 911 904 880" title="Rezervácie" />
                <ContactItemCol tel="+421 911 904 880" title="Infolinka" />
                <ContactItemCol
                  email="eshop@kupelecks.sk "
                  title="eshop@kupelecks.sk "
                />
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </Wrapper>
);

export default ContactUs;
