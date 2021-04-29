import styled from 'styled-components';
import { colors } from '../../../../../../../shared/design';

export const ServiceHolder = styled.div`
  padding: 2rem 0rem;
  margin-top: 32px;
`;

export const ServiceTitle = styled.h5`
  color: black;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1rem;
  margin-top: 16px;
  text-align: center;
  @media (max-width: 1200px) {
    font-size: 1rem;
  }
`;
export const ServiceText = styled.p`
  color: black;
  text-align: center;
  font-size: 0.9rem;
  margin-bottom: 0;
`;
export const Service = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border: 2px solid ${colors.primaryLight};
  border-radius: 12px;
  height: 100%;
`;

export const ServiceIcon = styled.img`
  width: 40px;
  margin: 1rem;
  height: 40px;
`;
