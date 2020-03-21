import React, { useRef } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/react-hooks';
import { REGISTER_USER_MUTATION } from '../../../client/app-data/graphql/mutation';

import Layout from '../../../client/shared/components/Layout';
import { Row, Col } from '../../../client/shared/styles/global.style';
import { Wrapper, Form, Input } from '../../../client/shared/styles/components/Auth';
import Button from '../../../client/shared/styles/components/Button';

const Register = () => {
  const passwordRef = useRef();
  const [registerUserMutate, { error, loading }] = useMutation(REGISTER_USER_MUTATION);

  const handleSubmitRegister = async (event) => {
    try {
      event.preventDefault();
      
      const form = event.currentTarget;
      const email = form.email.value;
      const firstName = form.firstName.value;
      const lastName = form.lastName.value;
      const password = form.password.value;

      await registerUserMutate({
        variables: {
          userRegInput: {
            admin: false,
            email,
            firstName,
            lastName,
            password,
            role: 1
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  const checkPassword = (event) => {
    const password = event.currentTarget.value;
    const passwToCheck = passwordRef.current.value;

    if (password !== passwToCheck) {
      event.currentTarget.setCustomValidity('Passwords not match.');
      event.currentTarget.reportValidity();
    } else {
      event.currentTarget.setCustomValidity('');
    }
  };

  return (
    <Layout>
      <Wrapper>
        <Form onSubmit={handleSubmitRegister}>
          <Row>
            <label htmlFor="firstName">First Name</label>
            <Input id="firstName" name="firstName" type="text" required />
          </Row>
          <Row>
            <label htmlFor="lastName">Last Name</label>
            <Input id="lastName" name="lastName" type="text" required />
          </Row>
          <Row>
            <label htmlFor="email">Email</label>
            <Input id="email" name="email" type="email" required />
          </Row>
          <Row>
            <label htmlFor="password">Password</label>
            <Input id="password" name="password" type="password" ref={passwordRef} required />
          </Row>
          <Row>
            <label htmlFor="retypePassword">Retype Password</label>
            <Input
              id="retypePassword"
              name="retypePassword"
              type="password"
              onChange={checkPassword}
            />
          </Row>
          <Button type="submit">Send</Button>
          <p><small>You allready have an account? Please <Link href="/auth/login"><a>log in</a></Link>.</small></p>
        </Form>
      </Wrapper>
    </Layout>
  );
};

export default Register;
