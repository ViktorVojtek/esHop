import styled from 'styled-components';
import { Cart } from '@styled-icons/boxicons-regular';
import { Eye } from '@styled-icons/evaicons-solid';

export const PriceHolder = styled.div``;

export const ProductItem = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

export const ProductBody = styled.div`
  width: 70%;
  padding: 0rem 2rem;
  position: relative;
`;

export const Price = styled.p`
  font-weight: 600;
  font-size: 1.5rem;
  color: #FF4D7D;
  padding-bottom: .75rem;
`;

export const ProductImg = styled.img`
  width: 100%;
`;

export const ImageWrap = styled.aside`
  width:30%;
`;

export const IconCart = styled(Cart)`
  color: #2a2a2a; 
  width: 20px;
`;
export const EyeDetail = styled(Eye)`
  color: rgb(0,174,239);
  width: 60px;
  transform: scale(0);
  transition: all .4s;
`;

export const StyledProductTitle = styled.h2`
  font-weight: 600;
  color: #3B3B3B !important;
  font-size: 1.5rem;
  transition: all ease-out .3s;
  &:hover{
    color: #FF4D7D !important;
  }
`;

export const StyledShortDescription = styled.h4`
  color: #B3B3B3;
`;

export const StyledDescription = styled.p`
color: #B3B3B3;
`;

export const StyledCartLink = styled.a`
  background-color: #FF4D7D;
  text-transform: uppercase;
  color: #FFF !important;
  padding: 1.25rem;
  border-radius: .35rem;
  
  &:hover {
    cursor: pointer;
  }
`;

export const StyledCartBtn = styled.button`
  background-color: #FF4D7D;
  text-transform: uppercase;
  color: #FFF !important;
  padding: 1rem 1.25rem;
  border-radius: .35rem;
  outline: none !important;
  border-radius: 6px;
  border: none;
  font-size: .8rem;
  position: absolute;
  bottom: 1rem;
  transition: all .3s ease-out;
  &:hover{
    background-color: #f4255d;
  }
`;
