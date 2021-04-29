import React from 'react';
import styled from 'styled-components';
import { colors } from '../../design';

type IActionRibbon = {
  text: string;
};

const RibbonElement = styled.div`
  font-size: 14px;
  text-transform: uppercase;
  text-align: left;
  font-weight: bold;
  letter-spacing: 0px;
  display: block;
  background: ${colors.primary};
  color: white;
  position: absolute;
  line-height: 1.25rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0px;
  top: -20px;
`;

export const DiscountRibbon = (props: IActionRibbon) => {
  const { text } = props;

  return <RibbonElement>{text}</RibbonElement>;
};
