import React, { useState, FC, useRef } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import Link from 'next/link';

import { StyledModalBtn, RegisterButton, P, Danger } from './styles/index';
import {
  REGISTER_CUSTOMER_MUTATION,
  LOGIN_CUSTOMER_MUTATION,
} from '../../../graphql/mutation';
import { login } from '../../../lib/authCustomer';

interface ILoginRegisterModal {
  loginModal: boolean;
  setLoginModal: (boolean) => void;
}

const LoginRegisterModal: FC<ILoginRegisterModal> = ({
  loginModal,
  setLoginModal,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isMatchPass, setIsMatchPass] = useState(true);
  const [userExist, setUserExist] = useState(false);
  const [badLogin, setBadLogin] = useState(false);
  const passwordEl = useRef(null);
  const toggle = () => {
    setLoginModal(!loginModal);
    setIsLogin(true);
  };
  const [createUser] = useMutation(REGISTER_CUSTOMER_MUTATION);
  const [loginUser] = useMutation(LOGIN_CUSTOMER_MUTATION);

  const handleSubmitLogin: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    try {
      event.preventDefault();

      const form = event.currentTarget;
      const email = form.email.value;
      const password = form.password.value;

      const response = await loginUser({
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
      setBadLogin(true);
    }
  };

  const handleSubmitRegister: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    try {
      event.preventDefault();

      const form = event.currentTarget;
      const email = form.email.value;
      const firstName = form.firstName.value;
      const lastName = form.lastName.value;
      const password = form.password.value;

      await createUser({
        variables: {
          customerData: {
            email,
            firstName,
            lastName,
            password,
          },
        },
      });
      setIsLogin(true);
    } catch (err) {
      setUserExist(true);
    }
  };

  const matchPassoword = (e) => {
    e.target.value === passwordEl.current.value
      ? setIsMatchPass(true)
      : setIsMatchPass(false);
  };

  return (
    <div>
      <Modal isOpen={loginModal} toggle={toggle}>
        <>
          <ModalHeader toggle={toggle}>Prihlásenie</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmitLogin}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Zadajte email"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Zadajte heslo"
                  required
                />
              </FormGroup>
              <P>
                Nemáte účet?{' '}
                <Link href="/registracia">
                  <RegisterButton onClick={toggle}>
                    Zaregistrujte sa
                  </RegisterButton>
                </Link>
              </P>
              {badLogin && <Danger>Nesprávne meno alebo heslo</Danger>}
              <StyledModalBtn type="submit">Prihlásiť</StyledModalBtn>
            </Form>
          </ModalBody>
        </>
      </Modal>
    </div>
  );
};

export default LoginRegisterModal;
