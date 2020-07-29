import styled from 'styled-components';
import {
  ShippingFast,
  Gift,
  HandHoldingHeart,
  Leaf,
} from '@styled-icons/fa-solid';

export const ServiceHolder = styled.div`
  background-color: #00aeef;
  padding: 2rem 0rem;
`;

export const ServiceTitle = styled.h5`
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.15rem;
`;
export const ServiceText = styled.p`
  color: white;
  text-align: center;
  font-size: 1rem;
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
  height: 60px;
`;
export const GiftIcon = styled(Gift)`
  color: white;
  width: 60px;
  margin: 1rem;
  height: 60px;
`;
export const HandHoldingHeartIcon = styled(HandHoldingHeart)`
  color: white;
  width: 60px;
  margin: 1rem;
  height: 60px;
`;
export const LeafIcon = styled(Leaf)`
  color: white;
  width: 60px;
  margin: 1rem;
  height: 60px;
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
