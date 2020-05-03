import styled from 'styled-components';
import {Cart} from '@styled-icons/boxicons-regular';

export const PriceHolder = styled.div``;
export const ProductItem = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;
export const ProductBody = styled.div`
  width: 67%;
  padding: 0rem 2rem;
`;
export const Price = styled.span`
    font-weight: 600;
    line-height: 16px;
    color: #2a2a2a;
    font-size: 20px;
`;
export const ProductImg = styled.img`
  width: 33%;
`;
export const IconCart = styled(Cart)`
  color: #2a2a2a; 
  width: 20px;
`;
export const StyledProductTitle = styled.h2`
  font-weight: 600;
  color: rgb(40, 40, 40) !important;
  font-size: 1.15rem;
`;
