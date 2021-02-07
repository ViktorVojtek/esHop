import { Paper } from '@material-ui/core';
import CardGiftcardOutlinedIcon from '@material-ui/icons/CardGiftcardOutlined';
import { Eye } from '@styled-icons/evaicons-solid';
import styled from 'styled-components';
import { colors } from '../../../../../../../../shared/design';

type ProductImgType = {
  url?: string;
};

export const ProductItem = styled(Paper)`
  position: relative;
  width: 250px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  margin-bottom: 16px;
  @media (max-width: 576px) {
    width: 100%;
  }
`;

export const ActionHolder = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0px 12px;
  margin-top: 8px;
`;

export const ActionIconsHolder = styled.div``;

export const StyledCardGiftcardOutlinedIcon = styled(CardGiftcardOutlinedIcon)`
  color: ${colors.primary};
  cursor: pointer;
`;

export const ActionButton = styled.button`
  background: transparent;
  outline: none !important;
  border: none;
  font-size: 1rem;
  text-align: left;
  color: ${colors.primary};
  cursor: pointer;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0px;
    left: 0px;
    background-color: ${colors.primary};
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: all 0.5s cubic-bezier(1, 0.25, 0, 0.75) 0s;
    transition: all 0.5s cubic-bezier(1, 0.25, 0, 0.75) 0s;
  }
  &:hover:before {
    visibility: visible;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
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

export const EyeDetail = styled(Eye)`
  color: rgb(0, 174, 239);
  width: 60px;
  transform: scale(0);
  transition: all 0.4s;
`;

export const ProductBody = styled.div`
  padding: 0 16px;
`;

export const StyledProductTitle = styled.h5`
  text-align: left;
  color: ${colors.text};
  user-select: none;
  font-size: 1.1rem;

  font-weight: 600;
`;

export const StyledShortDescription = styled.p`
  color: #abb0b2;
  text-align: left;
  margin: 0;
`;

export const PriceHolder = styled.div`
  background-color: ${colors.primary};
  background: linear-gradient(90deg, rgba(45,197,255,1) 0%, rgba(0,174,239,1) 100%);
  padding: 6px;
    border-radius: 4px;
    display: inline-block;
    position: relative;
    top: -17px;
}
`;

export const Price = styled.span`
  margin: 0rem 0.2rem;
  font-weight: 500;
  font-size: 1rem;
  user-select: none;
  color: white;
`;
export const ActionPrice = styled.span`
  color: white;
  font-weight: 600;
`;

export const Del = styled.del`
  font-size: 1rem;
`;
