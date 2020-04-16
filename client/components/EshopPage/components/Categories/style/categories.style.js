import styled from 'styled-components';

export const Aside = styled.div`
  width: 100%;
  border: 1px solid #ececec;
  padding: 1rem;
`;
export const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

export const Button = styled.a`
  color: rgb(170,174,184);
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: bold;
  padding: .5rem 1rem;
  cursor:pointer;
  &:hover{
    color: rgb(255,77,125) !important;
  }
`;

export const H3 = styled.h2`
  text-align: left;
  color: black;
  position: relative;
  margin-top: 1rem !important;
  font-size: 1.75rem !important;
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: -2px;
    background-color: rgb(255,77,125);
  }
`; 