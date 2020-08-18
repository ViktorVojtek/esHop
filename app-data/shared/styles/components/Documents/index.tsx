import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  margin-top: calc(3rem + 98px);
  @media (max-width: 768px) {
    margin-top: calc(2rem + 57px);
  }
`;

export const H1 = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: bold;
`;
export const H2 = styled.h2`
  font-size: 1.25rem;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-weight: bold;
`;

export const P = styled.p`
  font-size: 1rem;
  text-align: justify;
`;

export const LI = styled.li`
  font-size: 1rem;
  text-align: justify;
  margin-bottom: 1rem;
`;
