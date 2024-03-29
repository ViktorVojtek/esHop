import styled from 'styled-components';
import { Paper } from '@material-ui/core';
import { colors } from '../../../design';
import CardGiftcardOutlinedIcon from '@material-ui/icons/CardGiftcardOutlined';
import { Col } from 'reactstrap';

type ProductImgType = {
  url?: string;
};

export const StyledCardGiftcardOutlinedIcon = styled(CardGiftcardOutlinedIcon)`
  color: ${colors.primary};
  cursor: pointer;
`;

export const ActionHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0px 12px;
  margin: 8px 0;
`;

export const ActionButton = styled.button`
  background: transparent;
  border: 2px solid #bceafc;
  outline: none !important;
  font-size: 1rem;
  font-weight: bold;
  padding: 12px 20px;
  border-radius: 4px;
  color: ${colors.primary};
  cursor: pointer;
  transition: all 0.3s ease-out;
  position: relative;
  &:hover {
    border: 2px solid ${colors.primary};
    background-color: ${colors.primary};
    color: white;
  }
`;

export const GiftCardButton = styled.button`
  background: transparent;
  outline: none !important;
  font-size: 1rem;
  border: none;
  color: ${colors.primary};
  cursor: pointer;
  text-decoration: underline;
  margin-top: 16px;
`;

export const ProductItem = styled(Paper)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  background-color: ${colors.primaryLight} !important;
`;

export const ImageWrap = styled.div``;

export const ProductImg = styled.div<ProductImgType>`
  padding: 50%;
  width: 100%;
  user-select: none;
  transition: all 0.4s ease-out;
  background-image: ${({ url }) => (url ? `url('${url}')` : '')};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: 568px) {
    width: 80%;
    margin: 0 auto;
    display: block;
  }
`;

export const EyeDetail = styled.img`
  width: 60px;
  transform: scale(0);
  transition: all 0.4s;
`;

export const ProductBody = styled.div`
  padding: 0 16px;
`;

export const ProductTitle = styled.h4`
  text-align: center;
  color: ${colors.text};
  user-select: none;
  font-size: 1.1rem;
  font-weight: 600;
`;

export const StyledShortDescription = styled.p`
  text-align: center;
  margin: 0;
  font-size: 0.9rem;
  color: black;
  padding: 12px 0;
`;

export const PriceHolder = styled.div`
  padding: 16px 6px;
  width: 100%;
    position: relative;
    text-align: center;
}
`;

export const Price = styled.span`
  margin: 0rem 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  color: ${colors.primary};
`;
export const ActionPrice = styled.span`
  font-weight: 600;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${colors.primary};
`;

export const Del = styled.del`
  font-size: 1rem;
  color: #656667;
  font-weight: 400;
  margin-left: 8px;
`;

export const StyledCol = styled(Col)`
  margin-bottom: 32px;
`;
