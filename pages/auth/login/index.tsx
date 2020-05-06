/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC } from 'react';
import { Button, Row, Form, FormGroup, Input } from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER_MUTATION } from '../../../app-data/graphql/mutation';

import Layout from '../../../app-data/shared/components/Layout/Admin.layout';

import { Wrapper } from '../../../app-data/shared/styles/components/Auth';
/* import { Row } from '../../../client/shared/styles/global.style';
import { Wrapper, Form, Input } from '../../../client/shared/styles/components/Auth';
import Button from '../../../client/shared/styles/components/Button'; */

import { login } from '../../../app-data/lib/auth';

const LogIn: FC = () => {
  const [loginUserMutate, { loading }] = useMutation(LOGIN_USER_MUTATION);

  if (loading) {
    return <>Loading</>;
  }

  const handleSubmitLogin: (
    event: React.FormEvent<any>
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
    }
  };

  return (
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
  );
};

export default LogIn;
