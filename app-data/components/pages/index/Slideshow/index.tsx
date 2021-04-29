import React from 'react';
import { Slider } from './Slider';
import styled from 'styled-components';

const Wrapper = styled.div`
  overflow: hidden;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  margin-top: 98px;
  position: relative;
  @media (max-width: 1110px) {
    margin-top: 108px;
  }
  @media (max-width: 992px) {
    margin-top: 92px;
  }
  @media (max-width: 450px) {
    margin-top: 80px;
  }
`;

export const Slideshow = () => (
  <Wrapper>
    <Slider />
  </Wrapper>
);
