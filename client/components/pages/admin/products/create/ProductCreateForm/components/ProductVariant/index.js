import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  FormGroup,
  InputGroup,
  Input,
  InputGroupAddon,
  Label,
  Row,
  Col,
} from 'reactstrap';

import CurrencyBadge from '../CurrencyBadge';

const ProductVariant = ({ productData, handleProductData }) => {
  const variantTitleRef = useRef(null);
  const variantPriceRef = useRef(null);
  const [variants, setVariants] = useState([]);

  const handleAddVariant = () => {
    /* const variant = {
      default
    }; */
  };

  return (
    <>
      <Row form>
        <Col>
          <FormGroup>
            <Input
              type="text"
              className="variantTitle"
              placeholder="Variant title"
              ref={variantTitleRef}
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
                placeholder="Variant price"
                ref={variantPriceRef}
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
          <FormGroup check>
            <Label check>
              <Input type="checkbox" className="variantDefault" />
              Default
            </Label>
          </FormGroup>
        </Col>
        <Col>
          <Button>Add variant</Button>
        </Col>
      </Row>
    </>
  );
};

ProductVariant.propTypes = {
  productData: PropTypes.shape({
    category: PropTypes.string,
    description: PropTypes.string,
    discount: PropTypes.number,
    inStock: PropTypes.number,
    modifiedByUserId: PropTypes.string,
    shortDescription: PropTypes.string,
    subCategory: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.object),
    note: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.shape({
      currency: PropTypes.string,
      currencySign: PropTypes.string,
      value: PropTypes.number,
    }),
  }).isRequired,
  handleProductData: PropTypes.func.isRequired,
};

export default ProductVariant;
