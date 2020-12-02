import React from 'react';
import styled from 'styled-components';

type IActionRibbon = {
  text: string;
};

const RibbonElement = styled.div`
  font-size: 14px;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.15);
  letter-spacing: 0px;
  display: block;
  background: linear-gradient(to bottom, #999999 0%, #cccccc 100%);
  color: white;
  padding: 6px 12px;
  position: relative;
  -webkit-filter: drop-shadow(0 0.5rem 0.3em rgba(0, 0, 0, 0.5));
  transform: translate3d(0, 0, 0);
  background: linear-gradient(to bottom, #4fa2fe 0%, #3592f1 100%);
  line-height: 1.25rem;
  margin-bottom: 8px;
  &:before {
    content: '';
    width: 0;
    height: 0;
    border-right: 10px solid transparent;
    border-bottom: 16px solid #3592f1;
    border-top: 16px solid #4fa2fe;
    position: absolute;
    top: 0px;
    right: -10px;
  }
`;

const P = styled.p`
  font-size: 1rem;
`;

export const NewProductRibbon = (props: IActionRibbon) => {
  const { text } = props;

  return <RibbonElement>{text}</RibbonElement>;
};
