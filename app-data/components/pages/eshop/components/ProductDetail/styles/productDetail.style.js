import styled from 'styled-components';


export const Wrapper = styled.div`
  margin-top: 2rem;
`;

export const Image = styled.img`
  width: 100%;
  border-radius: 4px;
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

export const VariantsSelect = styled.select`
display: block;
width: 100%;
max-width: 200px;
height: calc(1.5em + .75rem + 2px);
padding: .375rem .75rem;
font-size: 1rem;
font-weight: 400;
line-height: 1.5;
color: #495057;
background-color: #fff;
background-clip: padding-box;
border: 1px solid #ced4da;
border-radius: .25rem;
transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
font-family: 'Open Sans',sans-serif;
outline: none;
`;
export const Input = styled.input`
display: block;
width: 100%;
max-width: 200px;
height: calc(1.5em + .75rem + 2px);
padding: .375rem .75rem;
font-size: 1rem;
font-weight: 400;
line-height: 1.5;
color: #495057;
background-color: #fff;
background-clip: padding-box;
border: 1px solid #ced4da;
border-radius: .25rem;
transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
font-family: 'Open Sans',sans-serif;
outline: none;
`;


export const VariantOption = styled.option``;