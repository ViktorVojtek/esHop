import React, { useRef, useState, FC } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { SET_CURRENCY_MUTATION } from '../../../../../../../graphql/mutation';
import { CURRENCIES_QUERY } from '../../../../../../../graphql/query';

const CurrencySubmitForm: FC = () => {
  const currencyValRef = useRef(null);
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

  const handleDefCurrency: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event) => {
    const { checked } = event.currentTarget;

    if (checked && currencyValRef.current.value) {
      currencyValRef.current.value = '';
    }

    setDefCurrency(checked);
  };

  const handleSubmitCurrencyData: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();

    const defaultCurrency = (document.getElementById(
      'defaultCurrency'
    ) as HTMLInputElement).checked;
    const sign = (document.getElementById('currencySign') as HTMLInputElement)
      .value;
    const value = isDefCurrency
      ? 1
      : +(document.getElementById('currencyValue') as HTMLInputElement).value;
    const title = (document.getElementById('currencyTitle') as HTMLInputElement)
      .value;

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
      <FormGroup>
        <Label for="currencyTitle">Title</Label>
        <Input
          id="currencyTitle"
          type="text"
          placeholder="Zadajte názov meny"
        />
      </FormGroup>
      <FormGroup>
        <Label for="currencySign">Znak meny</Label>
        <Input
          id="currencySign"
          type="text"
          placeholder="Zadajte znak meny napr. €"
        />
      </FormGroup>
      <FormGroup>
        <Label for="currencyValue">Hodnota meny</Label>
        <Input
          id="currencyValue"
          innerRef={currencyValRef}
          disabled={isDefCurrency}
          type="number"
          placeholder="Zadajte hodnotu meny"
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
            Základná mena
          </Label>
        </FormGroup>
      </FormGroup>{' '}
      <FormGroup>
        <Button type="submit">Pridať</Button>
      </FormGroup>
    </Form>
  );
};

export default CurrencySubmitForm;
