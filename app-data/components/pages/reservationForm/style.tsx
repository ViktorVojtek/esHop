import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  margin: 0 auto;
  margin-top: 160px;
  min-height: calc(100vh - 317px);
`;

export const H1 = styled.h1`
  color: red;
  text-align: center;
  font-size: 3rem;
  text-transform: uppercase;
  font-weight: bold;
  margin: 4rem 0rem;
  margin-bottom: 2rem;
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

export const H4 = styled.h4`
  font-size: 1rem;
  font-family: MuseoSans-300;
  color: black;
  font-weight: bold;
  margin-bottom: 1rem;
`;
