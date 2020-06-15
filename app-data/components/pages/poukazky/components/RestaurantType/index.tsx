import React, { useState, FC } from 'react';
import { H3, H4, ItemText, Button, InputHolder } from '../../styles/index';
import {
  Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter,
  InputGroup, InputGroupAddon, InputGroupText, Input,
} from 'reactstrap';

const RestaurantType: FC = () => {
  const [activePackage, setActivePackage] = useState(0);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return(
    <>
      <Container>
        <H3>Zadajte hodnotu poukážky</H3>
        <InputHolder>
          <InputGroup>
            <InputGroupAddon addonType="prepend">€</InputGroupAddon>
            <Input placeholder="Zadajte hodnotu poukážky (min. 10 €)" min={10} type="number" step="1" />
            <InputGroupAddon addonType="append">.00</InputGroupAddon>
          </InputGroup>
        </InputHolder>
        <H3 className="mb-4">Zvoľte si balíček</H3>
        <Row>
          <Col md="4" sm="6" xs="12" className="d-flex align-items-center justify-content-center flex-column">
            <ItemText>Balíček 1</ItemText>
            <div className="d-flex w-100 mb-4">
              <Button>Pridať</Button>
              <Button onClick={() => {toggle(); setActivePackage(0)}}>O balíčku</Button>
            </div>
          </Col>
          <Col md="4" sm="6" xs="12" className="d-flex align-items-center justify-content-center flex-column">
            <ItemText>Balíček 2</ItemText>
            <div className="d-flex w-100 mb-4">
              <Button>Pridať</Button>
              <Button onClick={() => {toggle(); setActivePackage(1)}}>O balíčku</Button>
            </div>
          </Col>
          <Col md="4" sm="6" xs="12" className="d-flex align-items-center justify-content-center flex-column">
            <ItemText>Balíček 3</ItemText>
            <div className="d-flex w-100 mb-4">
              <Button>Pridať</Button>
              <Button>O balíčku</Button>
            </div>
          </Col>
          <Col md="4" sm="6" xs="12" className="d-flex align-items-center justify-content-center flex-column">
            <ItemText>Balíček 4</ItemText>
            <div className="d-flex w-100 mb-4">
              <Button>Pridať</Button>
              <Button>O balíčku</Button>
            </div>
          </Col>
          <Col md="4" sm="6" xs="12" className="d-flex align-items-center justify-content-center flex-column">
            <ItemText>Balíček 5</ItemText>
            <div className="d-flex w-100 mb-4">
              <Button>Pridať</Button>
              <Button>O balíčku</Button>
            </div>
          </Col>
          <Col md="4" sm="6" xs="12" className="d-flex align-items-center justify-content-center flex-column">
            <ItemText>Balíček 6</ItemText>
            <div className="d-flex w-100 mb-4">
              <Button>Pridať</Button>
              <Button>O balíčku</Button>
            </div>
          </Col>
        </Row>
      </Container>
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Informácie o balíčku</ModalHeader>
          <ModalBody>
            Nejaké bližšie info o balíčkoch.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>Pridať</Button>{' '}
            <Button color="secondary" onClick={toggle}>Zavrieť</Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}

export default RestaurantType;