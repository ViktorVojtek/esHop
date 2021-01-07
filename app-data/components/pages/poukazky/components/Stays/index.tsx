import React, { useState, FC } from 'react';
import styled from 'styled-components';
import Service from '../../../../../shared/types/Service.types';
import { Col, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { ItemTextProcedures, Span, P } from '../../styles/index';
import { formatPrice } from '../../../../../shared/helpers/formatters';
import { TextFieldButton } from '../../../../../shared/design';
import { useSnackbar } from 'notistack';
import { Paper } from '@material-ui/core';
import InfoPopover from '../InfoPopover';

type IItem = {
  title: string;
  price: number;
  count: number;
};

type IStays = {
  service: Service;
  addProcedure: (item: IItem) => void;
};

const StyledPaper = styled(Paper)`
  padding: 16px;
  margin-bottom: 24px;
`;
const Price = styled.span`
  margin: 1rem 0rem;
  font-weight: 600;
  font-size: 1rem;
`;
const ActionPrice = styled.span`
  color: red;
`;

const Del = styled.del`
  font-size: 0.9rem;
`;

const Stays: FC<IStays> = ({ service, addProcedure }) => {
  const [count, setCount] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const countInput = (e) => {
    let count = e.currentTarget.value;
    count === '' ? setCount(0) : setCount(count);
  };

  function getPrice(service): number {
    if (service.discount > 0) {
      return (
        service.price.value - (service.price.value * service.discount) / 100
      );
    } else return service.price.value;
  }

  const AddService = () => {
    if (count <= 0) {
      return enqueueSnackbar(`Počet musí byť väčší ako 0`, {
        variant: 'error',
      });
    }
    const item: IItem = {
      title: service.title,
      price: getPrice(service),
      count: count,
    };
    addProcedure(item);
    enqueueSnackbar(`Pridané: ${service.title} ${count}x`, {
      variant: 'success',
    });
  };

  //const toggle = () => setEnabled(!enabled);
  return (
    <Col
      md="4"
      sm="6"
      xs="12"
      className="d-flex justify-content-center flex-column"
    >
      <StyledPaper elevation={3}>
        <div className="d-flex w-100 mb-2 ">
          <ItemTextProcedures>{service.title}</ItemTextProcedures>
          <InfoPopover html={service.html} />
        </div>
        <InputGroup>
          <Input
            placeholder="Počet"
            type="number"
            onChange={(e) => countInput(e)}
            min={1}
          />
          <InputGroupAddon addonType="prepend">
            <TextFieldButton type="button" onClick={AddService}>
              Pridať
            </TextFieldButton>
          </InputGroupAddon>
        </InputGroup>
        <P style={{ marginTop: '16px' }}>
          Cena:{' '}
          {service.discount > 0 ? (
            <Price>
              <Del>{`${formatPrice(service.price.value)} €`}</Del>
              <ActionPrice className="ml-2">
                {formatPrice(
                  service.price.value -
                    (service.price.value * service.discount) / 100
                )}{' '}
                {`€`}
              </ActionPrice>
            </Price>
          ) : (
            <Price>
              {formatPrice(service.price.value)} {`€`}
            </Price>
          )}
        </P>
        <P>
          Cena spolu:{' '}
          <Price>
            {formatPrice(getPrice(service) * count)} {`€`}
          </Price>
        </P>
      </StyledPaper>
    </Col>
  );
};

export default Stays;
