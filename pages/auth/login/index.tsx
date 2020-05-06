/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useState, useContext } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER_MUTATION } from '../../../app-data/graphql/mutation';

import Layout from '../../../app-data/shared/components/Layout/Admin.layout';

import { Wrapper } from '../../../app-data/shared/styles/components/Auth';
import { login } from '../../../app-data/lib/auth';
import { Context } from '../../../app-data/lib/state/Store';

import Modal from '../../../app-data/shared/components/Modal';

const LogIn: FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { dispatch } = useContext(Context);
  const [loginUserMutate, { loading }] = useMutation(LOGIN_USER_MUTATION);

  if (loading) {
    return <>Loading</>;
  }

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

      const {
        data: {
          loginUser: { _id, firstName, lastName, token },
        },
      } = await loginUserMutate({
        variables: {
          userLoginInput: {
            email,
            password,
          },
        },
      });

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
      <Layout>
        <Wrapper>
          <Form onSubmit={handleSubmitLogin}>
            <FormGroup>
              <label htmlFor="email">Email</label>
              <Input id="email" name="email" type="email" />
            </FormGroup>
            <FormGroup>
              <label htmlFor="password">Password</label>
              <Input id="password" name="password" type="password" />
            </FormGroup>
            <Button type="submit">Send</Button>
          </Form>
        </Wrapper>
      </Layout>
    </>
  );
};

export default LogIn;
