import styled from 'styled-components';

export const H2 = styled.h2`
  padding: 0 0 3rem 0;
  text-align: center;
  font-weight: 600;
`;
export const H4 = styled.h4`
  font-weight: 600;
`;
export const TH = styled.th`
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #00aeef;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  font-size: 1rem;
  border-bottom: none !important;
`;

export const TR = styled.tr`
background-color: #ededed;
`;

export const TD = styled.td`
vertical-align: middle !important;
font-weight: 600;
`;
export const ButtonAddrRemove = styled.button`
  display: inline-block;
  font-weight: 400;
  color: white;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: #00aeeff8;
  border: 1px solid transparent;
  padding: .375rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: .25rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  outline: none !important;
  &:hover{
    background-color: #00aeef;
  }
`;