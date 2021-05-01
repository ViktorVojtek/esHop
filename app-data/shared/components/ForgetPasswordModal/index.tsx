import React, { useState } from 'react';
import {
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import { Button } from '../../design';
import ErrorMessage from '../ErrorMessage';
import SuccessMessage from '../SucessMessage';

interface IForgetPasswordModal {
  modal: boolean;
  setModal: (boolean) => void;
}

const messages = ['Účet neexistuje!', 'Nastala chyba', 'Email bol odoslaný'];

const ForgetPasswordModal = (props: IForgetPasswordModal) => {
  const { modal, setModal } = props;
  const [messageId, setMessageId] = useState(0);
  const [isErrorReset, setIsErrorReset] = useState(false);
  const [isSuccessReset, setIsSuccessReset] = useState(false);

  const toggle = () => {
    setModal(!modal);
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
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Zabudnuté heslo</ModalHeader>
      <ModalBody>
        <h5 className="text-center">
          Zadajte email, na ktorý Vám zašleme inštrukcie na zmenu hesla.
        </h5>
        <Form onSubmit={handleResetPassword}>
          <FormGroup>
            <label htmlFor="email">Email</label>
            <Input id="email" name="email" type="email" />
          </FormGroup>

          <Button className="mb-4" type="submit">
            Odoslať
          </Button>

          <ErrorMessage message={messages[messageId]} open={isErrorReset} />
          <SuccessMessage message={messages[messageId]} open={isSuccessReset} />
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ForgetPasswordModal;
