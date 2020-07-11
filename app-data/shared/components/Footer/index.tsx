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
import { scrollTop } from '../../helpers/';

const Footer: () => JSX.Element = () => (
  <Wrapper>
    <NavigationBottom />
    <BottomDiv>
      <Logo src="/images/logo.png" alt="Červený Kláštor" />
      <CreatedBy>
        &copy; 2020 Designed and Created by CodeBrothers s.r.o.
      </CreatedBy>
      <a onClick={() => scrollTop()}>
        <ScrollTop
          src="/icons/home.png"
          alt="home"
          className="button-icon-white"
        />
      </a>
    </BottomDiv>
  </Wrapper>
);

export default Footer;
