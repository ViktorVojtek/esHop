import styled from 'styled-components';
import { CloseCircle } from '@styled-icons/evaicons-solid';
import { Paper } from '@material-ui/core';
import { colors } from '../../../../shared/design';
import { Element } from 'react-scroll';

export const StyledElement = styled(Element)`
  position: relative;
`;

export const Wrapper = styled.div`
  width: 100vw;
  margin: 0 auto;
  margin-top: 150px;
  min-height: calc(100vh - 337px);
  @media (max-width: 768px) {
    margin-top: 120px;
  }
`;

export const Remove = styled(CloseCircle)`
  color: red;
  width: 26px;
  margin-left: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-out;
  &:hover {
    transform: scale(1.1);
  }
`;
type StyledPaperProps = {
  url?: string;
};
export const StyledPaper = styled(Paper)<StyledPaperProps>`
  margin-bottom: 24px;
  background-image: ${({ url }) => (url ? `url('${url}')` : '')};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 80vh;
  max-height: 380px;
  position: relative;
`;
export const OverFlow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(
    0deg,
    rgb(0 0 0 / 0.5) 25%,
    rgba(255, 255, 255, 0) 100%
  );
`;

export const IconsHolder = styled.div`
  display: flex;
  align-item: center;
  justify-content: center;
`;

export const P = styled.p`
  font-size: 1rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
  width: 100%;
  color: white;
  user-select: none;
`;
export const Item = styled.div`
  bottom: 20px;
  position: absolute;
  text-align: center;
  width: 100%;
`;
export const ItemTextProcedures = styled.h6`
  font-size: 1.25rem;
  font-weight: bold;
  text-align: left;
  margin-bottom: 0;
`;
export const Holder = styled.div`
  padding-left: 12px;
  padding-right: 12px;
`;
export const Price = styled.span`
  margin: 1rem 0rem;
  font-size: 1rem;
  color: white;
`;
export const ActionPrice = styled.span`
  color: white;
  font-weight: bold;
`;

export const Del = styled.del`
  font-size: 0.9rem;
`;
export const Text = styled.p`
  font-size: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;
export const Circle = styled.span<ImageColor>`
  width: 22px;
  height: 22px;
  border-radius: 128px;
  background-color: ${({ color }) => (color ? `${color}` : 'black')};
`;
export const Span = styled.span`
  font-size: 1rem;
  word-break: break-all;
`;
export const ItemText = styled.h6`
  font-size: 1.5rem;
  color: #5e8796;
  font-weight: bold;
`;

export const H4 = styled.h4`
  font-size: 1.25rem;
  color: black;
  font-weight: bold;
`;

export const H1 = styled.h3`
  color: red;
  text-align: center;
  font-size: 3rem;
  text-transform: uppercase;
  font-weight: bold;
  margin: 4rem 0rem;
  letter-spacing: 1px;
  font-family: Franchise-CE;
`;

export const H3 = styled.h3`
  font-size: 1.5rem;
  color: black;
  font-weight: bold;
  text-align: center;
  margin: 64px 0 32px 0;
`;
export const H5 = styled.h5`
  font-size: 1.5rem;
  color: black;
  font-weight: bold;
  text-align: center;
  margin: 64px 0 32px 0;
`;
export const RadioGroup = styled.div``;
export const RadioColorGroup = styled.div`
  margin-top: 2rem;
  display: flex;
`;

export const InputHolder = styled.div`
  margin: 0 auto;
  max-width: 400px;
  margin-bottom: 2rem;
  display: flex;
`;

export const Preview = styled.img`
  width: 100%;
`;

export const PreviewHolder = styled(Paper)`
  position: relative;
  overflow: hidden;
`;

export const PrednaStranaText = styled.p<IColorText>`
  font-size: 2.5rem;
  font-family: 'Engagement-Regular';
  color: ${({ colorText }) => (colorText ? `${colorText}` : 'black')};
  text-align: center;
  line-height: 2rem;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0;
  width: 100%;
  @media (max-width: 1200px) {
    font-size: 2rem;
    line-height: 1.75rem;
  }
  @media (max-width: 992px) {
    font-size: 1.5rem;
    line-height: 1.25rem;
  }
  @media (max-width: 768px) {
    font-size: 2.25rem;
    line-height: 2rem;
  }
  @media (max-width: 484px) {
    font-size: 1.75rem;
    line-height: 1.5rem;
  }
  @media (max-width: 410px) {
    font-size: 1.5rem;
    line-height: 1.25rem;
  }
  @media (max-width: 340px) {
    font-size: 1.25rem;
    line-height: 1.25rem;
  }
`;

export const PreviewTextHolder = styled.div`
  position: absolute;
  width: 100%;
  padding: 16px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
`;

export const StyledModalLink = styled.a`
  background-color: #00aeefb8;
  text-transform: uppercase;
  color: #fff !important;
  padding: 1rem 1.5rem;
  border-radius: 0.35rem;
  transition: all 0.3s ease-out;
  cursor: pointer;
  letter-spacing: 0px;
  font-weight: 600;
  margin-top: 1rem;
  display: inline-block;
  user-select: none;
  @media (max-width: 350px) {
    display: block;
    width: 100%;
    text-align: center;
  }
  &:hover {
    background-color: #00aeef;
  }
`;

export const BonusBadge = styled.div`
  position: absolute;
  padding: 4px 6px;
  top: 16px;
  right: 0;
  font-size: 0.75rem;
  background-color: red;
  color: white;
  border-radius: 4px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
`;

interface IPhotoRightItem {
  imageUrl?: string;
}
interface IColor {
  colorButton?: string;
}

interface IColorText {
  colorText?: string;
}
type ImageColor = {
  color: string;
};
