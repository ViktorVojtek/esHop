import React, { FC, useContext, useState, useRef, ChangeEvent } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  Button,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';

import { Context } from '../../../../../../../lib/state/Store';
import { CREATE_FREEDELIVERY_MUTATION } from '../../../../../../../graphql/mutation';
import { FREEDELIVERY_QUERY } from '../../../../../../../graphql/query';

type FreeDeliveryListProps = {
  freeDeliveries: any;
};

const FreeDeliverySubmitForm = (props: FreeDeliveryListProps): JSX.Element => {
  const { freeDeliveries } = props;
  const [value, setValue] = useState('0');
  const { dispatch } = useContext(Context);
  const [createFreeDelivery] = useMutation(CREATE_FREEDELIVERY_MUTATION, {
    refetchQueries: [{ query: FREEDELIVERY_QUERY }],
  });

  const handleSubmitData: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();

    try {
      await createFreeDelivery({ variables: { value } });
    } catch ({ message }) {
      console.log(message);
      dispatch({ type: 'SET_MODAL', payload: true });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  return (
    <Form onSubmit={handleSubmitData} inline>
      <InputGroup className="ml-sm-2 mr-sm-2">
        <Input
          id="discountValue"
          type="number"
          placeholder="Vložiť sumu"
          required
          onChange={handleChange}
        />
        <InputGroupAddon addonType="prepend">
          <InputGroupText>€</InputGroupText>
        </InputGroupAddon>
      </InputGroup>

      <Button type="submit" color="primary" className="ml-auto mr-3">
        Pridať
      </Button>
    </Form>
  );
};

export default FreeDeliverySubmitForm;
