import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER_MUTATION } from '../../../client/app-data/graphql/mutation';
import Layout from '../../../client/shared/components/Layout';

import { Row, Col } from '../../../client/shared/styles/global.style';
import { Wrapper, Form, Input } from './styles';

import { login } from '../../../client/app-data/lib/auth';

const LogIn = () => {
  const [loginUserMutate, { error, loading }] = useMutation(LOGIN_USER_MUTATION);

  const handleSubmitLogin = async (event) => {
    try {
      event.preventDefault();
      
      const form = event.currentTarget;
      const email = form.email.value;
      const password = form.password.value;

      const { data: { loginUser: { token } } } = await loginUserMutate({
        variables: {
          userLoginInput: {
            email, password,
          },
        },
      });

      await login({ token });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <Wrapper>
        <Form onSubmit={handleSubmitLogin}>
          <Row>
            <Input id="email" name="email" type="email" />
          </Row>
          <Row>
            <Input id="password" name="password" type="password" />
          </Row>
          <button type="submit">Send</button>
        </Form>
      </Wrapper>
    </Layout>
  );
};

export default LogIn;
