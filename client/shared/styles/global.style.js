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
export const LinkButton = styled.a`
  color: white;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 6px;
  background-color: rgb(255, 77, 125);
  padding: .75rem 1.5rem;
  transition: box-shadow 0.3s ease-in-out;
  &:hover{
    text-decoration: none;
    color:white;
    box-shadow: 0px 0px 12px 0px rgb(255,77, 125);
  }
`;

export default createGlobalStyle`
  * {
    font-family: 'Open Sans', sans-serif;
  }
  .nav-link{
    color: rgb(170, 174, 184);
    font-weight: 600;
    font-size: 0.8rem;
    &:hover{
      color: rgb(24, 28, 39);
    }
  }
  .carousel-image{
    height: 65vh;
  }
  .letter-spacing-1{
    letter-spacing: 1px;
  }
  h1{
    font-size: 3.75rem;
  }
  h3{
    font-size: 1.5rem;
  }
  h4{
    font-size: 1.375rem;
  }
  .active-text{
    p{
      color:#ff4d7d;
      font-weight: bold;
    }
  }
`;
