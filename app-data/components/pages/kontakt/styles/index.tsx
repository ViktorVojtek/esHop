import styled from 'styled-components';

export const H1 = styled.h1`
  color: red;
  text-align: center;
  font-size: 3rem;
  text-transform: uppercase;
  font-weight: bold;
  margin: 4rem 0rem;
  -webkit-letter-spacing: 1px;
  -moz-letter-spacing: 1px;
  -ms-letter-spacing: 1px;
  letter-spacing: 1px;
  font-family: Franchise-CE;
  @media(max-width: 768px){
    text-align: center;
    margin-top: 80px;
    margin-bottom: 2rem;
  }
}
`;

export const H2 = styled.h2`
  color: black;
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: bold;
  @media (max-width: 768px) {
    text-align: center;
    margin-top: 1rem;
  }
`;
export const P = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0rem;
  font-weight: bold;
  @media (max-width: 768px) {
    text-align: center;
  }
`;
export const Span = styled.span`
  font-size: 1rem;
  font-weight: bold;
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
export const Wrapper = styled.div`
  margin-top: 120px;
  @media (max-width: 992px) {
    margin-top: 80px;
  }
  @media (max-width: 768px) {
    margin-top: 60px;
  }
`;
