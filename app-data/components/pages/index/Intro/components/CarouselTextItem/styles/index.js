import styled from 'styled-components';

export const Number = styled.h6`
  font-size: 1.5rem;
  color: rgb(120, 125, 136);
  line-height: 1.2;
  @media(max-width: 768px){
    margin-top: 1rem;
  }
`;
export const Header = styled.p`
  font-size: 1.25rem;
  color: rgb(29, 33, 44);
  line-height: 1.6;
  @media(max-width: 768px){
    font-size: 1.5rem;
  }
`;
export const Text = styled.span`
  font-size: 0.875rem;
  color: rgb(120, 125, 136);
  line-height: 1.2;
  @media(max-width: 1200px){
    font-size: .75rem;
  }
  @media(max-width: 768px){
    font-size: 1rem;
  }
`;