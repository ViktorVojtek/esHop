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
import { LOGIN_CUSTOMER_MUTATION } from '../../../graphql/mutation';
import { login } from '../../../lib/authCustomer';
import ForgetPasswordModal from '../ForgetPasswordModal';

interface ILoginRegisterModal {
  loginModal: boolean;
  setLoginModal: (boolean) => void;
}

const LoginRegisterModal: FC<ILoginRegisterModal> = ({
  loginModal,
  setLoginModal,
}) => {
  const [badLogin, setBadLogin] = useState(false);
  const toggle = () => {
    setLoginModal(!loginModal);
  };
  const [loginUser] = useMutation(LOGIN_CUSTOMER_MUTATION);
  const [isReset, setIsReset] = useState(false);

  const toggleReset = () => {
    setIsReset(!isReset);
  };

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
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <P>
                  <Link href="moja-zona/registracia">
                    <RegisterButton>Zaregistrujte sa</RegisterButton>
                  </Link>
                </P>
                <P>
                  <RegisterButton onClick={toggleReset}>
                    Zabudnuté heslo
                  </RegisterButton>
                </P>
              </div>
              {badLogin && <Danger>Nesprávne meno alebo heslo</Danger>}
              <StyledModalBtn type="submit">Prihlásiť</StyledModalBtn>
            </Form>
          </ModalBody>
        </>
      </Modal>
      <ForgetPasswordModal setModal={setIsReset} modal={isReset} />
    </div>
  );
};

export default LoginRegisterModal;
