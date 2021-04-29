import React from 'react';
import styled from 'styled-components';
import { colors } from '../../design';

type IBonusRibbon = {
  text: string;
};

const RibbonElement = styled.div`
  font-size: 12px;
  text-transform: uppercase;
  text-align: left;
  font-weight: bold;
  padding: 6px 10px;
  border-radius: 10px;
  letter-spacing: 0px;
  display: block;
  background: ${colors.bonus};
  color: white;
  position: relative;
  line-height: 1.25rem;
  margin-bottom: 8px;
  margin-left: 10px;
`;

export const BonusRibbon = (props: IBonusRibbon) => {
  const { text } = props;

  return <RibbonElement>{text}</RibbonElement>;
};
