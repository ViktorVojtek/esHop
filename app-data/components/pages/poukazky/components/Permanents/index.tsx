import React, { useState, FC, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Col, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { formatPrice } from '../../../../../shared/helpers/formatters';
import { TextFieldButton } from '../../../../../shared/design';
import { useSnackbar } from 'notistack';
import InfoPopover from '../InfoPopover';
import Product from '../../../../../shared/types/Product.types';
import { VariantsSelect } from '../../../eshop/components/ProductDetail/styles/productDetail.style';
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

type IPermanents = {
  permanent: Product;
  addPermanent: (item: IItem) => void;
};

const Bonus = styled.p`
  color: red;
  margin-bottom: 0;
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
      data-aos="fade-left"
      className="d-flex justify-content-between flex-column"
    >
      <Holder
        className="w-100"
        style={{
          marginTop: '8px',
          paddingTop: '8px',
          marginBottom: '16px',
        }}
      >
        <div className="d-flex w-100 mb-2 ">
          <ItemTextProcedures>{title}</ItemTextProcedures>
          <InfoPopover html={variants[actualVariant].description} />
        </div>
        {variants[actualVariant].bonus && (
          <Bonus>{variants[actualVariant].bonus}</Bonus>
        )}
      </Holder>
      <StyledPaper elevation={3}>
        <Item>
          <Holder style={{ marginBottom: '16px' }}>
            <P style={{ paddingTop: '8px' }}>
              Cena:{' '}
              {variants[actualVariant].discount > 0 ? (
                <Price>
                  <Del>{`${formatPrice(
                    variants[actualVariant].price.value
                  )} €`}</Del>
                  <ActionPrice className="ml-2">
                    {formatPrice(
                      variants[actualVariant].price.value -
                        (variants[actualVariant].price.value *
                          variants[actualVariant].discount) /
                          100
                    )}{' '}
                    {`€`}
                  </ActionPrice>
                </Price>
              ) : (
                <Price>
                  {formatPrice(variants[actualVariant].price.value)} {`€`}
                </Price>
              )}
            </P>
            <P style={{ paddingBottom: '8px' }}>
              Cena spolu:{' '}
              <Price>
                {formatPrice(getPrice(variants[actualVariant]) * count)} {`€`}
              </Price>
            </P>
          </Holder>
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
        </Item>
      </StyledPaper>
    </Col>
  );
};

export default Permanents;
