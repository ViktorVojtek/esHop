/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

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
import styled, { css, keyframes } from 'styled-components';

import CurrencyBadge from '../CurrencyBadge';

import { CURRENCIES_QUERY } from '../../../../../../../../app-data/graphql/query';

const pulseAnim = keyframes`
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(255, 30, 0, 0.4);
    box-shadow: 0 0 0 0 rgba(255, 30, 0, 0.4);
  }
  70% {
      -moz-box-shadow: 0 0 0 15px rgba(255, 30, 0, 0);
      box-shadow: 0 0 0 15px rgba(255, 30, 0, 0);
  }
  100% {
      -moz-box-shadow: 0 0 0 0 rgba(255, 30, 0, 0);
      box-shadow: 0 0 0 0 rgba(255, 30, 0, 0);
  }
`;
const PulseButton = styled.button`
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: .25rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  animation: ${({ pulse }) => pulse ? css`${pulseAnim} 1.5s infinite` : ''};
`;


const useCheckDefaultExist = (arr) => {
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

const ProductVariant = ({ productData, handleProductData, noVariant }) => {
  const [inChecked, toggleInCheck] = useState(false);
  const defaultExist = useCheckDefaultExist(productData.variant || []);

  useEffect(() => {
    if (!defaultExist) {
      toggleInCheck(false);
    }
  }, [defaultExist]);

  const variantTitleRef = useRef(null);
  const variantPriceRef = useRef(null);
  const variantDefaultRef = useRef(null);
  const variantDiscountRef = useRef(null);

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

  console.log(noVariant);

  const handleAddVariant = () => {
    const { title: currencyTitle, sign: currencySign } = currency;
    const variant = productData.variant || [];

    const variantData = {
      default: variantDefaultRef.current.checked,
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

  const handleRemoveVariant = (i) => {
    const variant = productData.variant
      .slice(0, i)
      .concat(productData.variant.slice(i + 1, productData.variant.length));

    handleProductData({
      ...productData,
      variant,
    });
  };

  return (
    <>
      <h5>Variant</h5>
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
                <CurrencyBadge
                  productData={productData}
                  handleProductData={handleProductData}
                />
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
            onClick={() => handleAddVariant()}
            pulse={noVariant}
          >
            Add variant
          </PulseButton>
        </Col>
      </Row>
      {productData.variant && productData.variant.length > 0 ? (
        <ListGroup className="mb-3">
          {productData.variant.map((variantItem, i) => {
            return (
              <ListGroupItem key={i}>
                <Row>
                  <Col>{variantItem.title}</Col>
                  <Col>{variantItem.price.value}</Col>
                  <Col>
                    {variantItem.price.discount ? (
                      <Badge color="primary">
                        {variantItem.price.discount}
                        %
                      </Badge>
                    ) : (
                      ' '
                    )}
                  </Col>
                  <Col>
                    {variantItem.default ? (
                      <Badge color="danger">Default</Badge>
                    ) : (
                      ' '
                    )}
                  </Col>
                  <Col>
                    <Button onClick={() => handleRemoveVariant(i)}>
                      Remove
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      ) : null}
    </>
  );
};

ProductVariant.propTypes = {
  productData: PropTypes.shape({
    category: PropTypes.string,
    description: PropTypes.string,
    discount: PropTypes.number,
    inStock: PropTypes.bool,
    modifiedByUserId: PropTypes.string,
    shortDescription: PropTypes.string,
    subCategory: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.object),
    note: PropTypes.string,
    title: PropTypes.string,
    variant: PropTypes.arrayOf(
      PropTypes.shape({
        default: PropTypes.bool,
        title: PropTypes.string,
        price: PropTypes.shape({
          currency: PropTypes.string,
          currencySign: PropTypes.string,
          discount: PropTypes.number,
          value: PropTypes.number,
        }),
      })
    ),
  }).isRequired,
  handleProductData: PropTypes.func.isRequired,
  noVariant: PropTypes.bool.isRequired,
};

export default ProductVariant;
