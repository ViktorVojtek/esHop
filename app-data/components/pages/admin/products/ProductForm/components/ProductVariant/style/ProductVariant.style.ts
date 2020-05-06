import styled, { css, keyframes } from 'styled-components';

const pulseAnim = keyframes`
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(255, 30, 0, 0.4);
    box-shadow: 0 0 0 0 rgba(255, 30, 0, 0.4);
  }
  70% {
      -moz-box-shadow: 0 0 0 15px rgba(255, 30, 0, 0);
      box-shadow: 0 0 0 15px rgba(255, 30, 0, 0);
  }
  100% {
      -moz-box-shadow: 0 0 0 0 rgba(255, 30, 0, 0);
      box-shadow: 0 0 0 0 rgba(255, 30, 0, 0);
  }
`;

interface IPulseButton {
  pulse: boolean;
}

export const PulseButton = styled.button<IPulseButton>`
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  animation: ${({ pulse }) =>
    pulse
      ? css`
          ${pulseAnim} 1.5s infinite
        `
      : ''};
`;
