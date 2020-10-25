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
  <Col md="6">
    <P>{email ? 'Email' : title}</P>
    <CustomLink href={email ? `mailto:${email}` : `tel:${tel}`}>
      {email ? email : tel}
    </CustomLink>
  </Col>
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
                <Col md="6">
                  <P>Sledujte nás!</P>
                  <SocialHolder>
                    <a
                      href="https://www.facebook.com/KupeleCervenyKlastorSmerdzonka"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <Facebook />
                    </a>
                    <a
                      href="https://www.instagram.com/kupelecervenyklastorsmerdzonka/"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <Instagram />
                    </a>
                    <a
                      href="https://www.youtube.com/channel/UCagE9AfD69zG7IOU9SMVgyg"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <Youtube />
                    </a>
                  </SocialHolder>
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
