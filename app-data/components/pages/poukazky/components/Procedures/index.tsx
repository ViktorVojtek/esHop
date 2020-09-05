import React, { useState, FC, useEffect } from 'react';
import Service from '../../../../../shared/types/Service.types';
import { Col, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { ItemTextProcedures, Span, P, AddButton } from '../../styles/index';
import { formatPrice } from '../../../../../shared/helpers/formatters';

type IItem = {
  title: string;
  price: number;
  count: number;
};

type IProcedures = {
  service: Service;
  addProcedure: (item: IItem) => void;
};

const Procedures: FC<IProcedures> = ({ service, addProcedure }) => {
  const [count, setCount] = useState(0);

  const countInput = (e) => {
    let count = e.currentTarget.value;
    count === '' ? setCount(0) : setCount(count);
  };

  const AddService = () => {
    const item: IItem = {
      title: service.title,
      price: service.price.value,
      count: count,
    };
    addProcedure(item);
  };

  //const toggle = () => setEnabled(!enabled);
  return (
    <Col
      md="4"
      sm="6"
      xs="12"
      className="d-flex align-items-center justify-content-center flex-column"
    >
      <ItemTextProcedures>{service.title}</ItemTextProcedures>
      <InputGroup>
        <Input
          placeholder="Počet"
          type="number"
          onChange={(e) => countInput(e)}
        />
        <InputGroupAddon addonType="prepend">
          <AddButton type="button" onClick={AddService}>
            Pridať
          </AddButton>
        </InputGroupAddon>
      </InputGroup>
      <P>
        Cena:{' '}
        <Span>
          {`${
            count === 0
              ? formatPrice(service.price.value)
              : formatPrice(service.price.value * count)
          } €`}
        </Span>
      </P>
    </Col>
  );
};

export default Procedures;
