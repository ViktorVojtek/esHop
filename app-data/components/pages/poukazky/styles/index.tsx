import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  margin-top: 98px;
  @media (max-width: 768px) {
    margin-top: 86px;
  }
`;

export const H4 = styled.h4`
  font-size: 2rem;
  font-family: MuseoSans-300;
  color: black;
  font-weight: bold;
`;

export const H3 = styled.h3`
  color: red;
  text-align: center;
  font-size: 3rem;
  text-transform: uppercase;
  font-weight: bold;
  margin: 4rem 0rem;
  letter-spacing: 1px;
  font-family: Franchise-CE;
`;
export const RadioGroup = styled.div`

`;
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
  color: #FFF !important;
  padding: 1rem 1.5rem;
  border-radius: .35rem;
  outline: none !important;
  border-radius: 6px;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  position: relative;
  margin-top: 1rem;
  letter-spacing: 0px;
  user-select: none;
  transition: all .3s ease-out;
  &:hover{
    background-color: #00aeef;
  }
`;



export const Label = styled.label<IPhotoRightItem>`
background-image: ${({ imageUrl }) =>imageUrl ? `url(${imageUrl})` : '0'};
cursor:pointer;
    background-size:contain;
    background-repeat:no-repeat;
    display:inline-block;
    width: 100%;
    padding-top: 35%;
    -webkit-transition: all 100ms ease-in;
       -moz-transition: all 100ms ease-in;
            transition: all 100ms ease-in;
    -webkit-filter: grayscale(1);
       -moz-filter: grayscale(1);
            filter: grayscale(1);
  &:hover{
    -webkit-filter: grayscale(0) ;
       -moz-filter: grayscale(0) ;
            filter: grayscale(0) ;
  }
`;
export const ColorLabel = styled.label<IColor>`
  background-color: ${({ colorButton }) =>colorButton ? `${colorButton}` : 'black'};
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
margin:0;padding:0;
  -webkit-appearance:none;
    -moz-appearance:none;
          appearance:none;
  &:checked{
    & ~ ${ColorLabel}{
      border: 4px solid #01aeef;
      transform: scale(1.15);
    }
  }
  &:active{
    & ~ ${ColorLabel}{
      transform: scale(1.15);
    }
  }
`;

export const RadioInput = styled.input`
  margin:0;padding:0;
  -webkit-appearance:none;
    -moz-appearance:none;
          appearance:none;
  &:active{
    & ~ ${Label}{
      opacity: 1;
    }
  }
  &:checked{
    & ~ ${Label}{
      -webkit-filter: none;
      -moz-filter: none;
          filter: none;
    }
  }
`;
interface IPhotoRightItem {
  imageUrl?: string;
}
interface IColor {
  colorButton?: string;
}


