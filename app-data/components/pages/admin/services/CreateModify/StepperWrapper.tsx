import React, { ReactNode, ReactChildren } from 'react';
import {
  Backdrop,
  Button,
  CircularProgress,
  Step,
  Stepper,
  StepLabel,
  Typography,
} from '@material-ui/core';

interface IProps {
  activeStep: number;
  backdropOpen: boolean;
  back: () => void;
  children: string | ReactNode | ReactChildren;
  next: () => void;
  steps: string[];
  publish: () => Promise<void>;
  resetSteps: () => void;
}

export default (props: IProps) => {
  const {
    activeStep,
    backdropOpen,
    children,
    back,
    next,
    steps,
    publish,
    resetSteps,
  } = props;

  return (
    <div>
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
            <Typography>Product has been created.</Typography>
            <Button onClick={resetSteps}>Reset</Button>
          </div>
        ) : (
          <div>
            <div>
              <div>{children}</div>
            </div>
            <div>
              <Button disabled={activeStep === 0} onClick={back}>
                <Typography>Back</Typography>
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (activeStep === steps.length - 1) {
                    publish();
                  } else {
                    next();
                  }
                }}
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
