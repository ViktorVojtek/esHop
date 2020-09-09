import React, { FC } from 'react';

import { Container, Col, Row } from 'reactstrap';
import { H3, CustomLink, P, Wrapper } from './style/index';

import { ITelItem } from './TS/ContactUs.interface';
import Link from 'next/link';

const ContactItemCol: FC<ITelItem> = ({ email, tel, title }) => (
  <Col md="6">
    <P>{email ? 'Email' : title}</P>
    <CustomLink href={email ? `mailto:${email}` : `tel:${tel}`}>
      {email ? email : tel}
    </CustomLink>
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
                Ak máte nejaké otázky, môžete sa pozrieť na{' '}
                <Link href="kontakt">často kladené otázky</Link>. Tu si môžete
                pozrieť, ako používať našu stránku, ako si objednať, ako sa
                prihlásiť a taktiež môžete sledovať vaše objednávky.
              </P>
            </Col>
          </Row>
          <Row>
            <Col xl="6" md="6">
              <Row>
                <ContactItemCol
                  tel="+421 914 338 820"
                  title="Rezervácie kúpele"
                />
                <ContactItemCol
                  tel="+421 911 904 880"
                  title="Infolinka eshop"
                />
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
