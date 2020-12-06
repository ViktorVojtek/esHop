import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Switch,
  TextField,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { FC, useState } from 'react';
import { useMutation } from 'react-apollo';
import { Button, Col, Row } from 'reactstrap';
import { H2, H6, P } from '../mojaZona';
import {
  ADD_TO_MARKETING_LIST,
  REMOVE_FROM_MARKETING_LIST,
  UPDATE_CUSTOMER_MUTATION,
} from '../../../../graphql/mutation';
import { CUSTOMER_QUERY } from '../../../../graphql/query';

export type ICustomer = {
  email: string;
  tel: string;
  firstName: string;
  lastName: string;
  marketing: boolean;
  company?: {
    ico?: string;
    dic?: string;
    icdph?: string;
  };
  billingAddress?: {
    address?: string;
    city?: string;
    postalCode?: string;
    state?: string;
  };
  deliveryAddress?: {
    address?: string;
    city?: string;
    postalCode?: string;
    state?: string;
  };
};

type IPersonalInfo = {
  id: string;
  customer: ICustomer;
  toggle: () => void;
};

const PersonalInfo: FC<IPersonalInfo> = ({ id, customer, toggle }) => {
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

  const handleRemoveFromMarketing: () => Promise<void> = async () => {
    try {
      await removeFromMarketingList({
        variables: {
          email: customer.email,
        },
      });
      enqueueSnackbar(`Odstránenie prebehlo úspešne`, {
        variant: 'success',
      });
    } catch (err) {
      enqueueSnackbar(`Nastala neočakávaná chyba`, {
        variant: 'error',
      });
    }
  };

  const handleAddToMarketing: () => Promise<void> = async () => {
    try {
      await addToMarketingList({
        variables: {
          marketingListData: {
            email: customer.email,
            tel: customer.tel,
            firstName: customer.firstName,
            lastName: customer.lastName,
          },
        },
      });
      enqueueSnackbar(`Súhlas prebehol úspešne.`, {
        variant: 'success',
      });
    } catch (err) {
      enqueueSnackbar(`Nastala neočakávaná chyba`, {
        variant: 'error',
      });
    }
  };

  /*const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    if (!checked) {
      return handleRemoveFromMarketing();
    }
    handleAddToMarketing();
  };*/

  const handleChangeMarketing = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    setCustomerData({
      ...customerData,
      marketing: checked,
    });
  };

  const handleChangeCompany = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;

    setCustomerData({
      ...customerData,
      company: {
        ...customerData.company,
        [name]: value,
      },
    });
  };

  const handleChangeBillingAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const name = event.target.name;

    setCustomerData({
      ...customerData,
      billingAddress: {
        ...customerData.billingAddress,
        [name]: value,
      },
    });
  };

  const handleChangeDeliveryAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const name = event.target.name;

    setCustomerData({
      ...customerData,
      deliveryAddress: {
        ...customerData.deliveryAddress,
        [name]: value,
      },
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

  console.log(customerData);
  return (
    <>
      <H2 className="mb-4">Osobné údaje</H2>
      <Paper elevation={3} style={{ padding: '16px 16px 32px 16px' }}>
        <H6>Kontaktné údaje:</H6>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} xs={12}>
              <TextField
                disabled
                id="firstName"
                name="firstName"
                label="Meno"
                value={customerData.firstName}
                style={{ marginBottom: '.5rem' }}
                fullWidth
              />
            </Col>
            <Col md={6} xs={12}>
              <TextField
                disabled
                id="lastName"
                name="lastName"
                label="Meno"
                value={customerData.lastName}
                style={{ marginBottom: '.5rem' }}
                fullWidth
              />
            </Col>
            <Col md={6} xs={12}>
              <TextField
                disabled
                id="email"
                name="email"
                label="Email"
                value={customerData.email}
                style={{ marginBottom: '.5rem' }}
                fullWidth
              />
            </Col>
            <Col md={6} xs={12}>
              <TextField
                disabled
                id="tel"
                name="tel"
                label="Telefón"
                value={customerData.tel}
                style={{ marginBottom: '.5rem' }}
                fullWidth
              />
            </Col>
          </Row>
          <H6>Údaje o firme:</H6>
          <Row>
            <Col md={6} xs={12}>
              <TextField
                id="ico"
                name="ico"
                label="IČO"
                value={customerData.company.ico}
                style={{ marginBottom: '.5rem' }}
                fullWidth
                onChange={handleChangeCompany}
              />
            </Col>
            <Col md={6} xs={12}>
              <TextField
                id="dic"
                name="dic"
                label="DIČ"
                value={customerData.company.dic}
                style={{ marginBottom: '.5rem' }}
                fullWidth
                onChange={handleChangeCompany}
              />
            </Col>
            <Col md={6} xs={12}>
              <TextField
                id="icdph"
                name="icdph"
                label="IČ DPH"
                value={customerData.company.icdph}
                style={{ marginBottom: '.5rem' }}
                fullWidth
                onChange={handleChangeCompany}
              />
            </Col>
          </Row>
          <H6>Fakturačná adresa:</H6>
          <Row>
            <Col md={6} xs={12}>
              <TextField
                id="billingAddress"
                name="address"
                label="Adresa"
                value={
                  customerData.billingAddress.address
                    ? customerData.billingAddress.address
                    : ''
                }
                style={{ marginBottom: '.5rem' }}
                fullWidth
                onChange={handleChangeBillingAddress}
              />
            </Col>
            <Col md={6} xs={12}>
              <TextField
                id="billingCity"
                name="city"
                label="Mesto"
                value={
                  customerData.billingAddress.city
                    ? customerData.billingAddress.city
                    : ''
                }
                style={{ marginBottom: '.5rem' }}
                fullWidth
                onChange={handleChangeBillingAddress}
              />
            </Col>
            <Col md={6} xs={12}>
              <TextField
                id="billingPostalCode"
                name="postalCode"
                label="PSČ"
                value={
                  customerData.billingAddress.postalCode
                    ? customerData.billingAddress.postalCode
                    : ''
                }
                style={{ marginBottom: '.5rem' }}
                fullWidth
                onChange={handleChangeBillingAddress}
              />
            </Col>
          </Row>
          <H6>Adresa dodania:</H6>
          <Row>
            <Col md={6} xs={12}>
              <TextField
                id="deliveryAddress"
                name="address"
                label="Adresa"
                value={
                  customerData.deliveryAddress.address
                    ? customerData.deliveryAddress.address
                    : ''
                }
                style={{ marginBottom: '.5rem' }}
                fullWidth
                onChange={handleChangeDeliveryAddress}
              />
            </Col>
            <Col md={6} xs={12}>
              <TextField
                id="deliveryCity"
                name="city"
                label="Mesto"
                value={
                  customerData.deliveryAddress.city
                    ? customerData.deliveryAddress.city
                    : ''
                }
                style={{ marginBottom: '.5rem' }}
                fullWidth
                onChange={handleChangeDeliveryAddress}
              />
            </Col>
            <Col md={6} xs={12}>
              <TextField
                id="deliveryPostalCode"
                name="postalCode"
                label="PSČ"
                value={
                  customerData.deliveryAddress.postalCode
                    ? customerData.deliveryAddress.postalCode
                    : ''
                }
                style={{ marginBottom: '.5rem' }}
                fullWidth
                onChange={handleChangeDeliveryAddress}
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
