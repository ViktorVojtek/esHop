import styled from 'styled-components';
import { Bed, Spa, MoneyBillAlt } from '@styled-icons/fa-solid';
import { RestaurantMenu } from '@styled-icons/material';

export const H2 = styled.h2`
  font-size: 1.5rem;
  font-family: MuseoSans-300;
  color: #5e8796;
  font-weight: bold;
  text-align: center;
  padding-top: 1rem;
  user-select: none;
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const Circle = styled.div`
  position: absolute;
  top: -50px;
  width: 100px;
  height: 100px;
  border-radius: 60px;
  border: 3px solid white;
  background-color: #01aeef;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: calc(50% - 50px);
  transition: transform 0.3s ease-out;
`;

export const Card = styled.div`
  cursor: pointer;
  position: relative;
  transition: box-shadow 0.3s;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 60px 0px;
  position: relative;
  background-color: white;
  height: 100%;
  &:hover {
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
    ${Circle} {
      transform: scale(1.2);
    }
  }
`;

export const CreateCard = styled.button`
  background-color: #01aeef;
  border: 1px solid #01aeef;
  color: white;
  font-size: 16px;
  text-align: center;
  border-radius: 4px;
  padding: 12px 16px;
  outline: #0092ca !important;
  transition: all 0.3s ease-out;
  &:hover {
    filter: drop-shadow(lightgrey 1px 5px 5px);
    transform: translateY(-2px) !important;
  }
`;

export const P = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0rem;
  color: #a4a2a3;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const StayIcon = styled(Bed)`
  color: #00aeefb8;
  width: 120px;
  height: 80px;
`;
export const ProceduresIcon = styled(Spa)`
  color: white;
  width: 42px;
`;
export const MoneyIcon = styled(MoneyBillAlt)`
  color: white;
  width: 42px;
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
  svg {
    transition: all 0.3s ease-out;
  }
  &:hover {
    svg {
      color: #00aeef;
      transform: scale(1.3);
    }
  }
`;
