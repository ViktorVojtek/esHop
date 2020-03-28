import styled, { createGlobalStyle } from 'styled-components';

export { default as Reset } from './lib/reset.style';
export { Container, Col, Row } from './lib/grid.style';

export const WrapperFlex = styled.div`
  display: flex;
  justify-content: flex-start;

  & > div {
    margin-right: .5rem;

    &:last-child {
      margin-right: .5rem;
      width: 100%;
    }
  }
`;

export default createGlobalStyle``;
