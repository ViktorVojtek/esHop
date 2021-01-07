import React, { useState } from 'react';
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
import { getImageUrl } from '../../../../../shared/helpers';

const Img = styled.img`
  width: 100%;
  cursor: pointer;
`;
const StyledPaper = styled(Paper)`
  margin-bottom: 15px;
  display: flex;
  align-items: end;
  justify-content: flex-end;
`;
type StyledCheckProps = {
  isOpen: boolean;
};

const StyledCheck = styled(CheckCircleIcon)<StyledCheckProps>`
  color: ${colors.success};
  position: absolute;
  min-width: 48px;
  min-height: 48px;
  margin: 12px 12px 0px 0px;
  transform: ${(props) => (props.isOpen ? 'scale(1)' : 'scale(0)')};
  transition: all 0.3s ease-out !important;
`;

type ApperanceProps = {
  setFormData: React.Dispatch<React.SetStateAction<IGiftCardData>>;
  formData: IGiftCardData;
};

const Apperance = (props: ApperanceProps) => {
  const { formData, setFormData } = props;
  const [color, setColor] = useState(formData.cardColor);

  const handleChangeTextArea = (event) => {
    setFormData({
      ...formData,
      text: event.target.value,
    });
  };

  const handleSetColor = (color: string) => {
    setColor(color);
    setFormData({
      ...formData,
      cardColor: color,
    });
  };
  return (
    <Row className="mt-4 mb-4">
      <Col md={12}>
        <H4 className="mb-4">Zvoľte farbu poukážky:</H4>
      </Col>
      <Col md={6}>
        <StyledPaper elevation={3}>
          <Img
            src="/images/poukazky/poukazka_modra.png"
            onClick={() => handleSetColor('#00aeef')}
          />
          <StyledCheck isOpen={color === '#00aeef'} />
        </StyledPaper>
      </Col>
      <Col md={6}>
        <StyledPaper elevation={3}>
          <Img
            src="/images/poukazky/poukazka_cervena.png"
            onClick={() => handleSetColor('#ff0000')}
          />
          <StyledCheck isOpen={color === '#ff0000'} />
        </StyledPaper>
      </Col>
      <Col md={6}>
        <StyledPaper elevation={3}>
          <Img
            src="/images/poukazky/poukazka_zlta.png"
            onClick={() => handleSetColor('#FBC200')}
          />
          <StyledCheck isOpen={color === '#FBC200'} />
        </StyledPaper>
      </Col>
      <Col md={6}>
        <StyledPaper elevation={3}>
          <Img
            src="/images/poukazky/poukazka_zelena.png"
            onClick={() => handleSetColor('#00BF0B')}
          />
          <StyledCheck isOpen={color === '#00BF0B'} />
        </StyledPaper>
      </Col>
      <Col md="12" className="mt-4 mb-4">
        <H4>Zadajte Vaše venovanie:</H4>
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
      <Col md={6} className="d-flex align-items-center">
        <PreviewHolder>
          <Preview src={getImageUrl[color]} alt="poukazka" />
          <PreviewTextHolder>
            <PrednaStranaText colorText={color}>
              {formData.text}
            </PrednaStranaText>
          </PreviewTextHolder>
        </PreviewHolder>
      </Col>
    </Row>
  );
};

export default Apperance;
