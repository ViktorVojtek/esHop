import styled from 'styled-components';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { colors } from '../../design';

type VariantSelectProps = {
  title: string;
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
};

export const VariantSelect = (props: VariantSelectProps) => {
  return (
    <Select onClick={() => props.onClick(true)}>
      <p>{props.title}</p>
      <KeyboardArrowDownIcon />
    </Select>
  );
};

const Select = styled.div`
  background-color: ${colors.primary};
  color: white;
  width: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  cursor: pointer;
  margin-bottom: 12px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    background-color: ${colors.primaryHover};
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    color: #fff;
    border-color: ${colors.primaryHover};
  }
  p {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
    width: 100%;
  }
  svg {
    path {
      fill: white;
    }
  }
`;
