import React, { useState } from 'react';
import Head from 'next/head';
import { withSetCart } from '../../app-data/lib/state/Reducer';
import Layout from '../../app-data/shared/components/Layout/Site.layout';
import { P, H2 } from '../../app-data/components/pages/myzone/mojaZona';
import { Container, FormGroup, Input } from 'reactstrap';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Form, Button } from '../../app-data/shared/styles/components/Auth';
import ErrorMessage from '../../app-data/shared/components/ErrorMessage';
import SuccessMessage from '../../app-data/shared/components/SucessMessage';

const Wrapper = styled.div`
  min-height: calc(100vh - 265px);
  margin-top: 140px;
`;

const FormHolder = styled.div`
  max-width: 400px;
  display: block;
  margin: 0 auto;
  margin-top: 20px;
`;

const messages = [
  'Účet neexistuje!',
  'Účet už bol verifikovaný!',
  'Verifikačný email bol odoslaný!',
];

const EmailVerification: () => JSX.Element = () => {
  const router = useRouter();
  const { query } = router;
  const [messageId, setMessageId] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);

  let queryMessage = '';

  if (query.message) {
    if (query.message === 'neplatny-token') {
      queryMessage = 'Neplatný verifikačný token';
    }
    if (query.message === 'pouzivatel-neexistuje') {
      queryMessage = 'Používateľ neexistuje';
    }
    if (query.message === 'verifikovany-pouzivatel') {
      queryMessage = 'Používateľ už je verifikovaný';
    }
  }

  const handleSubmitForm: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();
    try {
      const form = event.currentTarget;
      const email = form.email.value;
      const response = await fetch('/resend', {
        body: JSON.stringify({
          email: email,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      if (response.status === 200) {
        setMessageId(2);
        setIsError(false);
        setisSuccess(true);
      }
      if (response.status === 404) {
        setMessageId(0);
        setIsError(true);
        setisSuccess(false);
      }
      if (response.status === 409) {
        setMessageId(1);
        setIsError(true);
        setisSuccess(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Head>
        <title>Kúpele CKS verifikácia účtu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>{' '}
      <Layout>
        <Wrapper>
          <Container>
            <H2 className="text-center">Verifikácia účtu</H2>
            {query.message && (
              <h4 style={{ color: 'red', textAlign: 'center', margin: '20px' }}>
                {queryMessage}
              </h4>
            )}
            <P className="text-center">
              Pre prihlásenie sa do svojho účtu, je potrebné verifikovať svoju
              emailovú adresu. Email bol automaticky odoslaný na Vami zadanú
              emailovú adresu. V prípade, že ste email neobdržali, využiťe náš
              formulár na vytvorenie nového verifikačného kódu.
            </P>
            <FormHolder>
              <Form onSubmit={handleSubmitForm} className="mb-4">
                <FormGroup>
                  <label htmlFor="email">Zadajte email</label>
                  <Input id="email" name="email" type="email" />
                </FormGroup>
                <Button type="submit">Odoslať</Button>
              </Form>

              <ErrorMessage message={messages[messageId]} open={isError} />
              <SuccessMessage message={messages[messageId]} open={isSuccess} />
            </FormHolder>
          </Container>
        </Wrapper>
      </Layout>
    </>
  );
};

export default withSetCart(EmailVerification);
