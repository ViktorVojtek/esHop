import React, { useState, FC, Dispatch, SetStateAction } from 'react';
import {
  H2,
  StayIcon,
  ProceduresIcon,
  MoneyIcon,
  RestaurantIcon,
  ItemHolder,
} from './styles';
import { Container, Row, Col } from 'reactstrap';
import AnchorLink from 'react-anchor-link-smooth-scroll';

interface IPoukazky {
  getActiveType: Dispatch<SetStateAction<number>>;
}

const PoukazkaTypes: FC<IPoukazky> = ({ getActiveType }) => {
  const handleSetActiveCategory: (id: number) => void = (id) => {
    getActiveType(id);
  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm="3" xs="6">
          <AnchorLink offset={() => 100} href="#voucherContent">
            <ItemHolder onClick={() => handleSetActiveCategory(2)}>
              <MoneyIcon />
              <H2>Peniaze</H2>
            </ItemHolder>
          </AnchorLink>
        </Col>
        <Col sm="3" xs="6">
          <AnchorLink offset={() => 100} href="#voucherContent">
            <ItemHolder onClick={() => handleSetActiveCategory(0)}>
              <StayIcon />
              <H2>Služby</H2>
            </ItemHolder>
          </AnchorLink>
        </Col>
      </Row>
    </Container>
  );
};

export default PoukazkaTypes;
