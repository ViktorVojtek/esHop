import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  padding-left: 100px;
  padding-right: 100px;
  @media(max-width: 1550px){
    padding-left: 40px;
    padding-right: 40px;
  }
`;
export const Left = styled.div`
  margin-left: .5rem;
`;
export const Right = styled.div`
`;

export const H1 = styled.h1`
  color: rgb(21, 24, 31);
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -1px;
  margin-top: 1.5rem;
`;
export const H3 = styled.h3`
  color: rgb(150, 158, 172);
  line-height: 1.25;
  margin-top: 120px;
  @media(max-width: 1550px){
    margin-top: 80px;
  }
`;
export const H4 = styled.h4`
  color: rgb(101, 106, 119);
  line-height: 1.5;
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: 1.2rem;
  padding-right: 3rem;
  @media(max-width: 1550px){
    font-size: 1rem;
  }
`;