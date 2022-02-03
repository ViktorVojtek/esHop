import { useMutation } from '@apollo/react-hooks';
import { makeStyles, Paper } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { FC, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Container, Row, Col } from 'reactstrap';
import { SEND_REZERVATION_EMAIL } from '../../../graphql/mutation';
import { Button } from '../../../shared/design';
import {
  Wrapper,
  H1,
  P,
  CustomLinkHolder,
  CustomLink,
  Item,
  PhoneIcon,
  EnvelopeIcon,
  WhatsappIcon,
  ViberIcon,
  ItemP,
} from './style';

interface ITelItem {
  email?: string;
  tel?: string;
  title: string;
  customHref?: string;
}

const ReservationForm: FC = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { service } = router.query;
  const classes = useStyles();
  const [sendRezervationEmail] = useMutation(SEND_REZERVATION_EMAIL);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    service: service ? decodeURI(service as string) : '',
    message: '',
  });

  const handleSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();
    try {
      const response = await sendRezervationEmail({
        variables: { rezervationData: formData },
      });
      enqueueSnackbar('Správa bola úspešné odoslaná', {
        variant: 'success',
      });
    } catch (err) {
      enqueueSnackbar('Odoslanie rezervácie bolo neúspešné.', {
        variant: 'error',
      });
    }
  };

  const ContactItemCol: FC<ITelItem> = ({ email, tel, title, customHref }) => (
    <CustomLinkHolder>
      <ItemP>{email ? 'Email' : title}</ItemP>
      <CustomLink
        href={
          customHref ? customHref : email ? `mailto:${email}` : `tel:${tel}`
        }
      >
        {email ? email : tel}
      </CustomLink>
    </CustomLinkHolder>
  );

  return (
    <Wrapper>
      <Container>
        <Row>
          <H1>Rezervácia služieb</H1>
          <Col md={6}>
            <Row>
              <Col xs={12}>
                <P>
                  Rezervujte si naše pobyty a služby pomocou naších kontaktov
                  alebo využite kontaktný formulár.
                </P>
              </Col>
              <Col md={12} xs={12}>
                <Item elevation={3}>
                  <PhoneIcon />
                  <ContactItemCol
                    tel="+421 914 338 829"
                    title="Infolinka rezervácie"
                  />
                </Item>
              </Col>
              <Col md={12} xs={12}>
                <Item elevation={3}>
                  <EnvelopeIcon />
                  <ContactItemCol
                    email="rezervacie@kupelecks.sk "
                    title="rezervacie@kupelecks.sk "
                  />
                </Item>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <Paper
              elevation={3}
              style={{
                padding: '20px',
                borderRadius: '4px',
                marginBottom: '16px',
              }}
            >
              <ValidatorForm onSubmit={handleSubmit} className={classes.root}>
                <Row>
                  <Col md={6}>
                    <TextValidator
                      label="Meno*"
                      variant="outlined"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const firstName = event.currentTarget.value;

                        setFormData({
                          ...formData,
                          firstName,
                        });
                      }}
                      name="firstName"
                      value={formData.firstName || ''}
                      validators={['required']}
                      errorMessages={['Povinné pole']}
                      fullWidth
                    />
                  </Col>
                  <Col md={6}>
                    <TextValidator
                      label="Priezvisko*"
                      variant="outlined"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const lastName = event.currentTarget.value;

                        setFormData({
                          ...formData,
                          lastName,
                        });
                      }}
                      name="lastName"
                      value={formData.lastName || ''}
                      validators={['required']}
                      errorMessages={['Povinné pole']}
                      fullWidth
                    />
                  </Col>
                  <Col md={12}>
                    <TextValidator
                      label="Email*"
                      variant="outlined"
                      type="email"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const email = event.currentTarget.value;

                        setFormData({
                          ...formData,
                          email,
                        });
                      }}
                      name="email"
                      value={formData.email}
                      validators={['required', 'matchRegexp:^.{1,}@[^.]{1,}']}
                      errorMessages={[
                        'Povinné pole',
                        'Neplatná emailová adresa',
                      ]}
                      fullWidth
                    />
                  </Col>
                  <Col md={12}>
                    <TextValidator
                      label="Mám záujem o*"
                      variant="outlined"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const service = event.currentTarget.value;

                        setFormData({
                          ...formData,
                          service,
                        });
                      }}
                      name="service"
                      value={formData.service || ''}
                      validators={['required']}
                      errorMessages={['Povinné pole']}
                      fullWidth
                    />
                  </Col>
                  <Col xs={12}>
                    <TextValidator
                      multiline
                      name="message"
                      label="Správa"
                      rows={4}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const message = event.currentTarget.value;

                        setFormData({
                          ...formData,
                          message,
                        });
                      }}
                      value={formData.message || ''}
                      variant="outlined"
                      fullWidth
                    />
                  </Col>
                </Row>
                <Button style={{ marginLeft: 'auto' }}>
                  Odoslať rezerváciu
                </Button>
              </ValidatorForm>
            </Paper>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default ReservationForm;

const useStyles = makeStyles({
  root: {
    '& .MuiFormControl-root': {
      marginBottom: '1rem',
    },
  },
});
