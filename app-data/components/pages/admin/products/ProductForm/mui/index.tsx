import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Backdrop,
  Button,
  CircularProgress,
  Step,
  Stepper,
  StepLabel,
  Typography,
} from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import GeneralProductData from './components/GeneralProductData';
import VariantProductData from './components/VariantProductData';
import ProductResult from './components/ProductResult';
import { CREATE_PRODUCT_MUTATION } from '../../../../../../graphql/mutation';

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
  category: {
    id: '',
    title: '',
  },
  subCategory: {
    id: '',
    title: '',
  },
  variants: [],
};

const ProductStepper = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [productData, setProductData] = useState(initialProductData);
  const [backdropOpen, toggleBackdrop] = useState(false);
  const [dispatch] = useMutation(CREATE_PRODUCT_MUTATION);
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

  const handleCreateProduct = async () => {
    try {
      toggleBackdrop(!backdropOpen);
      await dispatch({ variables: { productInput: productData } });
      console.log('Product should be created');
      setProductData(initialProductData);
      toggleBackdrop(!backdropOpen);
      setActiveStep(0);
    } catch (err) {
      console.log(err.message);
    }
  };

  const activeStepContent = getStepContent(
    activeStep,
    productData,
    setProductData
  );

  const disabled: boolean = checkStepBtnDisabled(activeStep, productData);

  console.log(productData);

  return (
    <div className={classes.root}>
      <Backdrop open={backdropOpen}>
        <CircularProgress color="primary" />
      </Backdrop>
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
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (activeStep === steps.length - 1) {
                    handleCreateProduct();
                  } else {
                    handleNext();
                  }
                }}
                disabled={disabled}
              >
                <Typography>
                  {activeStep === steps.length - 1 ? 'Publish' : 'Next'}
                </Typography>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function checkStepBtnDisabled(step: number, prodData: any) {
  const {
    title,
    category: { id: catId },
    subCategory: { id: subId },
    variants,
  } = prodData;
  if (step === 0) {
    if (title && catId && subId) {
      return false;
    }
  } else if (step === 1) {
    console.log(variants.length);
    if (variants.length > 0) {
      return false;
    }
  } else {
    return false;
  }

  return true;
}

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
