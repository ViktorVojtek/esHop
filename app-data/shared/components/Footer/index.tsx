import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import NavigationBottom from '../Navigation/NavigationBottom/index';
import {
  BottomDiv,
  Wrapper,
  Logo,
  CreatedBy,
  ScrollTop,
} from './style/footer.style';

const Footer: () => JSX.Element = () => (
  <Wrapper>
    <NavigationBottom />
    <BottomDiv>
      <Logo src="/images/logo.png" alt="Červený Kláštor" />
      <CreatedBy>
        &copy; 2020 Designed and Created by CodeBrothers s.r.o.
      </CreatedBy>
      <AnchorLink href="#navigation">
        <ScrollTop
          src="/icons/home.png"
          alt="home"
          className="button-icon-white"
        />
      </AnchorLink>
    </BottomDiv>
  </Wrapper>
);

export default Footer;
