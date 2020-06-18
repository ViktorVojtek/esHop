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
