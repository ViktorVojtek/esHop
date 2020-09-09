import styled from 'styled-components';

export const StyledModalBtn = styled.button`
  background-color: #00aeefb8;
  font-family: MuseoSans-300;
  margin: 0 auto;
  display: block;
  text-transform: uppercase;
  color: #FFF !important;
  padding: 1rem 2.5rem;
  border-radius: .35rem;
  outline: none !important;
  border-radius: 6px;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  position: relative;
  margin-top: 2rem;
  letter-spacing: 0px;
  user-select: none;
  transition: all .3s ease-out;
  &:hover{
    background-color: #00aeef;
  }
`;

export const RegisterButton = styled.span`
font-family: MuseoSans-300;
color: #00aeef;
text-decoration: none;
font-size: 1rem;
cursor: pointer;
`;

export const P = styled.p`
font-family: MuseoSans-300;
`;

export const Danger = styled.p`
font-family: MuseoSans-300;
font-size: 0.9rem;
color: red;
`;