import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  left: 15px;
  top: 12px;
  position: absolute;
`;

export const RibbonHolder = (props): JSX.Element => (
  <Wrapper>{props.children}</Wrapper>
);
