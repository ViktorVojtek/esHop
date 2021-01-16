import styled from 'styled-components';
import { Eye } from '@styled-icons/evaicons-solid';

export const ProductItem = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 2rem;
`;

export const ImageWrap = styled.div``;

export const ProductImg = styled.img`
  width: 100%;
  transition: all 0.4s ease-out;
`;

export const EyeDetail = styled(Eye)`
  color: rgb(0, 174, 239);
  width: 60px;
  transform: scale(0);
  transition: all 0.4s;
`;

export const ProductBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProductTitle = styled.h4`
  text-align: center;
  padding: 1rem 0.25rem;
  color: #5e8796;
  font-weight: bold;
  user-select: none;
  margin: 0;
  font-size: 1.2rem;
`;

export const StyledShortDescription = styled.p`
  color: #abb0b2;
  text-align: center;
  padding: 0rem 0.5rem 1rem 0.5rem;
  margin: 0;
`;

export const PriceHolder = styled.div`
  display: flex;
`;

export const Price = styled.p`
  margin: 0rem 0.2rem;
  font-weight: 600;
  font-size: 1.2rem;
`;

export const StyledCartLink = styled.a`
  background-color: #00aeefb8;
  text-transform: uppercase;
  color: #fff !important;
  padding: 1rem 2.5rem;
  border-radius: 0.35rem;
  transition: all 0.3s ease-out;
  cursor: pointer;
  letter-spacing: 2px;
  font-weight: 600;
  margin-top: 1rem;
  display: inline-block;
  &:hover {
    background-color: #00aeef;
  }
`;
