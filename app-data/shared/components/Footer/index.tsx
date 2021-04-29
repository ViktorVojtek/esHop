import React, { useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import {
  Wrapper,
  Logo,
  Title,
  StyledLink,
  StyledLinkContact,
  TextBlock,
  Text,
  IconsHolder,
  Image,
  SocialHolder,
  Facebook,
  Instagram,
  Youtube,
  FooterBottom,
} from './style/footer.style';
import { Container, Row, Col } from 'reactstrap';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import ReactGA from 'react-ga';
import { SocialIcon } from '../SocialIcons';
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
        <Row>
          <Col lg={4} md={6} sm={12}>
            <Logo src="/icons/logo_CKSeshop.svg" alt="Červený Kláštor" />
            <Title>AMICUS RELAX, s.r.o.</Title>
            <TextBlock>
              <Text>Popradská 6, 064 01 Stará Ľubovňa</Text>
            </TextBlock>
            <TextBlock>
              <StyledLinkContact href="tel:+421 911 338 828">
                +421 911 338 828
              </StyledLinkContact>
            </TextBlock>
            <TextBlock>
              <StyledLinkContact href="mailto:eshop@kupelecks.sk">
                eshop@kupelecks.sk
              </StyledLinkContact>
            </TextBlock>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <Title>Info</Title>
            <TextBlock>
              <StyledLink
                href="https://kupelecks.sk/o-nas/#historia-a-sucasnost"
                target="_blank"
              >
                O kúpeľoch
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
          <Col lg={2} md={6} sm={12}>
            <Title>Obchod</Title>
            <TextBlock>
              <Link href="/kontakt#faq">
                <StyledLink>Často kladené otázky</StyledLink>
              </Link>
              <Link href="/moja-zona?tab=vernostny-program">
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
          <Col lg={2} md={6} sm={12}>
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
          </Col>
        </Row>
        <Row>
          <Col>
            <SocialHolder>
              <a
                target="_blank"
                href="https://www.facebook.com/KupeleCervenyKlastorSmerdzonka"
              >
                <Facebook>
                  <SocialIcon type="facebook" size={40} />
                </Facebook>
              </a>
              <a
                href="https://www.instagram.com/kupelecervenyklastorsmerdzonka/"
                target="_blank"
              >
                <Instagram>
                  <SocialIcon type="instagram" size={40} />
                </Instagram>
              </a>
              <a
                href="https://www.youtube.com/channel/UCagE9AfD69zG7IOU9SMVgyg"
                target="blank"
              >
                <Youtube>
                  <SocialIcon type="youtube" size={40} />
                </Youtube>
              </a>
            </SocialHolder>
          </Col>
        </Row>
        <Row>
          <Col>
            <FooterBottom>
              <Text>© 2021 AMICUS RELAX, s. r. o. Všetky práva vyhradené</Text>
              <IconsHolder>
                <Image src="/ecard_icons/verified-by-visa.png" />
                <Image src="/ecard_icons/ms_acc_opt_70_3x.png" />
                <Image src="/ecard_icons/VUB_ecard_logo.png" />
                <Image src="/ecard_icons/mc_securecode_logo.png" />
              </IconsHolder>
            </FooterBottom>
          </Col>
        </Row>
      </Container>
      <MessengerCustomerChat pageId="105435127984415" appId="273865083851723" />
    </Wrapper>
  );
};

export default Footer;
