import React from 'react';
import styled from 'styled-components';
import { Container } from 'reactstrap';
import Link from 'next/link';
import {
  Button,
  fonts,
  SecondaryButton,
} from '../../../../../../shared/design';

const Wrapper = styled.div`
  width: 100vw;
  margin: 0 auto;
  margin-top: 160px;
  min-height: calc(100vh - 562px);
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  padding: 1.5rem 0rem;
  line-height: 1.5;
  font-weight: bold;
  text-align: center;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const LinkHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 48px;
`;

const UnsuccessOrder: () => JSX.Element = () => (
  <Wrapper>
    <Container>
      <H2>Vaša objednávka nebola úspešne odoslaná</H2>
      <P className="mt-4">
        Zopakujte prosím objednávku, alebo kontaktujte našu podporu na čísle{' '}
        <a href="tel: 0911338828">0911338828</a>.<br />
        Objednávky odosielame štandardne do 48 hodín od prijatia platby.
      </P>
      <LinkHolder>
        <Link href="/domov">
          <SecondaryButton className="mr-4 mt-2">Domov</SecondaryButton>
        </Link>
        <Link href="/eshop/cart">
          <Button className="mt-2">Zopakovať</Button>
        </Link>
      </LinkHolder>
    </Container>
  </Wrapper>
);

export default UnsuccessOrder;
