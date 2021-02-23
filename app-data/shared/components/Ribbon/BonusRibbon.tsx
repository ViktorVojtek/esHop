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
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.15);
  letter-spacing: 0px;
  display: block;
  background: ${colors.bonus};
  color: white;
  padding: 3px 8px;
  position: relative;
  -webkit-filter: drop-shadow(0 0.5rem 0.3em rgba(0, 0, 0, 0.5));
  transform: translate3d(0, 0, 0);
  line-height: 1.25rem;
  margin-bottom: 8px;
  &:before {
    content: '';
    width: 0;
    height: 0;
    border-right: 10px solid transparent;
    border-bottom: 13px solid ${colors.bonus};
    border-top: 13px solid ${colors.bonus};
    position: absolute;
    top: 0px;
    right: -10px;
  }
`;

export const BonusRibbon = (props: IBonusRibbon) => {
  const { text } = props;

  return <RibbonElement>{text}</RibbonElement>;
};
