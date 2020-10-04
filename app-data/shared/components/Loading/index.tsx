import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';

const ldsanim = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;

const H2 = styled.h2`
  text-align: center;
  font-weight: 600;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.85);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: all;
  flex-direction: column;
`;

const Ldsring = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #01aeef;
    border-radius: 50%;
    animation: ${ldsanim} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #01aeef transparent transparent transparent;
    &:nth-child(1) {
      animation-delay: -0.45s;
    }
    &:nth-child(2) {
      animation-delay: -0.3s;
    }
    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
`;

const Loading: () => JSX.Element = () => (
  <Wrapper>
    <H2>Čakajte prosím...</H2>
    <Ldsring>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Ldsring>
  </Wrapper>
);

export default Loading;
