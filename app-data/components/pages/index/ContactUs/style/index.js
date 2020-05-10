import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 4rem;
  padding: 2rem;
  @media (max-width: 768px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const H3 = styled.h3`
  font-size: 3.75rem;
  color: rgb(21, 24, 31);
  text-align: left;
`;

export const P = styled.p`
  color: rgb(132, 136, 148);
  font-size: 0.875rem;
  text-align: left;
  margin: 0;
  margin-top: 1.5rem;
`;

export const Link = styled.a`
  font-weight: bold;
  font-size: 1rem;
  text-align: left;
  color: #262b39 !important;
  cursor: pointer;
  text-decoration: none !important;
  
  &:before {
    content: "";
    position: absolute;
    width: 30%;
    height: 2px;
    bottom: -6px;
    left: 36px;
    background-color: #262b39;
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
`;