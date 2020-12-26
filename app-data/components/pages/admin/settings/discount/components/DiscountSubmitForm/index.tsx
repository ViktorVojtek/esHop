import React, { FC, useContext, useState, useRef, ChangeEvent } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';

import { Context } from '../../../../../../../lib/state/Store';
import { CREATE_DISCOUNT_MUTATION } from '../../../../../../../graphql/mutation';
import { DISCOUNTS_QUERY } from '../../../../../../../graphql/query';

const DiscountSubmitForm: FC = () => {
  const [codex, setCodex] = useState('');
  const { dispatch } = useContext(Context);
  const [createDiscount] = useMutation(CREATE_DISCOUNT_MUTATION, {
    refetchQueries: [{ query: DISCOUNTS_QUERY }],
  });
  const discountValRef = useRef(null);

  const handleSubmitData: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();

    const code = codex;
    const value: number = parseInt(discountValRef.current.value, 10);
    console.log(codex);
    try {
      await createDiscount({ variables: { code, value } });
    } catch ({ message }) {
      console.log(message);
      dispatch({ type: 'SET_MODAL', payload: true });
    }
  };

  const handleRandomString: () => void = () => {
    const rnms: string = randomString(
      16,
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    );

    setCodex(rnms);
  };
  const randomString: (length: number, chars: string) => string = (
    length,
    chars
  ) => {
    let result: string = '';

    for (let i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }

    return result;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setCodex(event.target.value);

  return (
    <Form onSubmit={handleSubmitData} inline>
      <Button type="button" onClick={handleRandomString} className="mr-3">
        Generovať
      </Button>

      <FormGroup>
        <Input type="text" onChange={handleChange} value={codex} />
      </FormGroup>
      <InputGroup className="ml-sm-2 mr-sm-2">
        <Input
          id="discountValue"
          type="number"
          placeholder="Insert discount"
          innerRef={discountValRef}
          required
        />
        <InputGroupAddon addonType="prepend">
          <InputGroupText>%</InputGroupText>
        </InputGroupAddon>
      </InputGroup>

      <Button type="submit" color="primary" className="ml-auto mr-3">
        Pridať
      </Button>
    </Form>
  );
};

export default DiscountSubmitForm;
