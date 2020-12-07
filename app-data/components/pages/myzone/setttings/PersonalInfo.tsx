import {
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Paper,
  Switch,
  TextField,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { FC, useContext, useState } from 'react';
import { useMutation } from 'react-apollo';
import { Button, Col, Row } from 'reactstrap';
import { H2, H6, P } from '../mojaZona';
import {
  ADD_TO_MARKETING_LIST,
  REMOVE_FROM_MARKETING_LIST,
  UPDATE_CUSTOMER_MUTATION,
} from '../../../../graphql/mutation';
import { CUSTOMER_QUERY } from '../../../../graphql/query';
import { Context } from '../../../../lib/state/Store';

export type ICustomer = {
  email: string;
  tel: string;
  firstName: string;
  lastName: string;
  marketing: boolean;
  companyDTAXNum?: string;
  companyDVATNum?: string;
  companyName?: string;
  companyVatNum?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  state?: string;
  optionalAddress?: string;
  optionalCity?: string;
  optionalPostalCode?: string;
  optionalState?: string;
};

type IPersonalInfo = {
  id: string;
  customer: ICustomer;
  toggle: () => void;
};

const PersonalInfo: FC<IPersonalInfo> = ({ id, customer, toggle }) => {
  const classes = useStyles();
  const [customerData, setCustomerData] = useState(customer);

  const { enqueueSnackbar } = useSnackbar();

  const [addToMarketingList] = useMutation(ADD_TO_MARKETING_LIST, {
    refetchQueries: [{ query: CUSTOMER_QUERY, variables: { id: id } }],
  });
  const [removeFromMarketingList] = useMutation(REMOVE_FROM_MARKETING_LIST, {
    refetchQueries: [{ query: CUSTOMER_QUERY, variables: { id: id } }],
  });
  const [updateCustomer] = useMutation(UPDATE_CUSTOMER_MUTATION, {
    refetchQueries: [{ query: CUSTOMER_QUERY, variables: { id: id } }],
  });

  const handleChangeMarketing = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    setCustomerData({
      ...customerData,
      marketing: checked,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;

    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  const handleSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async () => {
    event.preventDefault();
    try {
      await updateCustomer({
        variables: {
          customerData: {
            ...customerData,
            marketing: !!customerData.marketing,
          },
          id,
        },
      });
      if (customerData.marketing == true) {
        await addToMarketingList({
          variables: {
            marketingListData: {
              email: customerData.email,
              tel: customerData.tel,
              firstName: customerData.firstName,
              lastName: customerData.lastName,
            },
          },
        });
      } else {
        await removeFromMarketingList({
          variables: {
            email: customerData.email,
          },
        });
      }
      enqueueSnackbar(`Udaje boli úspešne zmenené.`, {
        variant: 'success',
      });
    } catch (err) {
      enqueueSnackbar(`Nastala neočakávaná chyba`, {
        variant: 'error',
      });
    }
  };
  return (
    <>
      <H2 className="mb-4">Osobné údaje</H2>
      <Paper elevation={3} style={{ padding: '16px 16px 32px 16px' }}>
        <H6>Kontaktné údaje:</H6>
        <form onSubmit={handleSubmit} className={classes.root}>
          <Row>
            <Col lg={3} md={6} xs={12}>
              <TextField
                disabled
                id="firstName"
                name="firstName"
                label="Meno"
                value={customerData.firstName}
                fullWidth
                variant="outlined"
              />
            </Col>
            <Col lg={3} md={6} xs={12}>
              <TextField
                disabled
                id="lastName"
                name="lastName"
                label="Priezvisko"
                value={customerData.lastName}
                fullWidth
                variant="outlined"
              />
            </Col>
            <Col lg={3} md={6} xs={12}>
              <TextField
                disabled
                id="email"
                name="email"
                label="Email"
                value={customerData.email}
                fullWidth
                variant="outlined"
              />
            </Col>
            <Col lg={3} md={6} xs={12}>
              <TextField
                disabled
                id="tel"
                name="tel"
                label="Telefón"
                value={customerData.tel}
                fullWidth
                variant="outlined"
              />
            </Col>
          </Row>
          <H6>Údaje o firme:</H6>
          <Row>
            <Col lg={3} md={6} xs={12}>
              <TextField
                id="companyName"
                name="companyName"
                label="Názov spoločnosti"
                value={customerData.companyName ? customerData.companyName : ''}
                fullWidth
                onChange={handleChange}
                variant="outlined"
              />
            </Col>
            <Col lg={3} md={6} xs={12}>
              <TextField
                id="ico"
                name="companyVatNum"
                label="IČO"
                value={
                  customerData.companyVatNum ? customerData.companyVatNum : ''
                }
                fullWidth
                onChange={handleChange}
                variant="outlined"
              />
            </Col>
            <Col lg={3} md={6} xs={12}>
              <TextField
                id="dic"
                name="companyDVATNum"
                label="DIČ"
                value={
                  customerData.companyDVATNum ? customerData.companyDVATNum : ''
                }
                fullWidth
                onChange={handleChange}
                variant="outlined"
              />
            </Col>
            <Col lg={3} md={6} xs={12}>
              <TextField
                id="icdph"
                name="companyDTAXNum"
                label="IČ DPH"
                value={
                  customerData.companyDTAXNum ? customerData.companyDTAXNum : ''
                }
                fullWidth
                onChange={handleChange}
                variant="outlined"
              />
            </Col>
          </Row>
          <H6>Fakturačná adresa:</H6>
          <Row>
            <Col lg={3} md={6} xs={12}>
              <TextField
                id="billingAddress"
                name="address"
                label="Adresa"
                value={customerData.address ? customerData.address : ''}
                fullWidth
                onChange={handleChange}
                variant="outlined"
              />
            </Col>
            <Col lg={3} md={6} xs={12}>
              <TextField
                id="billingCity"
                name="city"
                label="Mesto"
                value={customerData.city ? customerData.city : ''}
                fullWidth
                onChange={handleChange}
                variant="outlined"
              />
            </Col>
            <Col lg={3} md={6} xs={12}>
              <TextField
                id="billingPostalCode"
                name="postalCode"
                label="PSČ"
                value={customerData.postalCode ? customerData.postalCode : ''}
                fullWidth
                onChange={handleChange}
                variant="outlined"
              />
            </Col>
          </Row>
          <H6>Adresa dodania:</H6>
          <Row>
            <Col lg={3} md={6} xs={12}>
              <TextField
                id="deliveryAddress"
                name="optionalAddress"
                label="Adresa"
                value={
                  customerData.optionalAddress
                    ? customerData.optionalAddress
                    : ''
                }
                fullWidth
                onChange={handleChange}
                variant="outlined"
              />
            </Col>
            <Col lg={3} md={6} xs={12}>
              <TextField
                id="deliveryCity"
                name="optionalCity"
                label="Mesto"
                value={
                  customerData.optionalCity ? customerData.optionalCity : ''
                }
                fullWidth
                onChange={handleChange}
                variant="outlined"
              />
            </Col>
            <Col lg={3} md={6} xs={12}>
              <TextField
                id="deliveryPostalCode"
                name="optionalPostalCode"
                label="PSČ"
                value={
                  customerData.optionalPostalCode
                    ? customerData.optionalPostalCode
                    : ''
                }
                fullWidth
                onChange={handleChange}
                variant="outlined"
              />
            </Col>
          </Row>
          <FormControl
            fullWidth
            component="fieldset"
            style={{ marginTop: '1.5rem' }}
          >
            <FormLabel component="legend">
              Súhlas na spracovanie osobných údajov na reklamné účely
            </FormLabel>
            <FormControlLabel
              control={
                <Switch
                  checked={!!customerData.marketing}
                  onChange={handleChangeMarketing}
                  name="marketing"
                  color="primary"
                />
              }
              label={customerData.marketing ? 'Súhlasím' : 'Nesúhlasím'}
            />
          </FormControl>
          <Button type="submit" className="mt-2" color="primary">
            Uložiť
          </Button>
        </form>
        <H6 className="mt-4">Zrušenie účtu:</H6>
        <Button style={{ background: 'red', border: 'none' }} onClick={toggle}>
          Zrušiť účet
        </Button>
      </Paper>
    </>
  );
};

export default PersonalInfo;

const useStyles = makeStyles({
  root: {
    '& .MuiTextField-root': {
      margin: '.25rem',
      marginBottom: '.75rem',
    },
  },
});
