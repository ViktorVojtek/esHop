import React, { useState, FC } from 'react';
import Service from '../../../../../shared/types/Service.types';
import { Col, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { formatPrice } from '../../../../../shared/helpers/formatters';
import { TextFieldButton } from '../../../../../shared/design';
import { useSnackbar } from 'notistack';
import InfoPopover from '../InfoPopover';
import {
  ActionPrice,
  Del,
  Holder,
  Item,
  ItemTextProcedures,
  P,
  Price,
  StyledPaper,
} from '../../styles';

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
  const { enqueueSnackbar } = useSnackbar();

  const countInput = (e) => {
    let count = e.currentTarget.value;
    count === '' ? setCount(0) : setCount(count);
  };
  function getPrice(variant): number {
    if (variant.discount > 0) {
      return (
        variant.price.value - (variant.price.value * variant.discount) / 100
      );
    } else return variant.price.value;
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
      data-aos="fade-left"
      className="d-flex justify-content-center flex-column"
    >
      <Holder
        className="d-flex w-100"
        style={{
          marginTop: '8px',
          paddingTop: '8px',
          marginBottom: '16px',
        }}
      >
        <ItemTextProcedures>{service.title}</ItemTextProcedures>
        <InfoPopover html={service.html} />
      </Holder>
      <StyledPaper imgUrl={service.img.path} elevation={3}>
        <Item>
          <Holder style={{ marginBottom: '16px' }}>
            <P style={{ paddingTop: '8px' }}>
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
            <P style={{ paddingBottom: '8px' }}>
              Cena spolu:{' '}
              <Price>
                {formatPrice(getPrice(service) * count)} {`€`}
              </Price>
            </P>
          </Holder>
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
        </Item>
      </StyledPaper>
    </Col>
  );
};

export default Procedures;
