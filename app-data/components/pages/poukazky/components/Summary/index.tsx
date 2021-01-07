import React, { FC } from 'react';
import styled from 'styled-components';
import {
  H4,
  PrednaStranaText,
  Preview,
  PreviewHolder,
  PreviewTextHolder,
} from '../../styles';
import { formatPrice } from '../../../../../shared/helpers/formatters';
import { IGiftCardData } from '../Stepper';
import { Col, Row } from 'reactstrap';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@material-ui/core';
import EuroIcon from '@material-ui/icons/Euro';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import { getImageUrl } from '../../../../../shared/helpers';

type IProductToCartData = {
  formData: IGiftCardData;
};

const H5 = styled.h5`
  font-weight: bold;
  padding-left: 16px;
`;

const Summary: FC<IProductToCartData> = ({ formData }) => {
  const { cardColor, priceValue, text, services, totalPrice } = formData;

  return (
    <Row className="mt-4 mb-4">
      <Col md={12}>
        <H4 className="mb-4">Súhrn poukážky:</H4>
      </Col>
      <Col md={6}>
        <>
          <List>
            {services.map((item, i) => {
              return (
                <ListItem key={i}>
                  <ListItemAvatar>
                    <Avatar>
                      <RoomServiceIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>{`${item.title} - ${formatPrice(
                    item.price
                  )} € x ${item.count}`}</ListItemText>
                </ListItem>
              );
            })}
            {priceValue > 0 && (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <EuroIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>{`Suma - ${formatPrice(
                  priceValue
                )} €`}</ListItemText>
              </ListItem>
            )}
          </List>
          <H5
            style={{
              marginTop: '12px',
              marginRight: '12px',
            }}
          >{`Spolu: ${totalPrice} €`}</H5>
        </>
      </Col>
      <Col md={6} className="d-flex align-items-center">
        <PreviewHolder>
          <Preview src={getImageUrl[cardColor]} alt="poukazka" />
          <PreviewTextHolder>
            <PrednaStranaText colorText={cardColor}>{text}</PrednaStranaText>
          </PreviewTextHolder>
        </PreviewHolder>
      </Col>
    </Row>
  );
};

export default Summary;
