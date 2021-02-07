import React from 'react';
import { Slider } from './Slider';
import styled from 'styled-components';

const Wrapper = styled.div`
  overflow: hidden;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
`;

export const Slideshow = () => (
  <Wrapper>
    <Slider />
  </Wrapper>
);
