import { DropdownToggle } from 'reactstrap';
import styled from 'styled-components';
import { colors } from './colors';

export const DropdownToggleItem = styled(DropdownToggle)`
  background-color: ${colors.primary};
  font-family: MuseoSans-300;
  border: none !important;
  transition: all 0.3s ease-out;
  width: 100%;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    background-color: ${colors.primaryHover};
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  }
  &:focus {
    background-color: ${colors.primaryHover};
    box-shadow: none !important;
  }
  &:active {
    background-color: ${colors.primaryHover};
    box-shadow: none;
  }
`;
