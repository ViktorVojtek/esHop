import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { CREATE_PAYMENT_MUTATION } from '../../../../../../../graphql/mutation';
import { PAYMENT_METHODES_QUERY } from '../../../../../../../graphql/query';
import { Context } from '../../../../../../../lib/state/Store';

const PaymentSubmitForm: () => JSX.Element = () => {
  const { dispatch } = useContext(Context);
  const [mutate] = useMutation(CREATE_PAYMENT_MUTATION, {
    refetchQueries: [{ query: PAYMENT_METHODES_QUERY }],
  });

  const handleSubmitPaymentData: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();

    const title = (document.getElementById('title') as HTMLInputElement).value;
    const { value } = document.getElementById('value') as HTMLInputElement;

    try {
      await mutate({ variables: { title, value: +value as number } });
    } catch ({ message }) {
      dispatch({ type: 'SET_MODAL', payload: true });
    }
  };

  return (
    <Form onSubmit={handleSubmitPaymentData} inline>
      <FormGroup className="mr-sm-2">
        <Label for="title" className="mr-sm-3">
          Názov:
        </Label>
        <Input id="title" type="text" placeholder="Zadajte názov" />
      </FormGroup>
      <FormGroup className="mr-sm-2">
        <Label for="value" className="mr-sm-3">
          Cena:
        </Label>
        <Input id="value" type="number" step={0.1} placeholder="Zadajte cenu" />
      </FormGroup>
      <Button type="submit" color="primary" className="ml-auto mr-3">
        Pridať
      </Button>
    </Form>
  );
};

export default PaymentSubmitForm;
