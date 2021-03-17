import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  StepButton,
} from '@material-ui/core';
import Link from 'next/link';
import Step from '@material-ui/core/Step';
import ReactGA from 'react-ga';
import Stepper from '@material-ui/core/Stepper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../../lib/state/Store';
import { Button, colors } from '../../../../../shared/design';
import { scrollTop } from '../../../../../shared/helpers';
import Apperance from '../Apperance';
import Content from '../Content';
import Summary from '../Summary';
import CardGiftcardOutlinedIcon from '@material-ui/icons/CardGiftcardOutlined';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { formatPrice } from '../../../../../shared/helpers/formatters';
import EuroIcon from '@material-ui/icons/Euro';
import { scroller } from 'react-scroll';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& .MuiStepper-root': {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

type ServiceData = {
  title: string;
  price: number;
  count: number;
  type?: string;
  id: string;
  variantTitle: string;
  variantNumber: number;
};

export type IGiftCardData = {
  giftCardTitle: string;
  giftCardImageUrl: string;
  textColor: string;
  borderColor: string;
  priceValue: number;
  text: string;
  services: ServiceData[];
  totalPrice: number;
};

const StyledStepButton = styled(StepButton)`
  outline: none !important;
  .MuiStepIcon-active {
    color: ${colors.primary} !important;
  }
`;

const StyledShoppingCartIcon = styled(ShoppingCartIcon)`
  color: white;
  @media (max-width: 330px) {
    display: none !important;
  }
`;

const StyledModalBody = styled.div``;
const ModalProductInfo = styled.div`
  margin-left: 24px;
  @media (max-width: 576px) {
    margin-left: 0;
  }
`;
const ModalTitle = styled.h6`
  color: black;
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
`;
const ModalText = styled.p`
  color: black;
  font-size: 0.95rem;
  margin: 0;
`;
const ModalTextSmall = styled.p`
  color: #4a4a4a;
  font-size: 0.85rem;
  margin: 0;
`;
const ModalTextBigger = styled.p`
  color: black;
  font-size: 1.1rem;
  margin: 0;
`;
const ModalImage = styled.img`
  width: 100%;
  margin-top: 16px;
  margin-bottom: 16px;
`;

function getSteps() {
  return ['Vzhľad a venovanie', 'Zvoľte obsah poukážky', 'Súhrn poukážky'];
}

