import styled from 'styled-components';
import { colors } from '../../../../../../shared/design';

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

export const RelatedTitle = styled.h2`
  margin: 2rem 0;
`;
export const Head = styled.h2`
  margin: 1rem 0;
`;

export const Title = styled.h4`
  color: black;
  font-size: 1.8rem;
  display: block;
  font-weight: bold;
  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`;
export const VariantTitle = styled.h6`
  color: ${colors.primary};
  font-size: 1.25rem;
  @media (max-width: 768px) {
    margin-top: 16px;
  }
`;

export const Price = styled.p`
  margin: 1rem 0rem;
  font-weight: 600;
  font-size: 1.5rem;
`;
export const ActionPrice = styled.span`
  color: ${colors.primary};
`;
export const NotInStock = styled.p`
  color: ${colors.error};
  font-size: 0.9rem;
`;
export const Del = styled.del`
  font-size: 1.25rem;
`;

export const Label = styled.p`
  color: #5e8796;
  font-size: 1rem;
  margin-bottom: 4px;
`;

export const VariantsSelect = styled.select`
  display: block;
  width: 100%;
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
  max-width: 100px;
  padding: 0.375rem 0.75rem;
  margin-right: 32px;
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

export const DetailInfo = styled.div`
  padding: 0 2rem;
  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const TextArea = styled.div`
  overflow: hidden;
`;

export const DescTitle = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin: 16px 0px;
  color: ${colors.primary};
`;

export const DivButton = styled.div`
  display: block;
  background-color: ${colors.primary};
  text-transform: uppercase;
  color: #fff;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  padding: 6px 16px;
  font-size: 0.875rem;
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-weight: bold;
  line-height: 1.75;
  border-radius: 4px;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  border: 0;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: ${colors.primaryHover};
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  }
  &:disabled {
    background-color: ${colors.disabled};
  }
`;
