import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import StepperWrapper from './StepperWrapper';

import { getSteps } from './helpers';

const Comp1 = () => (
  <div>
    <Select></Select>
  </div>
);
const Comp2 = () => <div>Component 2</div>;
const Comp3 = () => <div>Component 3</div>;

export default () => {
  const [activeStep, setActiveStep] = useState(0);
  const [backdropOpen, toggleBackdrop] = useState(false);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleResetSteps = () => {
    setActiveStep(0);
  };
  const handleCreateService = async () => {
    try {
      console.log('Create service');
      /* toggleBackdrop(!backdropOpen);
      await dispatch({ variables: { productInput: productData } });
      console.log('Product should be created');
      setProductData(initialProductData);
      toggleBackdrop(!backdropOpen); */
      setActiveStep(0);
    } catch (err) {
      console.log(err.message);
    }
  };

  const steps: string[] = getSteps([
    'Fill in general service data',
    "Create service's variants",
    'Check your future service',
  ]);

  switch (activeStep) {
    case 0:
      return (
        <StepperWrapper
          activeStep={activeStep}
          backdropOpen={backdropOpen}
          back={handleBack}
          next={handleNext}
          steps={steps}
          publish={handleCreateService}
          resetSteps={handleResetSteps}
        >
          <Comp1 />
        </StepperWrapper>
      );
    case 1:
      return (
        <StepperWrapper
          activeStep={activeStep}
          backdropOpen={backdropOpen}
          back={handleBack}
          next={handleNext}
          steps={steps}
          publish={handleCreateService}
          resetSteps={handleResetSteps}
        >
          <Comp2 />
        </StepperWrapper>
      );
    case 2:
      return (
        <StepperWrapper
          activeStep={activeStep}
          backdropOpen={backdropOpen}
          back={handleBack}
          next={handleNext}
          steps={steps}
          publish={handleCreateService}
          resetSteps={handleResetSteps}
        >
          <Comp3 />
        </StepperWrapper>
      );
    default:
      return (
        <StepperWrapper
          activeStep={activeStep}
          backdropOpen={backdropOpen}
          back={handleBack}
          next={handleNext}
          steps={steps}
          publish={handleCreateService}
          resetSteps={handleResetSteps}
        >
          <p>No real step</p>
        </StepperWrapper>
      );
  }
};
