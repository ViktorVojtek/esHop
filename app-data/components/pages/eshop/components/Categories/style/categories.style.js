import styled from 'styled-components';

export const Aside = styled.div`
  width: 100%;
  background-color: rgb(0, 174, 239);
  border-radius: 4px;
  padding: 2.4em;
  margin-bottom: 2rem;
`;
export const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

export const Button = styled.a`
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  padding: .25rem 0rem;
  cursor:pointer;
  &:hover{
    color: rgb(255,77,125) !important;
  }
`;

export const H3 = styled.h2`
  text-align: left;
  color: #ffffff;
  position: relative;
  font-size: 1.5em !important;
  font-weight: 400;
  }
`; 