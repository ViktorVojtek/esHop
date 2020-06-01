/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import React, { FC, useEffect, useState, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
  Badge,
  Button,
  FormGroup,
  InputGroup,
  Input,
  InputGroupAddon,
  Label,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

import CurrencyBadge from '../CurrencyBadge';

import { CURRENCIES_QUERY } from '../../../../../../../graphql/query';

import { PulseButton } from './style/ProductVariant.style';

import Product, {
  ProductVariant,
} from '../../../../../../../shared/types/Product.types';

const useCheckDefaultExist: (arr: ProductVariant[]) => boolean = (arr) => {
  const [exist, toggleExist] = useState(false);

  useEffect(() => {
    let doExist = false;

    if (arr && arr.length > 0) {
      doExist = arr.some((item) => item.default === true);
    }

    toggleExist(doExist);
  });

  return exist;
};

interface IProductVariant {
  noVariant: boolean;
  productData: Product;
  handleProductData: (data: Product) => void;
}
const ProductVariantComponent: FC<IProductVariant> = ({
  productData,
  handleProductData,
  noVariant,
}) => {
  const [inChecked, toggleInCheck] = useState(false);
  const defaultExist = useCheckDefaultExist(
    productData ? (productData as Product).variant : []
  );

  useEffect(() => {
    if (!defaultExist) {
      toggleInCheck(false);
    }
  }, [defaultExist]);

  const variantTitleRef = useRef(null);
  const variantPriceRef = useRef(null);
  const variantDefaultRef = useRef(null);
  const variantDiscountRef = useRef(null);
  const variantCountInStockRef = useRef(null);

  const { error, loading, data } = useQuery(CURRENCIES_QUERY);

  if (error) {
    return <>{error.message}</>;
  }
  if (loading) {
    return <>loading</>;
  }

  const { currencies } = data;
  const currency = currencies
    .filter(({ defaultCurrency }) => defaultCurrency)
    .pop();

  const handleAddVariant: () => void = () => {
    const { title: currencyTitle, sign: currencySign } = currency;
    const variant = productData.variant || [];

    const variantData = {
      default: variantDefaultRef.current.checked,
      itemsInStock: +variantCountInStockRef.current.value,
      title: variantTitleRef.current.value,
      price: {
        currency: currencyTitle,
        currencySign,
        discount: +variantDiscountRef.current.value,
        value: +variantPriceRef.current.value,
      },
    };

    variant.push(variantData);

    handleProductData({
      ...productData,
      variant,
    });
  };

  const handleRemoveVariant: (i: number) => void = (i) => {
    const variant = productData.variant
      .slice(0, i)
      .concat(productData.variant.slice(i + 1, productData.variant.length));

    handleProductData({
      ...productData,
      variant,
    });
  };

  const variantList: JSX.Element[] =
    productData && productData.variant
      ? productData.variant.map(({ title, price, default: itemDefault }, i) => (
          <ListGroupItem key={title}>
            <Row>
              <Col>{title}</Col>
              <Col>{price.value}</Col>
              <Col>
                {price.discount ? (
                  <Badge color="primary">{price.discount}%</Badge>
                ) : (
                  ' '
                )}
              </Col>
              <Col>
                {itemDefault ? <Badge color="danger">Default</Badge> : ' '}
              </Col>
              <Col>
                <Button type="button" onClick={() => handleRemoveVariant(i)}>
                  Remove
                </Button>
              </Col>
            </Row>
          </ListGroupItem>
        ))
      : [];

  console.log(productData);

  return (
    <>
      <h5>Variant</h5>
      <FormGroup>
        <Input
          type="text"
          className="variantTitle"
          placeholder="Title"
          innerRef={variantTitleRef}
        />
      </FormGroup>
      <FormGroup>
        <Input type="textarea" placeholder="Short description" />
      </FormGroup>
      <Row form>
        <Col>
          <FormGroup>
            <Input
              type="text"
              className="variantTitle"
              placeholder="Title"
              innerRef={variantTitleRef}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <InputGroup>
              <Input
                type="number"
                className="variantPrice"
                step="0.01"
                placeholder="Price"
                innerRef={variantPriceRef}
              />
              <InputGroupAddon addonType="append">
                <CurrencyBadge />
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <InputGroup>
              <Input
                type="number"
                placeholder="Discount"
                innerRef={variantDiscountRef}
              />
              <InputGroupAddon addonType="append">%</InputGroupAddon>
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>{' '}
      <Row form className="border-bottom mb-3">
        <Col>
          <FormGroup>
            <Input
              type="number"
              placeholder="How many is in stock?"
              innerRef={variantCountInStockRef}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                className="variantDefault"
                innerRef={variantDefaultRef}
                disabled={defaultExist}
                onChange={(event) => toggleInCheck(event.currentTarget.checked)}
                checked={defaultExist ? false : inChecked}
              />
              Default
            </Label>
          </FormGroup>
        </Col>

        <Col>
          <PulseButton
            type="button"
            onClick={() => handleAddVariant()}
            pulse={noVariant}
          >
            Add variant
          </PulseButton>
        </Col>
      </Row>
      {productData && productData.variant && productData.variant.length > 0 ? (
        <ListGroup className="mb-3">{variantList}</ListGroup>
      ) : null}
    </>
  );
};

export default ProductVariantComponent;
