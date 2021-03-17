import React, { FC, useState } from 'react';
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
  Paper,
} from '@material-ui/core';
import EuroIcon from '@material-ui/icons/Euro';
import { useQuery } from 'react-apollo';
import { PRODUCTS_BY_IDS_QUERY } from '../../../../../graphql/query';
import CardGiftcardOutlinedIcon from '@material-ui/icons/CardGiftcardOutlined';
import { Ornament } from '../Apperance/Ornament';

type IProductToCartData = {
  formData: IGiftCardData;
  setFormData: React.Dispatch<React.SetStateAction<IGiftCardData>>;
};

const OrnamentHolder = styled.div`
  position: absolute;
  bottom: 6px;
  width: 50%;
  margin-left: 50%;
  transform: translateX(-50%);
`;

const H5 = styled.h5`
  font-weight: bold;
  padding-left: 16px;
`;

const HelperText = styled.p`
  color: rgba(0, 0, 0, 0.54);
  margin: 0;
  font-size: 0.75rem;
  margin-top: 3px;
  text-align: left;
  font-weight: 400;
  line-height: 1.66;
  letter-spacing: 0.03333em;
  margin-left: 14px;
  margin-right: 14px;
`;

const Summary: FC<IProductToCartData> = ({ formData }) => {
  const {
    giftCardImageUrl,
    textColor,
    borderColor,
    priceValue,
    text,
    services,
    totalPrice,
    giftCardTitle,
  } = formData;
  let ids: String[] = [];
  services.length > 0 &&
    services.forEach((item) => {
      ids.push(item.id);
    });

  const { error, loading, data } = useQuery(PRODUCTS_BY_IDS_QUERY, {
    variables: { ids },
  });

  if (loading) {
    return <></>;
  }

  let price = 0;
  if (data) {
    const { productsByIds } = data;
    formData.services.forEach((service, i) => {
      productsByIds.map((e) => {
        if (service.id === e._id) {
          const comparedVariants = e.variants.filter(
            (variant: any) => variant.title === service.variantTitle
          );
          if (comparedVariants.length === 0) {
            formData.services.splice(i, 1);
          }
          e.variants.map((variant) => {
            if (service.variantTitle === variant.title) {
              if (service.price !== variant.price.value) {
                service.price = variant.price.value;
              }
            }
          });
        }
      });
    });
    for (let i = 0; i < formData.services.length; i++) {
      price += formData.services[i].price * formData.services[i].count;
    }
    price = price + formData.priceValue;
    formData.totalPrice = price;
  }

  return (
    <Row className="mt-4 mb-4">
      <Col md={6}>
        <>
          <H4 className="mb-4">Súhrn poukážky:</H4>
          <Paper elevation={3}>
            <List>
              {services.map((item, i) => {
                return (
                  <ListItem key={i}>
                    <ListItemAvatar>
                      <Avatar>
                        <CardGiftcardOutlinedIcon />
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
          </Paper>
          <H5
            style={{
              marginTop: '12px',
              marginRight: '12px',
            }}
          >{`Spolu: ${price} €`}</H5>
        </>
      </Col>
      <Col md={6}>
        <PreviewHolder>
          <Preview src={giftCardImageUrl} alt="poukazka" />
        </PreviewHolder>
        <PreviewHolder elevation={4}>
          <Preview src="/images/skica.png" alt="poukazka" />
          <OrnamentHolder>
            <Ornament color={borderColor ? borderColor : 'black'} />
          </OrnamentHolder>
          <PreviewTextHolder>
            <PrednaStranaText colorText={textColor ? textColor : 'black'}>
              {text}
            </PrednaStranaText>
          </PreviewTextHolder>
        </PreviewHolder>
        <HelperText>
          * Vizuálna podoba má ukážkový charakter. Text bude prispôsobený
          dizajnu poukážky.
        </HelperText>
      </Col>
    </Row>
  );
};

export default Summary;
