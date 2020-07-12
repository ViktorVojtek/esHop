import React, { useState, FC } from 'react';
import { H3, InputHolder } from '../../styles/index';
import { Container, InputGroup, InputGroupAddon, Input } from 'reactstrap';

type IMoneyType = {
  handleChange: (event: any) => void;
};

const MoneyType: FC<IMoneyType> = ({ handleChange }) => {
  return (
    <>
      <Container>
        <H3>Zadajte hodnotu poukážky</H3>
        <InputHolder>
          <InputGroup>
            <InputGroupAddon addonType="prepend">€</InputGroupAddon>
            <Input
              placeholder="Zadajte hodnotu poukážky (min. 10 €)"
              min={10}
              type="number"
              step="1"
              name="price"
              onChange={handleChange}
              required
            />
            <InputGroupAddon addonType="append">.00</InputGroupAddon>
          </InputGroup>
        </InputHolder>
      </Container>
    </>
  );
};

export default MoneyType;
