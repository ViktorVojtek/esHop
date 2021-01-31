import styled from 'styled-components';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export const Login = styled(AccountCircleIcon)`
  color: red;
  width: 36px !important;
  height: 36px !important;
  margin-left: 1rem;
  cursor: pointer;
  @media (max-width: 576px) {
    width: 26px !important;
    height: 26px !important;
  }
`;

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
  @media (max-width: 1110px) {
    width: 200px;
  }
  @media (max-width: 430px) {
    width: 200px;
  }
  @media (max-width: 400px) {
    width: 160px;
  }
  @media (max-width: 360px) {
    width: 160px;
  }
`;

export const CartWrapper = styled.div`
  margin-left: 60px;
  position: relative;
  @media (max-width: 1100px) {
    margin-left: 6px;
  }
  @media (max-width: 992px) {
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
