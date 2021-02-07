import styled from 'styled-components';
import { fonts } from '../../../../../../shared/design';

export const ButtonCategory = styled.button`
  background-color: #00aeefb8;
  font-family: ${fonts.primary}
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

export const ButtonSubCategory = styled.a`
  background-color: #00aeefb8;
  font-family: ${fonts.primary}
  text-transform: uppercase;
  color: #FFF !important;
  padding: 0.8rem 0.8rem;
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
  cursor: pointer;
  margin-left: 2rem;
  text-align: center;
  &:hover{
    background-color: #00aeef;
    color: white;
  }
`;

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
