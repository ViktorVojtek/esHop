import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../app-data/shared/components/Layout/Site.layout';
import { withSetCart } from '../app-data/lib/state/Reducer';
import { Container } from 'reactstrap';
import { MessageRoundedError } from '@styled-icons/boxicons-regular';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  margin: 0 auto;
  margin-top: 160px;
  min-height: calc(100vh - 317px);
`;
const Icon = styled(MessageRoundedError)`
  color: #00aeef;
  width: 160px;
  margin: 0 auto;
  display: block;
`;
const ButtonLink = styled.a`
  background-color: #00aeefb8;
  font-family: MuseoSans-300;
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
  display: inline-block;
  text-align: center;

  cursor: pointer;
  &:hover {
    background-color: #00aeef;
  }
`;

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>Kúpele CKS stránka sa nenašla</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>{' '}
      <Layout>
        <Wrapper>
          <Container className="text-center">
            <Icon />
            <h4 className="text-center font-weight-bold mt-4 mb-4">
              Ľutujeme, stránka sa nenašla!
            </h4>
            <Link href="/eshop">
              <ButtonLink>Nakupovať</ButtonLink>
            </Link>
          </Container>
        </Wrapper>
      </Layout>
    </>
  );
};

export default withSetCart(Custom404);
