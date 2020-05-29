import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Button,
  Paper,
  Step,
  Stepper,
  StepLabel,
  Typography,
} from '@material-ui/core';
import GeneralProductData from './components/GeneralProductData';
import VariantProductData from './components/VariantProductData';
import ProductResult from './components/ProductResult';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    paperContent: {
      padding: '1rem 1.5rem',
    },
    stepContent: {
      padding: '1rem 0',
    },
  })
);

const initialProductData = {
  title: '',
  categoryId: '',
  subCategoryId: '',
  variants: [],
};

const ProductStepper = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [productData, setProductData] = useState(initialProductData);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    const dataReset = initialProductData;

    setProductData(dataReset);
  };

  const activeStepContent = getStepContent(
    activeStep,
    productData,
    setProductData
  );

  console.log(productData);

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              Product has been created.
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <div className={classes.stepContent}>
              <div>{activeStepContent}</div>
            </div>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                <Typography>Back</Typography>
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                <Typography>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Typography>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function getSteps(): string[] {
  return [
    'Fill in general product data',
    "Create product's variants",
    'Check your future product',
  ];
}
function getStepContent(stepIndex: number, data: any, handler: any) {
  switch (stepIndex) {
    case 0:
      return <GeneralProductData productData={data} setProductData={handler} />;
    case 1:
      return <VariantProductData productData={data} setProductData={handler} />;
    case 2:
      return <ProductResult productData={data} setProductData={handler} />;
    default:
      return 'Unknown stepIndex';
  }
}

export default ProductStepper;
