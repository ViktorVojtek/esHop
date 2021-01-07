import React, { useState, FC, ChangeEvent } from 'react';
import styled from 'styled-components';
import Service from '../../../../../shared/types/Service.types';
import { Col, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { ItemTextProcedures, Span, P } from '../../styles/index';
import { formatPrice } from '../../../../../shared/helpers/formatters';
import { TextFieldButton } from '../../../../../shared/design';
import { useSnackbar } from 'notistack';
import { Paper } from '@material-ui/core';
import InfoPopover from '../InfoPopover';
import Product from '../../../../../shared/types/Product.types';
import { VariantsSelect } from '../../../eshop/components/ProductDetail/styles/productDetail.style';

type IItem = {
  title: string;
  price: number;
  count: number;
};

type IPermanents = {
  permanent: Product;
  addPermanent: (item: IItem) => void;
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

const Bonus = styled.p`
  color: red;
`;

const Permanents: FC<IPermanents> = ({ permanent, addPermanent }) => {
  const [count, setCount] = useState(0);
  const [actualVariant, setActualVariant] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const { variants, title } = permanent;

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
      title: variants[actualVariant].title,
      price: getPrice(variants[actualVariant]),
      count: count,
    };
    addPermanent(item);
    enqueueSnackbar(`Pridané: ${title} ${count}x`, {
      variant: 'success',
    });
  };

  const handleSetActiveVariant = (idx: number) => {
    setActualVariant(idx);
  };

  const variantOptions: JSX.Element[] = variants.map(({ title }) => (
    <option key={title} value={title}>
      {title}
    </option>
  ));

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
          <ItemTextProcedures>{title}</ItemTextProcedures>
          <InfoPopover html={variants[actualVariant].description} />
        </div>
        {variants[actualVariant].bonus && (
          <Bonus>{variants[actualVariant].bonus}</Bonus>
        )}
        <VariantsSelect
          id="variants"
          name="variants"
          style={{ maxWidth: '100%', marginBottom: '12px' }}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            const idx: number = event.currentTarget.selectedIndex;

            handleSetActiveVariant(idx);
          }}
        >
          {variantOptions}
        </VariantsSelect>
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
          {variants[actualVariant].discount > 0 ? (
            <Price>
              <Del>
                {formatPrice(variants[actualVariant].price.value)}{' '}
                {variants[actualVariant].price.currency}
              </Del>
              <ActionPrice className="ml-2">
                {formatPrice(
                  variants[actualVariant].price.value -
                    (variants[actualVariant].price.value *
                      variants[actualVariant].discount) /
                      100
                )}{' '}
                {variants[actualVariant].price.currency}
              </ActionPrice>
            </Price>
          ) : (
            <Price>
              {formatPrice(variants[actualVariant].price.value)}{' '}
              {variants[actualVariant].price.currency}
            </Price>
          )}
        </P>
        <P>
          Cena spolu:{' '}
          <Price>
            {formatPrice(getPrice(variants[actualVariant]) * count)} {`€`}
          </Price>
        </P>
      </StyledPaper>
    </Col>
  );
};

export default Permanents;
