import React, { useEffect } from 'react';
import Link from 'next/link';

import {
  Wrapper,
  Logo,
  ScrollTop,
  Links,
  A,
  BottomDiv,
  LinksHolder,
} from './style/footer.style';
import { Container, Row, Col } from 'reactstrap';
import { scrollTop } from '../../helpers/';
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
    ReactGA.initialize('UA-127305873-2');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <Wrapper>
      <BottomDiv>
        <Container fluid>
          <Row>
            <Col lg="4" sm="12">
              <Logo src="/images/logo.png" alt="Červený Kláštor" />
            </Col>
            <Col lg="4" sm="12">
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
            <Col lg="4" sm="12">
              <LinksHolder>
                <Links>
                  <Link href="/pravidla-ochrany-osobnych-udajov">
                    <A>Pravidlá ochrany osobných údajov</A>
                  </Link>
                  <Link href="/pravidla-pouzivania-suborov-cookies">
                    <A>Pravidlá používania súborov cookies</A>
                  </Link>
                  <Link href="/vseobecne-obchodne-podmienky">
                    <A>Všeobecné obchodné podmienky</A>
                  </Link>
                </Links>
              </LinksHolder>
            </Col>
          </Row>

          {/*<CreatedBy>
        &copy; 2020 Designed and Created by CodeBrothers s.r.o.
      </CreatedBy>*/}
        </Container>
      </BottomDiv>
      <MessengerCustomerChat pageId="105435127984415" appId="273865083851723" />
    </Wrapper>
  );
};

export default Footer;
