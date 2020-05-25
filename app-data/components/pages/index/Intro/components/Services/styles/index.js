import styled from 'styled-components';
import {ShippingFast, Gift, HandHoldingHeart, Leaf} from '@styled-icons/fa-solid'

export const ServiceHolder = styled.div`
  background-color: #00aeefb8;
  padding: 2rem 0rem; 
`;

export const ServiceTitle = styled.h5`
  color: white;
  text-transform: uppercase;
  font-weight: 600;
`;
export const ServiceText = styled.p`
  color: white;
  text-align: center;
`;
export const Service = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const ShippingFastIcon = styled(ShippingFast)`
  color: white;
  width: 60px;
  margin: 1rem;
`;
export const GiftIcon = styled(Gift)`
  color: white; 
  width: 60px;
  margin: 1rem;
`;
export const HandHoldingHeartIcon = styled(HandHoldingHeart)`
  color: white; 
  width: 60px;
  margin: 1rem;
`;
export const LeafIcon = styled(Leaf)`
  color: white; 
  width: 60px;
  margin: 1rem;
`;

export const Divider = styled.div`
  width: 60px;
  height: 2px;
  background-color: white;
  margin: 0 auto;
  display: block;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;