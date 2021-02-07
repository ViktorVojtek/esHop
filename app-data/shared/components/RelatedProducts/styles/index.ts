import styled from 'styled-components';
import { Eye } from '@styled-icons/evaicons-solid';
import { Paper } from '@material-ui/core';
import CardGiftcardOutlinedIcon from '@material-ui/icons/CardGiftcardOutlined';
import { colors } from '../../../design';

type ProductImgType = {
  url?: string;
};

export const StyledProductTitle = styled.h5`
  text-align: left;
  color: ${colors.text};
  user-select: none;
  font-size: 1.1rem;

  font-weight: 600;
`;

export const ProductItem = styled(Paper)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 2rem;
`;

export const StyledCardGiftcardOutlinedIcon = styled(CardGiftcardOutlinedIcon)`
  color: ${colors.primary};
  cursor: pointer;
`;

export const ActionIconsHolder = styled.div``;

export const ActionHolder = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0px 12px;
  margin-top: 8px;
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

export const ProductTitle = styled.h4`
  text-align: center;
  padding: 1rem 0.25rem;
  color: #5e8796;
  font-weight: bold;
  user-select: none;
  margin: 0;
  font-size: 1.2rem;
`;

export const StyledShortDescription = styled.p`
  color: #abb0b2;
  text-align: center;
  padding: 0rem 0.5rem 1rem 0.5rem;
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

export const Price = styled.p`
  margin: 0rem 0.2rem;
  font-weight: 600;
  font-size: 1rem;
  color: white;
`;

export const ActionPrice = styled.span`
  color: white;
  font-weight: 600;
`;

export const StyledCartLink = styled.a`
  background-color: #00aeefb8;
  text-transform: uppercase;
  color: #fff !important;
  padding: 1rem 3rem;
  border-radius: 0.35rem;
  transition: all 0.3s ease-out;
  cursor: pointer;
  letter-spacing: 2px;
  font-weight: 600;
  margin-top: 1rem;
  display: inline-block;
  &:hover {
    background-color: #00aeef;
  }
`;
