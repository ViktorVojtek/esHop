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
`;

export const Logo = styled.img`
  width: 220px;
  @media (max-width: 992px) {
    width: 180px;
  }
`;

export const CartWrapper = styled.div`
  span {
    background-color: #01aeef;
    border-radius: 0.25rem;
    color: #fff;
    width: 25px;
    display: inline-block;
    text-align: center;
  }
`;
