import React from 'react';
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

const Footer: () => JSX.Element = () => (
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
                <Link href="zasady-ochrany-osobnych-udajov">
                  <A>Zásady ochrany osobných údajov</A>
                </Link>
                <Link href="zasady-ochrany-osobnych-udajov">
                  <A>Zásady používania súborov cookies</A>
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
  </Wrapper>
);

export default Footer;
