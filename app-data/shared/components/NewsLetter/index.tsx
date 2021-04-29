import React, { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';
import { Button, colors } from '../../design';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useSnackbar } from 'notistack';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const Wrapper = styled.div`
  width: 100%;
  background-color: ${colors.primaryLight};
  margin-top: 32px;
  display: flex;
  padding: 32px 48px;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
    padding: 48px 24px;
  }
`;

const StyledButton = styled(Button)`
  color: ${colors.primary};
  background: white;
  box-shadow: none;
  border-left: 1px solid lightgrey;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  transition: all 0.3s ease-out;
  &:hover {
    color: white;
    background-color: ${colors.primary};
  }
`;

const StyledValidatorForm = styled(ValidatorForm)`
  width: 40%;
  @media (max-width: 992px) {
    width: 100%;
    max-width: 500px;
  }
`;

const StyledTextValidator = styled(TextValidator)`
  input {
    background: white;
  }
  fieldset {
    border: white;
  }
  label {
    color: black !important;
  }
`;

const Holder = styled.div`
  display: flex;
  margin: 0 auto;
`;

const Heading = styled.h5`
  color: ${colors.primary};
  font-weight: bold;
  font-size: 2.5rem;
  width: 25%;
  @media (max-width: 992px) {
    width: 100%;
    margin: 0;
  }
`;

const Text = styled.p`
  color: black;
  font-weight: bold;
  width: 25%;
  margin: 0;
  @media (max-width: 992px) {
    width: 100%;
    padding: 32px 0px;
  }
`;
export const NewsLetter = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmitNewsLetter: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();
    if (!executeRecaptcha) {
      return;
    }
    const recaptchaToken = await executeRecaptcha('login');
    try {
      setDisabled(true);
      await fetch('/subscribe', {
        body: JSON.stringify({
          email: email,
          recaptchaToken: recaptchaToken,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      enqueueSnackbar('Boli ste úspešne pridaný do nášho newslettra', {
        variant: 'success',
      });
      setDisabled(false);
    } catch (err) {
      console.log(err);
      enqueueSnackbar('Nastala neočakávaná chyba', {
        variant: 'error',
      });
    }
  };
  return (
    <Container id="newsletter">
      <Row>
        <Col md={12}>
          <Wrapper>
            <Heading>Newsletter</Heading>
            <Text>
              Najnovšie informácie o naších službách a výhodách, ktoré ponúkame.
            </Text>
            <StyledValidatorForm onSubmit={handleSubmitNewsLetter}>
              <Holder>
                <div className="w-100">
                  <StyledTextValidator
                    value={email}
                    validators={['required', 'matchRegexp:^.{1,}@[^.]{1,}']}
                    errorMessages={['Povinné pole', 'Neplatná emailová adresa']}
                    variant="outlined"
                    fullWidth
                    label="Zadajte email"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setEmail(event.currentTarget.value as string);
                    }}
                  />
                </div>
                <StyledButton
                  disabled={disabled}
                  style={{ maxHeight: '55px' }}
                  type="submit"
                >
                  Prihlásiť
                </StyledButton>
              </Holder>
            </StyledValidatorForm>
          </Wrapper>
        </Col>
      </Row>
    </Container>
  );
};
