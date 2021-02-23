import React, { ReactNode } from 'react';
import styled from 'styled-components';

type WrapperOptions = {
  stickLeft?: boolean;
  children: ReactNode;
};

const Wrapper = styled.div<WrapperOptions>`
  left: ${({ stickLeft }) => (stickLeft ? `0px` : '15px')};
  top: 12px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const RibbonHolder = (props: WrapperOptions): JSX.Element => {
  const { stickLeft } = props;
  return <Wrapper stickLeft={stickLeft}>{props.children}</Wrapper>;
};
