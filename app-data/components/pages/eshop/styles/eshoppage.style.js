import styled from 'styled-components';
import { CartAlt } from '@styled-icons/boxicons-regular';

export const Wrapper = styled.div`
  margin-top: 6rem;
  @media(max-width: 1550px){
    padding-left: 40px;
    padding-right: 40px;
  }
`;

export const CartIcon = styled(CartAlt)`
  width: 24px;
  color: #00aeef;
  cursor: pointer;
`;
export const HeadWithIcon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const P = styled.p``;