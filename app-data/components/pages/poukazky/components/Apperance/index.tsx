import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'reactstrap';
import {
  H4,
  Preview,
  PreviewHolder,
  PreviewTextHolder,
  PrednaStranaText,
} from '../../styles';
import { IGiftCardData } from '../Stepper';
import { Paper, TextField } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { colors } from '../../../../../shared/design';
import { useQuery } from 'react-apollo';
import { GIFTCARDS_QUERY } from '../../../../../graphql/query';
import { GiftCardType } from '../../../admin/gift-cards';
import { Element } from 'react-scroll';
import { Ornament } from './Ornament';

const Img = styled.img`
  width: 100%;
  cursor: pointer;
`;

const OrnamentHolder = styled.div`
  position: absolute;
  bottom: 6px;
  width: 50%;
  margin-left: 50%;
  transform: translateX(-50%);
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
const StyledPaper = styled(Paper)`
  margin-bottom: 15px;
  display: flex;
  align-items: end;
  justify-content: flex-end;
`;
type StyledCheckProps = {
  isActive: boolean;
};

const StyledCheck = styled(CheckCircleIcon)<StyledCheckProps>`
  color: ${colors.success};
  position: absolute;
  min-width: 48px;
  min-height: 48px;
  margin: 12px 12px 0px 0px;
  transform: ${(props) => (props.isActive ? 'scale(1)' : 'scale(0)')};
  transition: all 0.3s ease-out !important;
`;

type ApperanceProps = {
  setFormData: React.Dispatch<React.SetStateAction<IGiftCardData>>;
  formData: IGiftCardData;
};

const Apperance = (props: ApperanceProps) => {
  const { formData, setFormData } = props;

  const { error, loading, data } = useQuery(GIFTCARDS_QUERY);

  if (loading) {
    return <>loading</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  const { giftCards } = data;

  const filteredActiveGiftCard = giftCards.filter(
    (giftCard) => giftCard.title === formData.giftCardTitle
  );
  const activeGiftCard = filteredActiveGiftCard[0];

  const handleChangeTextArea = (event) => {
    setFormData({
      ...formData,
      text: event.target.value,
    });
  };

  const handleSetGiftCardTitle = (giftCard: GiftCardType) => {
    setFormData({
      ...formData,
      giftCardTitle: giftCard.title,
      giftCardImageUrl: giftCard.image.path,
      textColor: giftCard.textColor,
      borderColor: giftCard.borderColor,
    });
  };
  return (
    <Row className="mt-4 mb-4">
      <Col md={12}>
        <H4 className="mb-4">Zvoľte motív poukážky:</H4>
      </Col>
      {giftCards && giftCards.length > 0 && (
        <>
          {giftCards.map((giftCard) => (
            <Col md={6} className="mb-2" key={giftCard.title}>
              <StyledPaper elevation={3}>
                <Img
                  src={giftCard.image.path}
                  onClick={() => handleSetGiftCardTitle(giftCard)}
                />
                <StyledCheck
                  isActive={formData.giftCardTitle === giftCard.title}
                />
              </StyledPaper>
            </Col>
          ))}
        </>
      )}
      <Col md="12" className="mt-4 mb-4">
        <Element name="dedication">
          <H4>Zadajte Vaše venovanie:</H4>
        </Element>
      </Col>
      <Col md={6} className="mb-4">
        <TextField
          label="Venovanie"
          fullWidth
          multiline
          helperText="*Maximálne 140 znakov"
          rows={4}
          value={formData.text}
          variant="outlined"
          inputProps={{ maxLength: 140 }}
          onChange={(e) => {
            handleChangeTextArea(e);
          }}
        />
      </Col>
      <Col md={6}>
        <PreviewHolder elevation={4}>
          <Preview src="/images/skica.png" alt="poukazka" />
          <OrnamentHolder>
            <Ornament
              color={activeGiftCard ? activeGiftCard.borderColor : 'black'}
            />
          </OrnamentHolder>

          <PreviewTextHolder>
            <PrednaStranaText
              colorText={activeGiftCard ? activeGiftCard.textColor : 'black'}
            >
              {formData.text}
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

export default Apperance;
