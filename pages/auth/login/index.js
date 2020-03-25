/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER_MUTATION } from '../../../client/app-data/graphql/mutation';

import Layout from '../../../client/shared/components/Layout';

import { Row } from '../../../client/shared/styles/global.style';
import { Wrapper, Form, Input } from '../../../client/shared/styles/components/Auth';
import Button from '../../../client/shared/styles/components/Button';

import { login } from '../../../client/app-data/lib/auth';

const LogIn = () => {
  const [loginUserMutate, { error, loading }] = useMutation(LOGIN_USER_MUTATION);

  const handleSubmitLogin = async (event) => {
    try {
      event.preventDefault();

      const form = event.currentTarget;
      const email = form.email.value;
      const password = form.password.value;

      const {
        data: {
          loginUser: {
            _id, firstName, lastName, token,
          },
        },
      } = await loginUserMutate({
        variables: {
          userLoginInput: {
            email, password,
          },
        },
      });

      await login({
        _id, firstName, lastName, token,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <Wrapper>
        <Form onSubmit={handleSubmitLogin}>
          <Row>
            <label htmlFor="email">Email</label>
            <Input id="email" name="email" type="email" />
          </Row>
          <Row>
            <label htmlFor="password">Password</label>
            <Input id="password" name="password" type="password" />
          </Row>
          <Button type="submit">Send</Button>
        </Form>
      </Wrapper>
    </Layout>
  );
};

export default LogIn;
