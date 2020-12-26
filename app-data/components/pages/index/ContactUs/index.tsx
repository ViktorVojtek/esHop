import React, { FC } from 'react';

import { Container, Col, Row } from 'reactstrap';
import {
  CustomLink,
  P,
  Wrapper,
  H3,
  CustomLinkHolder,
  Item,
  PhoneIcon,
  EnvelopeIcon,
  WhatsappIcon,
  ViberIcon,
} from './style/index';

import { ITelItem } from './TS/ContactUs.interface';
import Link from 'next/link';
import { colors } from '../../../../shared/design';

const ContactItemCol: FC<ITelItem> = ({ email, tel, title, customHref }) => (
  <CustomLinkHolder>
    <P>{email ? 'Email' : title}</P>
    <CustomLink
      href={customHref ? customHref : email ? `mailto:${email}` : `tel:${tel}`}
    >
      {email ? email : tel}
    </CustomLink>
  </CustomLinkHolder>
);
const ContactUs = () => (
  <Wrapper className="mobile-text-center">
    <Container>
      <Row>
        <Col lg={3} md={6} xs={12}>
          <Item>
            <PhoneIcon />
            <ContactItemCol tel="+421 911 338 828" title="Infolinka eshop" />
          </Item>
        </Col>
        <Col lg={3} md={6} xs={12}>
          <Item>
            <EnvelopeIcon />
            <ContactItemCol
              email="eshop@kupelecks.sk "
              title="eshop@kupelecks.sk "
            />
          </Item>
        </Col>
        <Col lg={3} md={6} xs={12}>
          <Item>
            <WhatsappIcon />
            <ContactItemCol tel="+421 911 338 828" title="Whatsapp" />
          </Item>
        </Col>
        <Col lg={3} md={6} xs={12}>
          <Item>
            <ViberIcon />
            <ContactItemCol tel="+421 911 338 828" title="Viber" />
          </Item>
        </Col>
        {/*<ItemsHolder>
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
          </ItemsHolder>*/}
        <P style={{ padding: '16px', textAlign: 'center' }}>
          V prípade nejasností navštívte stránku{' '}
          <Link href="/kontakt">
            <a style={{ color: `${colors.primary}`, fontWeight: 'bold' }}>
              pomoc
            </a>
          </Link>
          . Nájdete tam základné informácie ako používať našu stránku, ako si
          objednať, ako sa prihlásiť a pod.
        </P>
      </Row>
    </Container>
  </Wrapper>
);

export default ContactUs;
