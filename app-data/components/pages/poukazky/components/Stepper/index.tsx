import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import { Button, colors } from '../../../../../shared/design';
import Content from '../Content';
import { useSnackbar } from 'notistack';
import Apperance from '../Apperance';
import Summary from '../Summary';
import { Context } from '../../../../../lib/state/Store';
import { StepButton } from '@material-ui/core';
import { scrollTop } from '../../../../../shared/helpers';

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
};

export type IGiftCardData = {
  cardColor: string;
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

function getSteps() {
  return ['Zvoľte obsah poukážky', 'Vzhľad a venovanie', 'Súhrn poukážky'];
}

export default function GiftCardStepper() {
  const classes = useStyles();
  const { dispatch } = useContext(Context);
  const { enqueueSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>(
    {}
  );
  const steps = getSteps();
  const [formData, setFormData] = useState<IGiftCardData>({
    cardColor: '#00aeef',
    priceValue: 0,
    text: '',
    services: [],
    totalPrice: 0,
  });

  const handleStep = (step: number) => () => {
    if (step === 1 || step === 2) {
      if (formData.priceValue === 0 && formData.services.length < 1) {
        return enqueueSnackbar(`Obsah poukážky je prázdny`, {
          variant: 'error',
        });
      }
    }
    if (step === 2) {
      if (formData.text === '') {
        return enqueueSnackbar(`Zadajte venovanie`, {
          variant: 'error',
        });
      }
    }
    setActiveStep(step);
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (formData.priceValue === 0 && formData.services.length < 1) {
        return enqueueSnackbar(`Obsah poukážky je prázdny`, {
          variant: 'error',
        });
      }
    }
    if (activeStep === 1) {
      if (formData.text === '') {
        return enqueueSnackbar(`Zadajte venovanie`, {
          variant: 'error',
        });
      }
    }
    if (activeStep === 2) {
      handleReset();
      handleSubmit();
      return setFormData({
        cardColor: '#00aeef',
        priceValue: 0,
        text: '',
        services: [],
        totalPrice: 0,
      });
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    scrollTop();
  };
  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleAddGiftCard: (data: IGiftCardData) => void = (data) => {
    const { cardColor, priceValue, text, services, totalPrice } = data;
    dispatch({
      type: 'ADD_TO_GIFT_CARDS',
      payload: {
        cardColor,
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
    dispatch({ type: 'SET_PRODUCT_MODAL', payload: true });
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
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            {activeStep === 0 && (
              <Content formData={formData} setFormData={setFormData} />
            )}
            {activeStep === 1 && (
              <Apperance formData={formData} setFormData={setFormData} />
            )}
            {activeStep === 2 && <Summary formData={formData} />}
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
        )}
      </div>
    </div>
  );
}
