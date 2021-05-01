import styled from 'styled-components';
import { DownArrow } from '@styled-icons/boxicons-regular';
import { Col, DropdownToggle } from 'reactstrap';
import { colors } from '../../../../shared/design';

export const Wrapper = styled.div`
  width: 100vw;
  margin: 0 auto;
  margin-top: 120px;
  min-height: calc(100vh - 562px);
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
  transition: all 0.3s ease-out;
  transform: ${({ isOpen }) => (isOpen ? `rotate(0deg)` : 'rotate(-90deg)')};
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
  color: #fff !important;
  padding: 1rem 1.5rem;
  border-radius: 0.35rem;
  transition: all 0.3s ease-out;
  cursor: pointer;
  letter-spacing: 0px;
  font-weight: 600;
  margin-top: 1rem;
  display: inline-block;
  user-select: none;
  @media (max-width: 350px) {
    display: block;
    width: 100%;
    text-align: center;
  }
  &:hover {
    background-color: #00aeef;
  }
`;

export const StyledModalBtn = styled.button`
  background-color: #00aeefb8;
  text-transform: uppercase;
  color: #fff !important;
  padding: 1rem 1.5rem;
  border-radius: 0.35rem;
  outline: none !important;
  border-radius: 6px;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  position: relative;
  margin-top: 1rem;
  letter-spacing: 0px;
  user-select: none;
  transition: all 0.3s ease-out;
  @media (max-width: 350px) {
    display: block;
    width: 100%;
    text-align: center;
  }
  &:hover {
    background-color: #00aeef;
  }
`;

interface ICartIcon {
  isOpen?: Boolean;
}

export const ActionHolder = styled.div``;

export const InputHolder = styled.div`
  position: relative;
  margin-bottom: 8px;
`;

export const SearchInput = styled.input`
  border: transparent;
  border-radius: 8px;
  background: #f6f7f8;
  color: black !important;
  padding: 20px 20px;
  width: 100%;
  font-weight: 600;
  font-size: 1rem;
  &: focus {
    outline: none;
  }
  &::placeholder {
    color: black !important;
  }
`;
export const InputIconHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 48px;
  height: 48px;
  position: absolute;
  top: 7px;
  right: 7px;
  border-radius: 8px;
  pointer-events: none;
`;

export const InputIcon = styled.img`
  width: 20px;
`;

export const FilterCol = styled(Col)`
  position: relative;
  top: -72px;
  @media (max-width: 992px) {
    top: 0;
  }
`;
