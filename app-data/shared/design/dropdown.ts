import { DropdownToggle } from 'reactstrap';
import styled from 'styled-components';

export const DropdownToggleItem = styled(DropdownToggle)`
  background-color: #f6f7f8 !important;
  border-radius: 8px;
  border: none !important;
  transition: all 0.3s ease-out;
  width: 100%;
  padding: 20px 20px;
  color: black !important;
  font-weight: 600;
  text-align: left;
  font-size: 1rem;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    background-color: #f6f7f8;
    color: black;
  }
  &:focus {
    box-shadow: none !important;
    background-color: #f6f7f8 !important;
    color: black !important;
  }
  &:active {
    box-shadow: none !important;
    background-color: #f6f7f8 !important;
    color: black !important;
  }
  &:after {
    display: none;
  }
`;
