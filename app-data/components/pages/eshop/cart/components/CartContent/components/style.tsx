import { Paper } from '@material-ui/core';
import styled from 'styled-components';
import { colors } from '../../../../../../../shared/design';

export const StyledPaper = styled(Paper)`
  display: flex;
  padding: 12px;
  margin-bottom: 12px;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`;
export const ImageHolder = styled.div`
  flex: 1 1 auto;
  max-width: 100px;
`;
export const InfoHolder = styled.div`
  flex: 1 1 auto;
  padding-left: 24px;
  display: flex;
  align-items: center;
`;
export const Count = styled.div`
  flex: 1 1 auto;
  max-width: 100px;
  margin-right: 12px;
`;
export const PriceAndActions = styled.div`
  flex: 1 1 auto;
  max-width: 220px;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;
export const Title = styled.h3`
  color: ${colors.primary};
  font-weight: bold;
  font-size: 1.25rem;
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
  }
`;
export const Text = styled.p`
  margin-bottom: 0.5rem;
  @media (max-width: 768px) {
    margin-bottom: 0.25rem;
    font-size: 0.9rem;
  }
`;
export const PriceHolder = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 32px;
  @media (max-width: 768px) {
    margin-top: 12px;
    margin-right: 0px;
    margin-left: auto;
    text-align: right;
  }
`;
export const Price = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 6px;
  @media (max-width: 768px) {
    margin-bottom: 0px;
  }
`;
export const TaxText = styled.span`
  font-size: 0.9rem;
  color: #666;
`;
export const TaxPrice = styled.span`
  font-size: 0.9rem;
  font-weight: bold;
  color: #666;
`;
export const ServicesHolder = styled.div`
  margin-right: 32px;
  text-align: right;
  @media (max-width: 768px) {
    text-align: left;
    margin-right: 0;
    margin-top: 8px;
  }
`;

export const Venovanie = styled(Text)`
  max-width: 350px;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

//Mobile product

export const StyledPaperMobile = styled(Paper)`
  display: none;
  padding: 12px;
  margin-bottom: 12px;
  flex-direction: column;
  @media (max-width: 768px) {
    display: flex;
  }
`;
export const TopHolder = styled.div`
  display: flex;
  align-items: flex-start;
`;
export const BottomHolder = styled.div`
  display: flex;
  align-items: flex-end;
`;
export const MobileImage = styled.img`
  width: 100%;
  max-width: 60px;
`;
