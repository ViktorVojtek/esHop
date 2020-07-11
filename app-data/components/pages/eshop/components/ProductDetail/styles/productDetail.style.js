import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 120px;
  @media (max-width: 768px) {
    margin-top: 92px;
  }
`;

export const Image = styled.img`
  width: 100%;
  border-radius: 4px;
`;

export const Title = styled.h4`
  color: #5e8796;
  font-weight: bold;
  font-size: 2rem;
  display: block;
  @media (max-width: 768px) {
    display: none;
  }
`;
export const TitleMobile = styled.h4`
  color: #5e8796;
  font-weight: bold;
  font-size: 1.5rem;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;
export const VariantTitle = styled.h6`
  color: #5e8796;
  font-weight: bold;
  font-size: 1.5rem;
`;
export const Price = styled.p`
  margin: 1rem 0rem;
  font-weight: 600;
  font-size: 1.2rem;
`;
export const ActionPrice = styled.span`
  color: red;
`;

export const Del = styled.del`
  font-size: 1rem;
`;
export const Description = styled.p`
  color: #848484;
  font-size: 1rem;
  margin: 1rem 0rem;
`;

export const Label = styled.p`
  color: #5e8796;
  font-size: 1rem;
`;

export const StyledCartBtn = styled.button`
  background-color: #00aeefb8;
  text-transform: uppercase;
  color: #fff !important;
  padding: 1rem 3rem;
  border-radius: 0.35rem;
  outline: none !important;
  border-radius: 6px;
  border: none;
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
  font-size: 0.8rem;
  transition: all 0.3s ease-out;
  &:hover {
    background-color: #00aeef;
  }
`;

export const VariantsSelect = styled.select`
  display: block;
  width: 100%;
  max-width: 210px;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  font-family: 'Open Sans', sans-serif;
  outline: none;
`;
export const Input = styled.input`
  display: block;
  width: 100%;
  max-width: 210px;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  font-family: 'Open Sans', sans-serif;
  outline: none;
`;

export const VariantOption = styled.option``;

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
