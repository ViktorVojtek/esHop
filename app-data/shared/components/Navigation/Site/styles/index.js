import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  padding-left: 100px;
  padding-right: 100px;
  @media (max-width: 1550px) {
    padding-left: 40px;
    padding-right: 40px;
  }
  @media (max-width: 768px) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

export const Logo = styled.img`
  width: 260px;
  @media (max-width: 992px) {
    width: 210px;
  }
  @media (max-width: 430px) {
    width: 220px;
  }
  @media (max-width: 400px) {
    width: 200px;
  }
  @media (max-width: 360px) {
    width: 160px;
  }
`;

export const CartWrapper = styled.div`
  margin-left: 60px;
  @media(max-width: 992px){
    margin-left: 0;
  }
  span {
    background-color: #01aeef;
    border-radius: 0.25rem;
    color: #fff;
    width: 25px;
    display: inline-block;
    text-align: center;
  }
`;
