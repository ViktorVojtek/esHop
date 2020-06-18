import styled from 'styled-components';
import { DownArrow } from '@styled-icons/boxicons-regular';

export const Wrapper = styled.div`
  margin-top: 6rem;
  @media(max-width: 992px){
    margin-top: 0;
  }
`;

export const H3 = styled.h2`
  text-align: left;
  color: #5e8796;
  position: relative;
  font-size: 1.5em !important;
  font-weight: 600;
  margin-bottom: 1rem;
  cursor: pointer;
  }
`; 

export const CartIcon = styled(DownArrow)<ICartIcon>`
  width: 24px;
  color: #00aeef;
  cursor: pointer;
  transition: all .3s ease-out;
  transform: ${({ isOpen }) =>isOpen ? `rotate(0deg)` : 'rotate(-90deg)'};
`;
export const HeadWithIcon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

export const P = styled.p``;

export const StyledModalLink = styled.a`
  background-color: #00aeefb8;
  text-transform: uppercase;
  color: #FFF !important;
  padding: 1rem 1.5rem;
  border-radius: .35rem;
  transition: all .3s ease-out;
  cursor: pointer;
  letter-spacing: 0px;
  font-weight: 600;
  margin-top: 1rem;
  display: inline-block;
  user-select: none;
  &:hover{
    background-color: #00aeef;
  }
`;

export const StyledModalBtn = styled.button`
  background-color: #00aeefb8;
  font-family: MuseoSans-300;
  text-transform: uppercase;
  color: #FFF !important;
  padding: 1rem 1.5rem;
  border-radius: .35rem;
  outline: none !important;
  border-radius: 6px;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  position: relative;
  margin-top: 1rem;
  letter-spacing: 0px;
  user-select: none;
  transition: all .3s ease-out;
  &:hover{
    background-color: #00aeef;
  }
`;

interface ICartIcon {
  isOpen?: Boolean;
}