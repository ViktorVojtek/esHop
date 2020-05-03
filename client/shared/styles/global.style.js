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
    font-family:MuseoSans-Normal;
  }
  .admin * {
    font-family:Roboto;
  }
  #__next{
    overflow: hidden;
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
    width: 100%;
  }
  .letter-spacing-1{
    letter-spacing: 1px;
  }
  h1{
    font-size: 3.75rem;
    @media(max-width: 1550px){
      font-size: 3rem;
    }
    @media(max-width: 1200px){
      font-size: 2rem;
    }
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
  .active{
    color: red !important;
  }
  .not-active{
    color: white!important;
  }
  .navbar{
    padding: 0.75rem 1rem !important;
    background-color: #FFFFFF !important;
  }
  .card-item{
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(0,0,0,.1), 0 2px 4px rgba(0,0,0,.1) !important;
    user-select: none!important;
    backface-visibility: hidden;
    transition-timing-function: cubic-bezier(.25,.1,.2,1);
    transition: all 0.3s ease-in-out !important;
    &:hover{
      box-shadow: 0 6px 7px 0 rgba(0,0,0,.15), 0 0 5px 0 rgba(0,0,0,.1) !important;
      transform: translate(-50%,50%) translateY(-4px);
    }
  }
  .stay-item{
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(0,0,0,.1), 0 2px 4px rgba(0,0,0,.1) !important;
    user-select: none!important;
    backface-visibility: hidden;
    transition-timing-function: cubic-bezier(.25,.1,.2,1);
    transition: all 0.3s ease-in-out !important;
    &:hover{
      box-shadow: 0 6px 7px 0 rgba(0,0,0,.15), 0 0 5px 0 rgba(0,0,0,.1) !important;
      transform: translateY(calc(50% - 4px));
    }
  }
  .button-link{
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(0,0,0,.1), 0 2px 4px rgba(0,0,0,.1) !important;
    user-select: none!important;
    backface-visibility: hidden;
    display: inline-block;
    transition-timing-function: cubic-bezier(.25,.1,.2,1);
    transition: all 0.3s ease-in-out !important;
    &:hover{
      box-shadow: 0 0px 8px 0 rgb(255,77,125), 0 0 8px 0 rgba(0,0,0,.1) !important;
      transform: translateY(-2px);
    }
  }
  .button-icon-white{
    cursor: pointer;
    user-select: none!important;
    backface-visibility: hidden;
    display: inline-block;
    transition-timing-function: cubic-bezier(.25,.1,.2,1);
    transition: all 0.3s ease-in-out !important;
    &:hover{
    transform: translateY(-2px);
    }
  }
  .nav-link-main{
    position: relative;
    transition: transform .5s cubic-bezier(1,.25,0,.75) 0s;
    &:before {
      content: "";
      position: absolute;
      width: 80%;
      height: 2px;
      bottom: 4px;
      left: 10%;
      background-color: rgb(101,106,119);
      visibility: hidden;
      -webkit-transform: scaleX(0);
      transform: scaleX(0);
      -webkit-transition: all .5s cubic-bezier(1,.25,0,.75) 0s;
      transition: all .5s cubic-bezier(1,.25,0,.75) 0s;
    }
    &:hover:before {
    visibility: visible;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
    }
    &:hover{
      color: rgb(101,106,119) !important;
      transform: translateY(-2px);
    }
  }
`;
