import React, { useEffect, useState } from 'react';
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
import { PRODUCTS_QUERY } from '../../../../../../graphql/query';
import {
  CREATE_PRODUCT_MUTATION,
  UPDATE_PRODUCT_MUTATION,
} from '../../../../../../graphql/mutation';
import { useSnackbar } from 'notistack';
import UpdateVariantProductData from './components/UpdateVariantProductData';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 'calc(100vw - 300px)',
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
  slug: '',
  category: {
    id: '',
    title: '',
  },
  isEnvelopeSize: false,
  subCategory: {
    id: '',
    title: '',
  },
  variants: [],
};

interface IProductForm {
  update?: boolean;
  updateProductData?: any;
}
const ProductStepper = ({ update, updateProductData }: IProductForm) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = useState(0);
  const [productData, setProductData] = useState(initialProductData);
  const [backdropOpen, toggleBackdrop] = useState(false);
  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: PRODUCTS_QUERY }],
  });
  const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: PRODUCTS_QUERY }],
  });

  useEffect(() => {
    if (updateProductData) {
      setProductData(updateProductData);
    }
  }, [updateProductData]);

  const steps = update ? getUpdateSteps() : getSteps();

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
      if (updateProductData) {
        const {
          _id,
          dateCreated,
          dateModified,
          modifiedByUserId,
          ...restData
        } = productData as any;

        await updateProduct({
          variables: { _id, productInput: restData },
        });
        enqueueSnackbar('Produkt bol úspešne upravený', {
          variant: 'success',
        });
      } else {
        toggleBackdrop(true);
        await createProduct({ variables: { productInput: productData } });
        setProductData(initialProductData);
        toggleBackdrop(false);
        setActiveStep(0);
      }
    } catch (err) {
      enqueueSnackbar('Nastala chyba', {
        variant: 'error',
      });
      console.log(err.message);
    }
  };

  const activeStepContent = getStepContent(
    activeStep,
    productData,
    setProductData,
    update
  );

  const disabled: boolean = checkStepBtnDisabled(activeStep, productData);

  return (
    <>
      <Backdrop open={backdropOpen}>
        <CircularProgress color="primary" />
      </Backdrop>
      {!update ? (
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
                  Produkt bol vytvorený.
                </Typography>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                <div className={classes.stepContent}>
                  <div>{activeStepContent}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    <Typography>Späť</Typography>
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
                      {activeStep === steps.length - 1
                        ? 'Vytvoriť'
                        : 'Pokračovať'}
                    </Typography>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {productData.variants.length > 0 && (
            <>
              <GeneralProductData
                productData={productData}
                setProductData={setProductData}
                update={update}
                handleCreateProduct={handleCreateProduct}
              />
              <UpdateVariantProductData
                productData={productData}
                setProductData={setProductData}
              />
            </>
          )}
        </>
      )}
    </>
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
    'Základné vlastnosti produktu',
    'Vytvorenie variantov produktu',
    'Kontrola produktu',
  ];
}
function getUpdateSteps(): string[] {
  return ['Základné vlastnosti produktu', 'Úprava variantov produktu'];
}
function getStepContent(
  stepIndex: number,
  data: any,
  handler: any,
  update: boolean
) {
  switch (stepIndex) {
    case 0:
      return <GeneralProductData productData={data} setProductData={handler} />;
    case 1:
      return (
        <VariantProductData
          productData={data}
          setProductData={handler}
          update={update}
        />
      );
    case 2:
      return <ProductResult productData={data} setProductData={handler} />;
    default:
      return 'Unknown stepIndex';
  }
}

export default ProductStepper;
