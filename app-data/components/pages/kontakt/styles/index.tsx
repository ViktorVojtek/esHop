import styled from 'styled-components';
import { colors } from '../../../../shared/design';

export const H1 = styled.h1`
font-weight: 700;
font-size: 2.5rem;
margin-bottom: 36px;
}
`;

export const H2 = styled.h4`
  color: ${colors.text};
  text-transform: uppercase;
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 28px;
`;
export const P = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0rem;
  color: #a4a2a3;
  @media (max-width: 768px) {
    text-align: center;
  }
`;
export const Span = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #a4a2a3;
`;
export const ContactHolder = styled.div`
  margin: 0.5rem 0rem;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export const A = styled.a`
  color: #01aeef;
  font-weight: bold;
  font-size: 1rem;
  &:hover {
    color: red;
  }
`;

export const Smooth = styled.p`
  color: #01aeef;
  font-weight: bold;
  margin-top: 16px;
  font-size: 20px;
  &:hover {
    color: red;
  }
`;
export const Wrapper = styled.div`
  width: 100vw;
  margin: 0 auto;
  margin-top: 95px;
  min-height: calc(100vh - 562px);
`;

export const Circle = styled.div`
  position: absolute;
  top: -50px;
  width: 100px;
  height: 100px;
  border-radius: 60px;
  border: 3px solid white;
  background-color: #01aeef;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: calc(50% - 50px);
  transition: transform 0.3s ease-out;
`;

export const Card = styled.div`
  position: relative;
  transition: box-shadow 0.3s;
  border: 2px solid ${colors.primaryLight};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 60px 0px;
  top: -60px;
  position: relative;
  background-color: white;
  height: 100%;
`;

export const ImgHolder = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('/images/kontakt/header.jpg');
  max-height: 500px;
  min-height: 400px;
  height: 45vh;
  background-position: center;
`;
