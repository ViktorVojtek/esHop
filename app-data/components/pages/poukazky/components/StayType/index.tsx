import React, { useState, FC } from 'react';
import { H3, H4, ItemText, Button } from '../../styles/index';
import { Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import RomantikaModal from '../RomantikaModal';
import JesenZivotaModal from '../JesenZivotaModal';

const StayType: FC = () => {
  const [activeStay, setActiveStay] = useState(0);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  console.log(activeStay);

  return(
    <>
      <Container>
        <H3>Vyberte si služby</H3>
        <H4 className="mb-4">Pobyty</H4>
        <Row>
          <Col md="4" sm="6" xs="12" className="d-flex align-items-center justify-content-center flex-column">
            <ItemText>Romantika</ItemText>
            <div className="d-flex w-100 mb-4">
              <Button>Pridať</Button>
              <Button onClick={() => {toggle(); setActiveStay(0)}}>O pobyte</Button>
            </div>
          </Col>
          <Col md="4" sm="6" xs="12" className="d-flex align-items-center justify-content-center flex-column">
            <ItemText>Jesen života</ItemText>
            <div className="d-flex w-100 mb-4">
              <Button>Pridať</Button>
              <Button onClick={() => {toggle(); setActiveStay(1)}}>O pobyte</Button>
            </div>
          </Col>
          <Col md="4" sm="6" xs="12" className="d-flex align-items-center justify-content-center flex-column">
            <ItemText>Čaro pienin</ItemText>
            <div className="d-flex w-100 mb-4">
              <Button>Pridať</Button>
              <Button>O pobyte</Button>
            </div>
          </Col>
          <Col md="4" sm="6" xs="12" className="d-flex align-items-center justify-content-center flex-column">
            <ItemText>Rodinná idylka</ItemText>
            <div className="d-flex w-100 mb-4">
              <Button>Pridať</Button>
              <Button>O pobyte</Button>
            </div>
          </Col>
          <Col md="4" sm="6" xs="12" className="d-flex align-items-center justify-content-center flex-column">
            <ItemText>Hrejivá zima</ItemText>
            <div className="d-flex w-100 mb-4">
              <Button>Pridať</Button>
              <Button>O pobyte</Button>
            </div>
          </Col>
          <Col md="4" sm="6" xs="12" className="d-flex align-items-center justify-content-center flex-column">
            <ItemText>Silvester s rodinou</ItemText>
            <div className="d-flex w-100 mb-4">
              <Button>Pridať</Button>
              <Button>O pobyte</Button>
            </div>
          </Col>
        </Row>
      </Container>
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Informácie o pobyte</ModalHeader>
          <ModalBody>
            { activeStay === 0 ? <RomantikaModal /> : null }
            { activeStay === 1 ? <JesenZivotaModal /> : null }
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

export default StayType;