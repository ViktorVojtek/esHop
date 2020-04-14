import React from 'react';

import { Container, Col, Row } from 'reactstrap';

import { H3, Link, P, Wrapper, } from './style/index';

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
              <P>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1550s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</P>
            </Col>
          </Row>
          <Row>
            <Col xl="6" md="6">
              <Row>
                <Col md="6">
                  <P>Rezervácie</P>
                  <Link href="tel:+421911111111">+421 911 111 111</Link>
                </Col>
                <Col md="6">
                  <P>Infolinka</P>
                  <Link href="tel:+421911111111">+421 911 111 111</Link>
                </Col>
                <Col md="6">
                  <P>Email</P>
                  <Link href="mailto:contact@kupelecks.sk">contact@kupelecks.sk</Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </Wrapper>
);

export default ContactUs;