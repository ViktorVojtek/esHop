import React from 'react';
import { Container, Row } from 'reactstrap';
import {
  DesktopImage,
  Wrapper,
  MobileImageHead,
  MobileImageText,
} from './styles';

const KupeleCks = (): JSX.Element => (
  <Container fluid>
    <Row>
      <Wrapper>
        <a href="https://kupelecks.sk/" target="_blank">
          <DesktopImage
            src="/images/index/kupelecks.png"
            alt="Kúpele Červený Kláštor Smerdžonka"
          />
          <MobileImageHead
            src="/images/index/kupeleckshead.png"
            alt="Kúpele Červený Kláštor Smerdžonka"
          />
          <MobileImageText
            src="/images/index/kupeleckstext.png"
            alt="Kúpele Červený Kláštor Smerdžonka"
          />
        </a>
      </Wrapper>
    </Row>
  </Container>
);

export default KupeleCks;
