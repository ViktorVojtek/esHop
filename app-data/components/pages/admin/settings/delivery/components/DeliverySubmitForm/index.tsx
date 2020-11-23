import React, { FC, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

import { Context } from '../../../../../../../lib/state/Store';
import { CREATE_DELIVERY_METHODE } from '../../../../../../../graphql/mutation';
import { DELIVERY_METHODS_QUERY } from '../../../../../../../graphql/query';

const DeliverySubmitForm: FC = () => {
  const { dispatch } = useContext(Context);
  const [createDeliveryMethode] = useMutation(CREATE_DELIVERY_METHODE, {
    refetchQueries: [{ query: DELIVERY_METHODS_QUERY }],
  });

  const handleSubmitDeliveryyData: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();

    const isEnvelopeSize: boolean = (document.getElementById(
      'isEnvelopeSize'
    ) as HTMLInputElement).checked;
    const title: string = (document.getElementById(
      'deliveryTitle'
    ) as HTMLInputElement).value;
    const { value } = document.getElementById(
      'deliveryValue'
    ) as HTMLInputElement;

    try {
      await createDeliveryMethode({
        variables: { isEnvelopeSize, title, value },
      });
    } catch ({ message }) {
      dispatch({ type: 'SET_MODAL', payload: true });
    }
  };

  return (
    <Form onSubmit={handleSubmitDeliveryyData} inline>
      <FormGroup className="mr-sm-2">
        <Label for="deliveryTitle" className="mr-sm-3">
          Názov:
        </Label>
        <Input id="deliveryTitle" type="text" placeholder="Zadajte názov" />
      </FormGroup>
      <FormGroup className="mr-sm-2">
        <Label for="deliveryValue" className="mr-sm-3">
          Cena:
        </Label>
        <Input id="deliveryValue" type="text" placeholder="Zadajne cenu" />
      </FormGroup>
      <FormGroup>
        <Label for="deliveryValue" className="mr-sm-3">
          Veľkosť poštovej obálky?
        </Label>
        <Input id="isEnvelopeSize" type="checkbox" />
      </FormGroup>
      <Button type="submit" color="primary" className="ml-auto mr-3">
        Submit
      </Button>
    </Form>
  );
};

export default DeliverySubmitForm;
