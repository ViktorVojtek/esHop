import React, { FC } from 'react';

import { Container, Col, Row } from 'reactstrap';
import {
  H3,
  CustomLink,
  P,
  Wrapper,
  Facebook,
  Youtube,
  Instagram,
  SocialHolder,
} from './style/index';

import { ITelItem } from './TS/ContactUs.interface';
import Link from 'next/link';

const ContactItemCol: FC<ITelItem> = ({ email, tel, title }) => (
  <>
    <P>{email ? 'Email' : title}</P>
    <CustomLink href={email ? `mailto:${email}` : `tel:${tel}`}>
      {email ? email : tel}
    </CustomLink>
  </>
);
const ContactUs = () => (
  <Wrapper className="mobile-text-center">
    <Container fluid>
      <Row>
        <Col xl="4" md="12">
          <H3>Kontaktujte nás</H3>
        </Col>
        <Col xl="8" md="12">
          <Row>
            <Col md="8">
              <P>
                V prípade nejasností navštívte stránku{' '}
                <Link href="kontakt">často kladené otázky</Link>. Nájdete tam
                základné informácie ako používať našu stránku, ako si objednať,
                ako sa prihlásiť a pod. Ak ste nenašli to čo hľadáte tak nás
                neváhajte kontaktovať prostredníctvom online chatu alebo
                email/telefón.
              </P>
            </Col>
          </Row>
          <Row>
            <Col xl="8" md="12">
              <Row>
                <Col md="6">
                  <ContactItemCol
                    tel="+421 914 338 820"
                    title="Rezervácie kúpele"
                  />
                  <ContactItemCol
                    tel="+421 911 338 828"
                    title="Infolinka eshop"
                  />
                  <ContactItemCol
                    email="eshop@kupelecks.sk "
                    title="eshop@kupelecks.sk "
                  />
                </Col>
                <Col md="6">
                  <P>Prevádzovateľ</P>
                  <P style={{ color: '#000', margin: '0', marginTop: '4px' }}>
                    <strong>AMICUS RELAX s.r.o.</strong>
                  </P>
                  <P style={{ color: '#000', margin: '0', marginTop: '8px' }}>
                    <strong>Popradská 6, 064 01, Stará Ľubovňa</strong>
                  </P>
                  <P style={{ color: '#000', margin: '0', marginTop: '8px' }}>
                    <strong>IČO: </strong>36849987
                  </P>
                  <P style={{ color: '#000', margin: '0', marginTop: '8px' }}>
                    <strong>DIČ: </strong>2022474025
                  </P>
                  <P style={{ color: '#000', margin: '0', marginTop: '8px' }}>
                    <strong>IČ DPH: </strong>SK2022474025
                  </P>
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
