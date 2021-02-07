import React, { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';
import { Button } from '../../design';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useSnackbar } from 'notistack';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const Wrapper = styled.div`
  width: 100%;
`;

const Holder = styled.div`
  display: flex;
  max-width: 500px;
  margin: 0 auto;
`;

const Heading = styled.h5`
  text-align: center;
  padding: 16px;
  margin-top: 16px;
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
            <Heading>
              Prihláste sa do kúpeľneho newslettera, kde môžete získať najnovšie
              informácie o našich produktoch, službách a výhodách, ktoré Vám
              ponúkame.
            </Heading>
            <ValidatorForm onSubmit={handleSubmitNewsLetter}>
              <Holder>
                <div className="w-100">
                  <TextValidator
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
                <Button
                  disabled={disabled}
                  style={{ maxHeight: '55px' }}
                  type="submit"
                >
                  Odoberať
                </Button>
              </Holder>
            </ValidatorForm>
          </Wrapper>
        </Col>
      </Row>
    </Container>
  );
};
