import styled from 'styled-components';
import { Cart } from '@styled-icons/boxicons-regular';

export const PriceHolder = styled.div``;

export const ProductItem = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

export const ProductBody = styled.div`
  width: 67%;
  padding: 0rem 2rem;
`;

export const Price = styled.p`
  font-weight: 600;
  font-size: 1.35rem;
  color: #FF4D7D;
  padding-bottom: .75rem;
`;

export const ProductImg = styled.img`
  width: 100%;
`;

export const ImageWrap = styled.aside`
  width:33%;
`;

export const IconCart = styled(Cart)`
  color: #2a2a2a; 
  width: 20px;
`;

export const StyledProductTitle = styled.h2`
  font-weight: 600;
  color: #3B3B3B !important;
  font-size: 1.5rem;
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
  padding: 1.25rem;
  border-radius: .35rem;
`;
