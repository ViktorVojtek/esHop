import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: #34495E;
  height: calc(100vh - 51px);

  @media only screen and (min-width: 36em) {  /* 576px */
    width: 192px;
  }

  @media only screen and (min-width: 48em) {  /* 768px */
    width: 225px;
  }

  @media only screen and (min-width: 62em) { /* 992px */
    width: 250px;
  }

  @media only screen and (min-width: 75em) { /* 1200px */
    width: 268px;
  }

  @media only screen and (min-width: 90em) { /* 1440px */
    width: 288px;
  }
`;

export const Nav = styled.ul`
  list-style: none;
`;

export const NavItem = styled.li`
  color: #FBFCFC;
`;
