/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useState, useContext } from 'react';
import {
  FormGroup,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_CUSTOMER_MUTATION } from '../../../app-data/graphql/mutation';
import Link from 'next/link';
import Layout from '../../../app-data/shared/components/Layout/Site.layout';

import {
  Wrapper,
  Form,
  Button,
  H3,
  H1,
  RegisterButton,
  P,
} from '../../../app-data/shared/styles/components/Auth';
import { login } from '../../../app-data/lib/authCustomer';
import { Context } from '../../../app-data/lib/state/Store';
import ErrorMessage from '../../../app-data/shared/components/ErrorMessage';
import SuccessMessage from '../../../app-data/shared/components/SucessMessage';

const messages = ['Účet neexistuje!', 'Nastala chyba', 'Email bol odoslaný'];

const LogIn: FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const { dispatch } = useContext(Context);
  const [loginUserMutate] = useMutation(LOGIN_CUSTOMER_MUTATION);
  const [modal, setModal] = useState(false);
  const [messageId, setMessageId] = useState(0);
  const [isErrorReset, setIsErrorReset] = useState(false);
  const [isSuccessReset, setIsSuccessReset] = useState(false);

  const toggle = () => setModal(!modal);

  const handleSetErrorMessage: (message: string) => void = (message) => {
    const parsedMessage: string = message.replace('GraphQL error:', ' ').trim();
    parsedMessage.includes('Incorrect') &&
      setErrorMessage('Nesprávne prihlasovacie údaje!');
    parsedMessage.includes('User not exist') &&
      setErrorMessage('Používateľ neexistuje!');
    parsedMessage.includes('not verified') &&
      setErrorMessage('Používateľ nie je verifikovaný!');

    setIsError(true);
    dispatch({ type: 'SET_MODAL', payload: true });
  };

  const handleSubmitLogin: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    try {
      event.preventDefault();

      const form = event.currentTarget;
      const email = form.email.value;
      const password = form.password.value;

      console.log(email);
      console.log(password);

      const response = await loginUserMutate({
        variables: {
          customerData: {
            email,
            password,
          },
        },
      });

      const {
        data: {
          logInCustomer: { _id, firstName, lastName, token },
        },
      } = response;

      login({
        _id,
        firstName,
        lastName,
        token,
      });
      setIsError(false);
    } catch (err) {
      handleSetErrorMessage(err.message);
    }
  };

  const handleResetPassword: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();
    try {
      const form = event.currentTarget;
      const email = form.email.value;
      const response = await fetch('/reset-password', {
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
        setIsErrorReset(false);
        setIsSuccessReset(true);
      }
      if (response.status === 404) {
        setMessageId(0);
        setIsErrorReset(true);
        setIsSuccessReset(false);
      }
      if (response.status === 500) {
        setMessageId(1);
        setIsErrorReset(true);
        setIsSuccessReset(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Layout>
        <Wrapper
          style={{ maxWidth: '400px', minHeight: '65vh', width: '100%' }}
        >
          <H1>Moja zóna</H1>
          <H3>Prihlásenie</H3>
          <Form onSubmit={handleSubmitLogin}>
            <FormGroup>
              <label htmlFor="email">Email</label>
              <Input id="email" name="email" type="email" />
            </FormGroup>
            <FormGroup>
              <label htmlFor="password">Heslo</label>
              <Input id="password" name="password" type="password" />
            </FormGroup>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <P>
                <Link href="registracia">
                  <RegisterButton>Zaregistrujte sa</RegisterButton>
                </Link>
              </P>
              <P>
                <RegisterButton onClick={toggle}>
                  Zabudnuté heslo
                </RegisterButton>
              </P>
            </div>

            <ErrorMessage message={errorMessage} open={isError} />
            <Button type="submit">Prihlásiť</Button>
          </Form>
        </Wrapper>
      </Layout>
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Zabudnuté heslo</ModalHeader>
          <ModalBody>
            <h5 className="text-center">
              Zadajte email, na ktorý Vám zašleme adresu na zmenu hesla.
            </h5>
            <Form onSubmit={handleResetPassword}>
              <FormGroup>
                <label htmlFor="email">Email</label>
                <Input id="email" name="email" type="email" />
              </FormGroup>

              <ErrorMessage message={errorMessage} open={isError} />

              <Button className="mb-4" type="submit">
                Odoslať
              </Button>

              <ErrorMessage message={messages[messageId]} open={isErrorReset} />
              <SuccessMessage
                message={messages[messageId]}
                open={isSuccessReset}
              />
            </Form>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};

export default LogIn;
