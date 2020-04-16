import styled from 'styled-components';
import {Cart, Heart} from '@styled-icons/boxicons-regular';
import {Eye} from '@styled-icons/evil';

export const PriceHolder = styled.div``;
export const Price = styled.span`
    font-weight: 600;
    line-height: 16px;
    color: #2a2a2a;
    font-size: 20px;
`;
export const ProductImg = styled.div`
  position: relative;
  overflow: hidden;
`;
export const Icons = styled.div`
  width: 90%;
  padding: 7px 30px;
  position: absolute;
  bottom: -100px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  -o-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  background: rgba(255,77,125,0.4);
  transition: all 400ms ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const IconCart = styled(Cart)`
  color: #2a2a2a; 
  width: 20px;
`;
export const IconDetail = styled(Eye)`
  color: #2a2a2a;
  width: 75%; 
`;
export const IconFavorite = styled(Heart)`
  color: #2a2a2a; 
  width: 18px;
`;
export const IconLink = styled.a`
  display: block;
  height: 36px;
  line-height: 34px;
  width: 36px;
  text-align: center;
  background: #fff;
  border-radius: 30px;
  color: #2a2a2a;
`;