import styled from 'styled-components';
import {Bed, Spa, MoneyBillAlt} from '@styled-icons/fa-solid';
import {RestaurantMenu} from '@styled-icons/material';

export const H2 = styled.h2`
  font-size: 1.5rem;
  font-family: MuseoSans-300;
  color: #5e8796;
  font-weight: bold;
  text-align: center;
  padding-top: 1rem;
  user-select: none;
  @media(max-width: 768px){
    font-size: 1.25rem;
  }
`;

export const StayIcon = styled(Bed)`
  color: #00aeefb8;
  width: 120px;
  height: 80px;
`;
export const ProceduresIcon = styled(Spa)`
  color: #00aeefb8;
  width: 120px;
  height: 80px;
`;
export const MoneyIcon = styled(MoneyBillAlt)`
  color: #00aeefb8;
  width: 120px;
  height: 80px;
`;
export const RestaurantIcon = styled(RestaurantMenu)`
  color: #00aeefb8;
  width: 120px;
  height: 80px;
`;

export const ItemHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  
  cursor: pointer;
  svg{
    transition: all .3s ease-out;
  }
  &:hover{
    svg{
      color: #00aeef;
      transform: scale(1.3);
    }
  }
`;