import styled from 'styled-components';
import { CloseCircle } from '@styled-icons/evaicons-solid';
import { Paper } from '@material-ui/core';

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
  imgUrl: string;
};

export const StyledPaper = styled(Paper)<StyledPaperProps>`
  margin-bottom: 24px;
  background-image: ${({ imgUrl }) => (imgUrl ? `url('${imgUrl}')` : '')};
  background-size: cover;
  background-position: center;
`;

export const P = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 0.5rem;
  width: 100%;
`;
export const Item = styled.div`
  padding: 24px 16px;
  background: rgba(0, 0, 0, 0.2);
`;
export const ItemTextProcedures = styled.h6`
  font-size: 1.25rem;
  font-weight: bold;
  text-align: left;
  margin-bottom: 0;
`;
export const Holder = styled.div`
  border-radius: 4px;
  background: rgba(255, 255, 255);
  padding-left: 12px;
  padding-right: 12px;
`;
export const Price = styled.span`
  margin: 1rem 0rem;
  font-weight: 600;
  font-size: 1rem;
`;
export const ActionPrice = styled.span`
  color: red;
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
  font-family: MuseoSans-300;
  color: #5e8796;
  font-weight: bold;
`;

export const H4 = styled.h4`
  font-size: 1.25rem;
  font-family: MuseoSans-300;
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
  font-family: MuseoSans-300;
  color: black;
  font-weight: bold;
  text-align: center;
  margin: 64px 0 32px 0;
`;
export const H5 = styled.h5`
  font-size: 1.5rem;
  font-family: MuseoSans-300;
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

export const NumberLabel = styled.label`
  font-size: 1.25rem;
  font-family: MuseoSans-300;
  color: black;
`;
export const AddToCart = styled.button`
  background-color: #00aeefb8;
  font-family: MuseoSans-300;
  text-transform: uppercase;
  color: #fff !important;
  padding: 1rem 1.5rem;
  border-radius: 0.35rem;
  outline: none !important;
  border-radius: 6px;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  position: relative;
  margin-top: 1rem;
  margin-bottom: 2.2rem;
  letter-spacing: 0px;
  user-select: none;
  transition: all 0.3s ease-out;
  &:hover {
    background-color: #00aeef;
  }
`;

export const AddButton = styled.button`
  background-color: #00aeefb8;
  font-family: MuseoSans-300;
  text-transform: uppercase;
  color: #fff !important;
  padding: 0rem 1.5rem;
  border-radius: 0.35rem;
  outline: none !important;
  border-radius: 6px;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  position: relative;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  letter-spacing: 0px;
  user-select: none;
  transition: all 0.3s ease-out;
  &:hover {
    background-color: #00aeef;
  }
`;

export const Button = styled.button`
  background-color: #00aeefb8;
  font-family: MuseoSans-300;
  text-transform: uppercase;
  color: #fff !important;
  padding: 1rem 1.5rem;
  border-radius: 0.35rem;
  outline: none !important;
  border-radius: 6px;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  position: relative;
  margin-top: 1rem;
  letter-spacing: 0px;
  user-select: none;
  transition: all 0.3s ease-out;
  width: 45%;
  &:hover {
    background-color: #00aeef;
  }
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

export const PreviewHolder = styled.div`
  position: relative;
  overflow: hidden;
`;

export const PrednaStranaText = styled.p<IColorText>`
  font-size: 2.5rem;
  font-family: 'Engagement-Regular';
  color: ${({ colorText }) => (colorText ? `${colorText}` : 'black')};
  text-align: center;
  padding-right: 10%;
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
  width: 65%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
`;
export const PreviewTextHolderBack = styled.div`
  position: absolute;
  width: 65%;
  height: 50%;
  display: flex;
  align-items: center;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
`;

export const Label = styled.label<IPhotoRightItem>`
  background-image: ${({ imageUrl }) => (imageUrl ? `url(${imageUrl})` : '0')};
  cursor: pointer;
  background-size: contain;
  background-repeat: no-repeat;
  display: inline-block;
  width: 100%;
  padding-top: 35%;
  -webkit-transition: all 100ms ease-in;
  -moz-transition: all 100ms ease-in;
  transition: all 100ms ease-in;
  -webkit-filter: grayscale(1);
  -moz-filter: grayscale(1);
  filter: grayscale(1);
  &:hover {
    -webkit-filter: grayscale(0);
    -moz-filter: grayscale(0);
    filter: grayscale(0);
  }
`;
export const ColorLabel = styled.label<IColor>`
  background-color: ${({ colorButton }) =>
    colorButton ? `${colorButton}` : 'black'};
  cursor:pointer;
  display:inline-block;
  width: 60px;
  height: 60px;
  margin-right: 1rem;
  border-radius: 36px;
  transition: all .3s ease-out;
  &:hover{
    transform: scale(1.15);
  }
}
`;
export const RadioColorInput = styled.input`
  margin: 0;
  padding: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

export const RadioInput = styled.input`
  margin: 0;
  padding: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  &:active {
    & ~ ${Label} {
      opacity: 1;
    }
  }
  &:checked {
    & ~ ${Label} {
      -webkit-filter: none;
      -moz-filter: none;
      filter: none;
    }
  }
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
export const StyledCartLink = styled.a`
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
  width: 45%;
  text-align: center;
  &:hover {
    background-color: #00aeef;
  }
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
