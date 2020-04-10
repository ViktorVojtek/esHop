import React, { useRef, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { H5 } from '../../../../../shared/styles/admin/UI';

import { SET_CURRENCY_MUTATION } from '../../../../../app-data/graphql/mutation';
import { CURRENCIES_QUERY } from '../../../../../app-data/graphql/query';

const CurrencySubmitForm = () => {
  const currencyValRef = useRef();
  const [isDefCurrency, setDefCurrency] = useState(false);

  const [setCurrencyMutation] = useMutation(SET_CURRENCY_MUTATION, {
    update: (cache, { data: { setCurrency: newCurrency } }) => {
      const { currencies } = cache.readQuery({ query: CURRENCIES_QUERY });

      cache.writeQuery({
        query: CURRENCIES_QUERY,
        data: {
          currencies: [...currencies, newCurrency],
        },
      });
    },
  });

  const handleDefCurrency = (event) => {
    const { checked } = event.currentTarget;

    if (checked && currencyValRef.current.value) {
      currencyValRef.current.value = '';
    }

    setDefCurrency(checked);
  };

  const handleSubmitCurrencyData = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const defaultCurrency = form.defaultCurrency.checked;
    const sign = form.currencySign.value;
    const value = isDefCurrency ? 1 : +form.currencyValue.value;
    const title = form.title.value;

    const currencyInput = {
      defaultCurrency,
      sign,
      value,
      title,
    };

    try {
      await setCurrencyMutation({ variables: { currencyInput } });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmitCurrencyData}>
      <H5>Currency</H5>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input id="title" type="text" placeholder="Insert currency title" />
      </FormGroup>
      <FormGroup>
        <Label for="currencySign">Currency sign</Label>
        <Input
          id="currencySign"
          type="text"
          placeholder="Insert currency sign e.g. €"
        />
      </FormGroup>
      <FormGroup>
        <Label for="currencyValue">Currency value</Label>
        <Input
          id="currencyValue"
          innerRef={currencyValRef}
          disabled={isDefCurrency}
          type="number"
          placeholder="Insert currency value"
          step="any"
        />
      </FormGroup>
      <FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              id="defaultCurrency"
              type="checkbox"
              onChange={handleDefCurrency}
            />{' '}
            Default currency
          </Label>
        </FormGroup>
      </FormGroup>{' '}
      <FormGroup>
        <Button>Submit</Button>
      </FormGroup>
    </Form>
  );
};

export default CurrencySubmitForm;
