import styled from 'styled-components';


export const Wrapper = styled.div`
  margin-top: 2rem;
`;

export const Image = styled.img`
  width: 100%;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-family: 'Open Sans', sans-serif;
`;
export const Price = styled.p`
  color: #FF4D7D;
  font-weight: bold;
  font-size: 1.25rem;
  font-family: 'Open Sans', sans-serif;
`;
export const Description = styled.p`
  color: #848484;
  font-size: 1rem;
  font-family: 'Open Sans', sans-serif;
`;

export const StyledCartBtn = styled.button`
  background-color: #FF4D7D;
  text-transform: uppercase;
  color: #FFF !important;
  padding: 1rem 1.25rem;
  border-radius: .35rem;
  outline: none !important;
  border-radius: 6px;
  border: none;
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
  font-size: .8rem;
  transition: all .3s ease-out;
  &:hover{
    background-color: #f4255d;
  }
`;

export const VariantsSelect = styled.select``;

export const VariantOption = styled.option``;