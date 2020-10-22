import React, { useEffect } from 'react';
import Link from 'next/link';

import NavigationBottom from '../Navigation/NavigationBottom/index';
import {
  Wrapper,
  Logo,
  CreatedBy,
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

const Footer: () => JSX.Element = () => {
  useEffect(() => {
    ReactGA.initialize('UA-127305873-2');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <Wrapper>
      <NavigationBottom />
      <BottomDiv>
        <Container fluid>
          <Row>
            <Col md="6" sm="12">
              <Logo src="/images/logo.png" alt="Červený Kláštor" />
            </Col>
            <Col md="6" sm="12">
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
                <a onClick={() => scrollTop()}>
                  <ScrollTop
                    src="/icons/home.png"
                    alt="home"
                    className="button-icon-white"
                  />
                </a>
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
