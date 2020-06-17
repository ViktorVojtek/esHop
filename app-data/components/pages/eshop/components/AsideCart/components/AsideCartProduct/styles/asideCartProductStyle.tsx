import styled from 'styled-components';

export const HeadWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const P = styled.p`
  margin:0;
  width: 67%;
  font-weight: bold;
`;

export const Image = styled.img`
  width: 33%;
`;

export const TD = styled.td`
  font-weight: bold;
`;

export const Button = styled.button`
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
  -webkit-letter-spacing: 0px;
  -moz-letter-spacing: 0px;
  -ms-letter-spacing: 0px;
  letter-spacing: 0px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all .3s ease-out;
  transition: all .3s ease-out;
  width: 45%;
  &:hover{
    background-color: #00aeef;
  }
`;