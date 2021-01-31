import React, { useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import {
  Wrapper,
  Logo,
  TextWithIcon,
  StyledEnvelope,
  StyledLocation,
  StyledTelephone,
  IconHolder,
  Title,
  StyledLink,
  TextBlock,
  Text,
} from './style/footer.style';
import { Container, Row, Col } from 'reactstrap';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import ReactGA from 'react-ga';

import {
  Facebook,
  SocialHolder,
  Instagram,
  Youtube,
} from '../../../components/pages/index/ContactUs/style';
const Footer: () => JSX.Element = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    ReactGA.initialize('UA-127305873-2');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <Wrapper>
      <Container>
        <Logo src="/images/logo.png" alt="Červený Kláštor" />
        <Row>
          <Col md={3} sm={6}>
            <Title>Kontakt</Title>
            <TextWithIcon>
              <IconHolder>
                <StyledLocation />
              </IconHolder>
              <TextBlock>
                <Text>Červený Kláštor 147</Text>
                <Text>059 06 Červený Kláštor</Text>
              </TextBlock>
            </TextWithIcon>
            <TextWithIcon>
              <IconHolder>
                <StyledTelephone />
              </IconHolder>
              <TextBlock>
                <StyledLink href="tel:+421 911 338 828">
                  +421 911 338 828
                </StyledLink>
                <StyledLink href="tel:+421 914 338 829">
                  +421 914 338 829
                </StyledLink>
              </TextBlock>
            </TextWithIcon>
            <TextWithIcon>
              <IconHolder>
                <StyledEnvelope />
              </IconHolder>
              <TextBlock>
                <StyledLink href="mailto:eshop@kupelecks.sk">
                  eshop@kupelecks.sk
                </StyledLink>
              </TextBlock>
            </TextWithIcon>
          </Col>
          <Col md={3} sm={6}>
            <Title>Info</Title>
            <TextBlock>
              <StyledLink
                href="https://kupelecks.sk/o-nas/#historia-a-sucasnost"
                target="_blank"
              >
                O spoločnosti
              </StyledLink>
              <Link href="/pravidla-ochrany-osobnych-udajov">
                <StyledLink>Pravidlá ochrany osobných údajov</StyledLink>
              </Link>
              <Link href="/pravidla-pouzivania-suborov-cookies">
                <StyledLink>Pravidlá používania súborov cookies</StyledLink>
              </Link>
              <Link href="/vseobecne-obchodne-podmienky">
                <StyledLink>Všeobecné obchodné podmienky</StyledLink>
              </Link>
            </TextBlock>
          </Col>
          <Col md={3} sm={6}>
            <Title>Obchod</Title>
            <TextBlock>
              <Link href="/kontakt">
                <StyledLink>Často kladené otázky</StyledLink>
              </Link>
              <Link href="/moja-zona?vernostny-program">
                <StyledLink>Vernostný program</StyledLink>
              </Link>
              <Link href="/moja-zona">
                <StyledLink>Moja zóna</StyledLink>
              </Link>
              <Link href="/#newsletter">
                <StyledLink>Newsletter</StyledLink>
              </Link>
            </TextBlock>
          </Col>
          <Col md={3} sm={6}>
            <Title>Navigácia</Title>
            <TextBlock>
              <Link href="/">
                <StyledLink>Domov</StyledLink>
              </Link>
              <Link href="/eshop">
                <StyledLink>Obchod</StyledLink>
              </Link>
              <Link href="/darcekove-poukazky">
                <StyledLink>Darčekové poukážky</StyledLink>
              </Link>
              <Link href="/kontakt">
                <StyledLink>Kontakt</StyledLink>
              </Link>
            </TextBlock>
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
      </Container>
      <MessengerCustomerChat pageId="105435127984415" appId="273865083851723" />
    </Wrapper>
  );
};

export default Footer;
