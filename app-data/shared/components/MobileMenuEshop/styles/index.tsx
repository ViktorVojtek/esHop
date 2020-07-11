import styled from 'styled-components';
import { Menu } from '@styled-icons/boxicons-regular';
import { Home } from '@styled-icons/evaicons-solid';

export const MenuIcon = styled(Menu)`
  color: #00aeef;
  width: 48px;
`;
export const HomeIcon = styled(Home)`
  color: #00aeef;
  width: 48px;
`;

export const Wrapper = styled.div`
  padding: 2rem;
`;

export const H2 = styled.h2`
  text-align: left;
  color: #5e8796;
  position: relative;
  font-size: 1.5em !important;
  font-weight: 600;
  margin-bottom: 1rem;
  cursor: pointer;
}`;
export const Logo = styled.img`
  @media (max-width: 768px) {
    width: 260px;
  }
  @media (max-width: 430px) {
    width: 260px;
  }
  @media (max-width: 400px) {
    width: 220px;
  }
  @media (max-width: 360px) {
    width: 180px;
  }
`;
