import React, { useState, FC, useRef } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

import { StyledModalBtn, RegisterButton, P, Danger } from './styles/index';
import e from 'express';

interface ILoginRegisterModal{
  loginModal: boolean
  setLoginModal: (boolean) => void;
}

const LoginRegisterModal: FC<ILoginRegisterModal> = ({ loginModal, setLoginModal }) => {
  
  const [isLogin, setIsLogin] = useState(true);
  const [isMatchPass, setIsMatchPass] = useState(true);
  const passwordEl = useRef(null);
  const toggle = () => {
    setLoginModal(!loginModal);
    setIsLogin(true);
  }

  const handleSubmitLogin = (event) => {
    event.preventDefault();
  }
  const handleSubmitRegister = (event) => {
    event.preventDefault();
  }

  const matchPassoword = (e) => {
    e.target.value === passwordEl.current.value ? setIsMatchPass(true) : setIsMatchPass(false);
  }


  return (
    <div>
      <Modal isOpen={loginModal} toggle={toggle}>
        {isLogin ?
        <>
          <ModalHeader toggle={toggle}>Prihlásenie</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmitLogin}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="Zadajte email" required/>
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="Zadajte heslo" required/>
              </FormGroup>
              <P>Nemáte účet? <RegisterButton onClick={() => setIsLogin(false)}>Zaregistrujte sa</RegisterButton></P>
              <StyledModalBtn type="submit">Prihlásiť</StyledModalBtn>
            </Form>
          </ModalBody>
        </> :
        <>
          <ModalHeader toggle={toggle}>Registrácia</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmitRegister}>
                <FormGroup>
                  <Label className="font-weight-bold" for="fname">Meno</Label>
                  <Input type="text" name="fname" id="fname" placeholder="Zadajte meno" required />
                </FormGroup>
                <FormGroup>
                  <Label className="font-weight-bold" for="fsurname">Priezvisko</Label>
                  <Input type="text" name="fsurname" id="fsurname" placeholder="Zadajte priezvisko" required />
                </FormGroup>
                <FormGroup>
                  <Label className="font-weight-bold" for="email">Email</Label>
                  <Input type="email" name="email" id="email" placeholder="Zadajte email" required />
                </FormGroup>
                <FormGroup>
                  <Label className="font-weight-bold" for="password">Heslo</Label>
                  <Input innerRef={passwordEl} type="password" name="password" id="password" placeholder="Zadajte heslo" required />
                </FormGroup>
                <FormGroup>
                  <Label className="font-weight-bold" for="password">Zopakujte Heslo</Label>
                  <Input onChange={(event) => matchPassoword(event)} type="text" name="checkPassword" id="checkPassword" placeholder="Zadajte heslo" required />
                </FormGroup>
                {isMatchPass ? null : <Danger>Hesla sa nezhodujú</Danger>}
                <StyledModalBtn disabled={!isMatchPass} type="submit">Zaregistrovať</StyledModalBtn>
              </Form>
            </ModalBody>
        </>
        }
      </Modal>
    </div>
  );
}

export default LoginRegisterModal;