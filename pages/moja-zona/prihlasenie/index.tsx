/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useState, useContext } from 'react';
import { FormGroup, Input } from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_CUSTOMER_MUTATION } from '../../../app-data/graphql/mutation';
import Link from 'next/link';

// import Layout from '../../../app-data/shared/components/Layout/Admin.layout';

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

import Modal from '../../../app-data/shared/components/Modal';

const LogIn: FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { dispatch } = useContext(Context);
  const [loginUserMutate] = useMutation(LOGIN_CUSTOMER_MUTATION);

  const handleSetErrorMessage: (message: string) => void = (message) => {
    const parsedMessage: string = message.replace('GraphQL error:', ' ').trim();

    setErrorMessage(parsedMessage);
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
    } catch (err) {
      console.log(err);
      handleSetErrorMessage(err.message);
    }
  };

  return (
    <>
      <Modal>
        <p>{errorMessage}</p>
      </Modal>
      <Wrapper style={{ maxWidth: '400px', margin: '0 auto' }}>
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
          <P>
            Nemáte účet?{' '}
            <Link href="registracia">
              <RegisterButton>Zaregistrujte sa</RegisterButton>
            </Link>
          </P>
          <Button type="submit">Prihlásiť</Button>
        </Form>
      </Wrapper>
    </>
  );
};

export default LogIn;
