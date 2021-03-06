import React from 'react';
import styled from 'styled-components';
import { Container } from 'reactstrap';
import Link from 'next/link';
import { fonts } from '../../../../../../shared/design';

const Wrapper = styled.div`
  width: 100vw;
  margin: 0 auto;
  margin-top: 160px;
  min-height: calc(100vh - 693px);
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
  margin: 0.5rem 0rem;
  font-weight: bold;
  text-align: center;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const ButtonLink = styled.a`
  background-color: #00aeefb8;
  font-family: ${fonts.primary}
  text-transform: uppercase;
  color: #fff !important;
  padding: 1rem 1.5rem;
  border-radius: 0.35rem;
  outline: none !important;
  border-radius: 6px;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  position: relative;
  margin-top: 1rem;
  -webkit-letter-spacing: 0px;
  -moz-letter-spacing: 0px;
  -ms-letter-spacing: 0px;
  letter-spacing: 0px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  display: block;
  text-align: center;
  margin-right: 1rem;

  cursor: pointer;
  &:hover {
    background-color: #00aeef;
  }
`;

const LinkHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SuccessOrder: () => JSX.Element = () => (
  <Wrapper>
    <Container>
      <H2>Vaša objednávka bola úspešne odoslaná</H2>
      <P className="mt-4">
        Informácie o objednávke ste obdržali na Vami zadanú emailovú adresu.
      </P>
      <P>Objednávky odosielame štandardne do 48 hodín od prijatia platby.</P>
      <LinkHolder>
        <Link href="/">
          <ButtonLink>Domov</ButtonLink>
        </Link>
        <Link href="/moja-zona">
          <ButtonLink>Moja zóna</ButtonLink>
        </Link>
      </LinkHolder>
    </Container>
  </Wrapper>
);

export default SuccessOrder;
