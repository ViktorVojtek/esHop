import React from 'react';
import styled from 'styled-components';
import { Container } from 'reactstrap';

const Wrapper = styled.div`
  margin-top: 8rem;
  display: flex;
  align-items: center;
  min-height: calc(100vh - 177px - 10rem);
  @media (max-width: 992px) {
    margin-top: 120px;
  }
  @media (max-width: 768px) {
    margin-top: 80px;
  }
`;

export const H2 = styled.h2`
  color: black;
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  @media (max-width: 768px) {
    text-align: center;
    margin-top: 1rem;
  }
`;

export const P = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0rem;
  font-weight: bold;
  text-align: center;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const UnsuccessOrder: () => JSX.Element = () => (
  <Wrapper>
    <Container>
      <H2>Vaša objednávka nebola úspešne odoslaná</H2>
      <P className="mt-4">
        Zopakujte prosím objednávku, alebo kontaktujte našu podporu na čísle{' '}
        <a href="tel: 0904037236">0904037236</a>
      </P>
      <P>Objednávky odosielame šdandardne do 48 hodín od prijatia platby.</P>
    </Container>
  </Wrapper>
);

export default UnsuccessOrder;