export default function GiftCardStepper() {
  const classes = useStyles();
  const { dispatch } = useContext(Context);
  const { enqueueSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = useState(0);
  const [isModal, setModal] = useState<boolean>(false);
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>(
    {}
  );
  const steps = getSteps();
  const [formData, setFormData] = useState<IGiftCardData>({
    giftCardTitle: '',
    giftCardImageUrl: '',
    textColor: '',
    borderColor: '',
    priceValue: 0,
    text: '',
    services: [],
    totalPrice: 0,
  });
  const getPrice = (items) => {
    let price = 0;
    for (let i = 0; i < items.length; i++) {
      price += items[i].price * items[i].count;
    }
    return price;
  };
  const toggleModal = () => setModal(!isModal);

  useEffect(() => {
    const giftCard: IGiftCardData = JSON.parse(
      window.localStorage.getItem('giftCard')
    );
    if (giftCard === null) {
      return;
    }
    giftCard.totalPrice = getPrice(giftCard.services) + giftCard.priceValue;
    setFormData(giftCard);
    scrollTop();
  }, []);

  useEffect(() => {
    window.localStorage.setItem('giftCard', JSON.stringify(formData));
  }, [formData]);

  const handleStep = (step: number) => () => {
    if (step === 2) {
      if (formData.priceValue === 0 && formData.services.length < 1) {
        return enqueueSnackbar(`Obsah poukážky je prázdny`, {
          variant: 'error',
        });
      }
      ReactGA.event({
        category: 'GiftCards',
        action: 'Products choose',
      });
    }
    if (step === 1) {
      if (formData.text === '') {
        scroller.scrollTo('dedication', {
          duration: 500,
          delay: 50,
          smooth: true,
          offset: -120,
        });
        return enqueueSnackbar(`Zadajte venovanie`, {
          variant: 'error',
        });
      }
      if (formData.giftCardTitle === '') {
        return enqueueSnackbar(`Vyberte motív poukážky`, {
          variant: 'error',
        });
      }
      ReactGA.event({
        category: 'GiftCards',
        action: 'Products choose',
      });
    }
    if (step === 3) {
      ReactGA.event({
        category: 'GiftCards',
        action: 'Summary view',
      });
    }
    setActiveStep(step);
  };

  const handleNext = () => {
    if (activeStep === 1) {
      if (formData.priceValue === 0 && formData.services.length < 1) {
        return enqueueSnackbar(`Obsah poukážky je prázdny`, {
          variant: 'error',
        });
      }
      ReactGA.event({
        category: 'GiftCards',
        action: 'Products choose',
      });
    }
    if (activeStep === 0) {
      if (formData.text === '') {
        return enqueueSnackbar(`Zadajte venovanie`, {
          variant: 'error',
        });
      }
      if (formData.giftCardTitle === '') {
        return enqueueSnackbar(`Vyberte motív poukážky`, {
          variant: 'error',
        });
      }
      ReactGA.event({
        category: 'GiftCards',
        action: 'Apperance view',
      });
    }
    if (activeStep === 2) {
      ReactGA.event({
        category: 'GiftCards',
        action: 'Summary view',
      });
      toggleModal();
      return handleSubmit();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    scrollTop();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    scrollTop();
  };

  const handleReset = () => {
    toggleModal();
    setFormData({
      giftCardTitle: '',
      giftCardImageUrl: '',
      textColor: '',
      borderColor: '',
      priceValue: 0,
      text: '',
      services: [],
      totalPrice: 0,
    });
    setActiveStep(0);
  };
  const totalSteps = () => {
    return steps.length;
  };

  const handleAddGiftCard: (data: IGiftCardData) => void = (data) => {
    const {
      giftCardTitle,
      giftCardImageUrl,
      priceValue,
      text,
      services,
      totalPrice,
    } = data;
    dispatch({
      type: 'ADD_TO_GIFT_CARDS',
      payload: {
        giftCardTitle,
        giftCardImageUrl,
        totalPrice,
        priceValue,
        text,
        services,
        type: 'poukazka',
      },
    });
  };

  const handleSubmit = () => {
    handleAddGiftCard(formData);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} nonLinear alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StyledStepButton
              onClick={handleStep(index)}
              completed={completed[index]}
            >
              {label}
            </StyledStepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        <div>
          {activeStep === 0 && (
            <Apperance formData={formData} setFormData={setFormData} />
          )}
          {activeStep === 1 && (
            <Content formData={formData} setFormData={setFormData} />
          )}
          {activeStep === 2 && (
            <Summary formData={formData} setFormData={setFormData} />
          )}
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}
            >
              Späť
            </Button>
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1
                ? 'Pridať do košíka'
                : 'Pokračovať'}
            </Button>
          </div>
        </div>
      </div>
      <Modal isOpen={isModal} toggle={toggleModal}>
        <ModalHeader
          style={{ width: '100%', padding: '.5rem 1rem' }}
          toggle={handleReset}
        >
          Darčeková poukážka bola úspešne pridaná do košíka
        </ModalHeader>
        <ModalBody>
          <StyledModalBody>
            {formData.giftCardImageUrl && (
              <ModalImage
                src={formData.giftCardImageUrl}
                alt={formData.giftCardTitle}
              />
            )}
            <ModalProductInfo>
              <ModalText>Obsah poukážky</ModalText>
              <List>
                {formData.services.map((item, i) => {
                  return (
                    <ListItem key={i}>
                      <ListItemAvatar>
                        <Avatar>
                          <CardGiftcardOutlinedIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText style={{ fontSize: '.8rem' }}>{`${
                        item.title
                      } - ${formatPrice(item.price)} € x ${
                        item.count
                      }`}</ListItemText>
                    </ListItem>
                  );
                })}
                {formData.priceValue > 0 && (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <EuroIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      style={{ fontSize: '.8rem' }}
                    >{`Suma - ${formatPrice(
                      formData.priceValue
                    )} €`}</ListItemText>
                  </ListItem>
                )}
              </List>
              <ModalTextSmall>Cena vrátane DPH 20%</ModalTextSmall>
              <ModalTextBigger>
                Cena spolu: <span>{formData.totalPrice}</span>
              </ModalTextBigger>
            </ModalProductInfo>
          </StyledModalBody>
        </ModalBody>
        <ModalFooter
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '.75rem 0',
          }}
        >
          <Button onClick={handleReset}>Nakupovať</Button>
          <Link href="/eshop/cart">
            <Button>
              <StyledShoppingCartIcon style={{ marginRight: '4px' }} />
              Do pokladne
            </Button>
          </Link>
        </ModalFooter>
      </Modal>
    </div>
  );
}
