import React, { useState, useEffect } from 'react';
import {
  TextValidator,
  ValidatorForm,
  SelectValidator,
} from 'react-material-ui-form-validator';
import { Col, Row, Collapse } from 'reactstrap';
import { ButtonsHolder, H4 } from '../../../../../../styles/cart.style';
import SummaryPrice from '../../../SummaryPrice';
import { Button } from '../../../../../../../../../../shared/design';
import {
  FormControlLabel,
  Checkbox,
  makeStyles,
  MenuItem,
} from '@material-ui/core';
import { countryData } from '../../../../../../../../../../shared/helpers/countryData';
import CartSummary from '../CartSummary';
import { useMutation } from '@apollo/react-hooks';
import {
  ADD_TO_MARKETING_LIST,
  REGISTER_CUSTOMER_MUTATION,
  UPDATE_CUSTOMER_MUTATION,
} from '../../../../../../../../../../graphql/mutation';
import ErrorMessage from '../../../../../../../../../../shared/components/ErrorMessage';
import { Customer } from '../../../../../../../../../../shared/types/Store.types';

interface IData {
  firstName: string;
  lastName: string;
  companyName: string;
  companyVatNum: string;
  companyDVATNum: string;
  companyDTAXNum: string;
  address: string;
  postalCode: string;
  city: string;
  state: string;
  optionalAddress: string;
  optionalPostalCode: string;
  optionalCity: string;
  optionalState: string;
  phone: string;
  email: string;
  message: string;
  deliveryMethode: string;
  deliveryPrice: number;
  paymentMethode: string;
  paymentPrice: number;
  totalPrice: number;
  products: string[];
}
interface IProps {
  data?: IData;
  handleData?: (data: IData) => void;
  handleSubmitForm: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handlePrevStep: () => void;
  registerInfo: {
    registerRequest: boolean;
    password: string;
    repeatPassword: string;
    subscribe: boolean;
    marketing: boolean;
  };
  setRegisterInfo: any;
  customer: Customer;
}

const BillingInfo: (props: IProps) => JSX.Element = (props) => {
  const {
    data,
    handleData,
    handleSubmitForm,
    handlePrevStep,
    registerInfo,
    setRegisterInfo,
    customer,
  } = props;
  const [isOpen, setIsOpen] = useState(!!data.companyName);
  const [isOpenAdress, setIsOpenAdress] = useState(!!data.optionalAddress);
  const [isRegisterRequest, setIsRegisterRequest] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const classes = useStyles();

  const [registerUserMutate] = useMutation(REGISTER_CUSTOMER_MUTATION);
  const [addToMarketingList] = useMutation(ADD_TO_MARKETING_LIST);
  const [updateCustomer] = useMutation(UPDATE_CUSTOMER_MUTATION);
  const toggleAdress = () => setIsOpenAdress(!isOpenAdress);

  const handleToggleCompany = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    if (checked) {
      setIsOpen(true);
      return;
    }
    setIsOpen(false);
    handleData({
      ...data,
      companyDTAXNum: '',
      companyDVATNum: '',
      companyName: '',
      companyVatNum: '',
    });
  };

  useEffect(() => {
    if (isRegisterRequest) {
      ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
        if (value !== registerInfo.password) {
          return false;
        }
        return true;
      });
      ValidatorForm.addValidationRule('isPasswordRequired', (value) => {
        if (value.length < 1) return false;
        return true;
      });
    }
  }, [isRegisterRequest, registerInfo]);

  const handleToggleRegisterRequest = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    if (checked) {
      setIsRegisterRequest(true);
      setRegisterInfo({ ...registerInfo, registerRequest: true });

      return;
    }
    setIsRegisterRequest(false);
    setRegisterInfo({ ...registerInfo, registerRequest: false });
    ValidatorForm.removeValidationRule('isPasswordMatch');
    ValidatorForm.removeValidationRule('isPasswordRequired');
  };

  const handleToggleOptionalAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    if (checked) {
      setIsOpenAdress(true);
      return;
    }
    setIsOpenAdress(false);
    handleData({
      ...data,
      optionalAddress: '',
      optionalCity: '',
      optionalPostalCode: '',
      optionalState: '',
    });
  };

  useEffect(() => {
    setIsOpen(!!data.companyName);
    setIsOpenAdress(!!data.optionalAddress);
  }, [data.companyName, data.optionalAddress]);

  const handleSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();
    if (registerInfo.registerRequest) {
      try {
        const user = await registerUserMutate({
          variables: {
            customerData: {
              email: data.email,
              tel: data.phone,
              firstName: data.firstName,
              lastName: data.lastName,
              password: registerInfo.password,
            },
          },
        });
        if (registerInfo.subscribe) {
          await fetch('/subscribe', {
            body: JSON.stringify({
              email: data.email,
              fname: data.firstName,
              lname: data.lastName,
              tel: data.phone,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });
        }
        if (registerInfo.marketing) {
          const response = await addToMarketingList({
            variables: {
              marketingListData: {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                tel: data.phone,
              },
            },
          });
        }
        updateCustomer({
          variables: {
            customerData: {
              _id: user.data.createCustomer._id,
              firstName: data.firstName,
              lastName: data.lastName,
              companyName: data.companyName,
              companyVatNum: data.companyVatNum,
              companyDVATNum: data.companyDVATNum,
              companyDTAXNum: data.companyDTAXNum,
              address: data.address,
              postalCode: data.postalCode,
              city: data.city,
              state: data.state,
              optionalAddress: data.optionalAddress,
              optionalPostalCode: data.optionalPostalCode,
              optionalCity: data.optionalCity,
              optionalState: data.optionalState,
              tel: data.phone,
              email: data.email,
            },
            id: user.data.createCustomer._id,
          },
        });
        handleSubmitForm(event);
      } catch (err) {
        setIsError(true);
        setErrorMessage('Používateľ už existuje!');
      }
    } else {
      if (customer.token) {
        await updateCustomer({
          variables: {
            customerData: {
              _id: customer.userId,
              companyName: data.companyName,
              companyVatNum: data.companyVatNum,
              companyDVATNum: data.companyDVATNum,
              companyDTAXNum: data.companyDTAXNum,
              address: data.address,
              postalCode: data.postalCode,
              city: data.city,
              state: data.state,
              optionalAddress: data.optionalAddress,
              optionalPostalCode: data.optionalPostalCode,
              optionalCity: data.optionalCity,
              optionalState: data.optionalState,
            },
            id: customer.userId,
          },
        });
      }
      handleSubmitForm(event);
    }

    //handleSubmitForm(event);
  };

  const {
    address,
    city,
    firstName,
    companyName,
    lastName,
    postalCode,
    companyVatNum,
    companyDVATNum,
    companyDTAXNum,
    optionalAddress,
    optionalPostalCode,
    optionalCity,
    optionalState,
    phone,
    state,
    email,
    message,
  } = data;

  return (
    <ValidatorForm onSubmit={handleSubmit} className={classes.root}>
      <Row>
        <Col md={6}>
          <Row>
            <Col xs={12}>
              <H4 className="mb-4">Fakturačné údaje</H4>
            </Col>
            <Col md={6}>
              <TextValidator
                label="Meno*"
                variant="outlined"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const firstName = event.currentTarget.value;

                  handleData({
                    ...data,
                    firstName,
                  });
                }}
                name="firstName"
                value={firstName || ''}
                validators={['required']}
                errorMessages={['Povinné pole']}
                fullWidth
              />
            </Col>
            <Col md={6}>
              <TextValidator
                label="Priezvisko*"
                variant="outlined"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const lastName = event.currentTarget.value;

                  handleData({
                    ...data,
                    lastName,
                  });
                }}
                name="lName"
                value={lastName || ''}
                validators={['required']}
                errorMessages={['Povinné pole']}
                fullWidth
              />
            </Col>
            <Col md={6}>
              <TextValidator
                label="Telefón*"
                variant="outlined"
                type="tel"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const phone = event.currentTarget.value;

                  handleData({
                    ...data,
                    phone,
                  });
                }}
                name="phone"
                value={phone}
                validators={['required']}
                errorMessages={['Povinné pole']}
                fullWidth
              />
            </Col>
            <Col md={6}>
              <TextValidator
                label="Email*"
                variant="outlined"
                type="email"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const email = event.currentTarget.value;

                  handleData({
                    ...data,
                    email,
                  });
                }}
                name="email"
                value={email}
                validators={['required', 'matchRegexp:^.{1,}@[^.]{1,}']}
                errorMessages={['Povinné pole', 'Neplatná emailová adresa']}
                fullWidth
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <TextValidator
                label="Adresa*"
                variant="outlined"
                name="address"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const address = event.currentTarget.value;

                  handleData({
                    ...data,
                    address,
                  });
                }}
                value={address || ''}
                validators={['required']}
                errorMessages={['Povinné pole']}
                fullWidth
              />
            </Col>
            <Col md={6}>
              <TextValidator
                label="PSČ*"
                variant="outlined"
                name="postalCode"
                id="postalCode"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const postalCode = event.currentTarget.value;

                  handleData({
                    ...data,
                    postalCode,
                  });
                }}
                value={postalCode || ''}
                validators={['required', 'matchRegexp:^\\d{5}$']}
                errorMessages={['Povinné pole', 'Nesprávny formát PSČ']}
                fullWidth
              />
            </Col>
            <Col md={6}>
              <TextValidator
                label="Mesto*"
                variant="outlined"
                name="city"
                id="city"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const city = event.currentTarget.value;

                  handleData({
                    ...data,
                    city,
                  });
                }}
                value={city || ''}
                validators={['required']}
                errorMessages={['Povinné pole']}
                fullWidth
              />
            </Col>
            <Col md={6}>
              <SelectValidator
                label="Zvoľte štát*"
                variant="outlined"
                name="state"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const country = event.target.value;

                  handleData({
                    ...data,
                    state: country,
                  });
                }}
                value={state || ''}
                validators={['required']}
                errorMessages={['Povinné pole']}
                fullWidth
                SelectProps={{ MenuProps: { disableScrollLock: true } }}
              >
                {countryData.map((item) => (
                  <MenuItem value={item.code} key={item.code}>
                    {item.name}
                  </MenuItem>
                ))}
              </SelectValidator>
            </Col>
            <Col xs={12}>
              <TextValidator
                multiline
                name="message"
                label="Správa"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const message = event.currentTarget.value;

                  handleData({
                    ...data,
                    message,
                  });
                }}
                value={message || ''}
                variant="outlined"
                fullWidth
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isOpen}
                    onChange={handleToggleCompany}
                    name="isCompany"
                    color="primary"
                  />
                }
                label="Som podnikateľ (PO, SZČO)"
              />
            </Col>
          </Row>
          <Collapse isOpen={isOpen} className="w-100">
            <Row>
              <Col md={6}>
                <TextValidator
                  label="Názov spoločnosti"
                  variant="outlined"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const companyName = event.currentTarget.value;

                    handleData({
                      ...data,
                      companyName,
                    });
                  }}
                  name="companyName"
                  value={companyName}
                  fullWidth
                />
              </Col>
              <Col md={6}>
                <TextValidator
                  label="IČO"
                  variant="outlined"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const companyVatNum = event.currentTarget.value;

                    handleData({
                      ...data,
                      companyVatNum,
                    });
                  }}
                  name="companyVatNum"
                  value={companyVatNum}
                  validators={['matchRegexp:^\\d{8}$']}
                  errorMessages={['Nesprávny formát IČO']}
                  fullWidth
                />
              </Col>
              <Col md={6}>
                <TextValidator
                  label="DIČ"
                  variant="outlined"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const companyDVATNum = event.currentTarget.value;

                    handleData({
                      ...data,
                      companyDVATNum,
                    });
                  }}
                  name="companyDVATNum"
                  value={companyDVATNum}
                  validators={['matchRegexp:^\\d{10}$']}
                  errorMessages={['Nesprávny formát DIČ']}
                  fullWidth
                />
              </Col>
              <Col md={6}>
                <TextValidator
                  label="IČ DPH"
                  variant="outlined"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const companyDTAXNum = event.currentTarget.value;

                    handleData({
                      ...data,
                      companyDTAXNum,
                    });
                  }}
                  name="companyDTAXNum"
                  value={companyDTAXNum}
                  validators={['matchRegexp:^(SK){0,1}[0-9]{10}$']}
                  errorMessages={['Nesprávny formát IČ DPH']}
                  fullWidth
                />
              </Col>
            </Row>
          </Collapse>
          <Row>
            <Col xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isOpenAdress}
                    onChange={handleToggleOptionalAddress}
                    name="isDeliveryAddress"
                    color="primary"
                  />
                }
                label="Dodacia adresa je iná ako fakturačná"
              />
            </Col>
          </Row>
          <Collapse isOpen={isOpenAdress}>
            <Row>
              <Col md={6}>
                <TextValidator
                  label="Adresa dodania*"
                  variant="outlined"
                  name="address"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const optionalAddress = event.currentTarget.value;

                    handleData({
                      ...data,
                      optionalAddress,
                    });
                  }}
                  value={optionalAddress || ''}
                  fullWidth
                />
              </Col>
              <Col md={6}>
                <TextValidator
                  label="PSČ"
                  variant="outlined"
                  name="postalCode"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const optionalPostalCode = event.currentTarget.value;

                    handleData({
                      ...data,
                      optionalPostalCode,
                    });
                  }}
                  value={optionalPostalCode || ''}
                  validators={['matchRegexp:^\\d{5}$']}
                  errorMessages={['Nesprávny formát PSČ']}
                  fullWidth
                />
              </Col>
              <Col md={6}>
                <TextValidator
                  label="Mesto"
                  variant="outlined"
                  name="city"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const optionalCity = event.currentTarget.value;

                    handleData({
                      ...data,
                      optionalCity,
                    });
                  }}
                  value={optionalCity || ''}
                  fullWidth
                />
              </Col>
              <Col md={6}>
                <SelectValidator
                  label="Zvoľte štát*"
                  variant="outlined"
                  name="state"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const optionalState = event.target.value;

                    handleData({
                      ...data,
                      optionalState,
                    });
                  }}
                  value={optionalState || ''}
                  fullWidth
                  SelectProps={{ MenuProps: { disableScrollLock: true } }}
                >
                  {countryData.map((item) => (
                    <MenuItem value={item.code} key={item.code}>
                      {item.name}
                    </MenuItem>
                  ))}
                </SelectValidator>
              </Col>
            </Row>
          </Collapse>
          {!customer.token && (
            <Row>
              <Col xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isRegisterRequest}
                      onChange={handleToggleRegisterRequest}
                      name="isRegisterRequest"
                      color="primary"
                    />
                  }
                  label="Chcem sa zaregistrovať"
                />
              </Col>
            </Row>
          )}
          <Collapse isOpen={isRegisterRequest}>
            <Row className="mt-2">
              <Col md={6}>
                <TextValidator
                  label="Heslo*"
                  variant="outlined"
                  name="password"
                  type="password"
                  validators={isRegisterRequest ? ['isPasswordRequired'] : []}
                  errorMessages={['Povinné pole']}
                  inputProps={{
                    autoComplete: 'new-password',
                    form: {
                      autoComplete: 'off',
                    },
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const password = event.currentTarget.value;

                    setRegisterInfo({
                      ...registerInfo,
                      password,
                    });
                  }}
                  value={registerInfo.password || ''}
                  fullWidth
                />
              </Col>
              <Col md={6}>
                <TextValidator
                  label="Zopakovať Heslo*"
                  variant="outlined"
                  name="repeatPassword"
                  type="password"
                  inputProps={{
                    autoComplete: 'new-password',
                    form: {
                      autoComplete: 'off',
                    },
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const password = event.currentTarget.value;

                    setRegisterInfo({
                      ...registerInfo,
                      repeatPassword: password,
                    });
                  }}
                  validators={isRegisterRequest ? ['isPasswordMatch'] : []}
                  errorMessages={['Hesla sa nezhodujú']}
                  value={registerInfo.repeatPassword || ''}
                  fullWidth
                />
              </Col>
              <Col xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={registerInfo.subscribe}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const checked = event.currentTarget.checked;

                        setRegisterInfo({
                          ...registerInfo,
                          subscribe: checked,
                        });
                      }}
                      name="subscribe"
                      color="primary"
                    />
                  }
                  label="Súhlasím so zasielaním noviniek"
                />
              </Col>
              <Col xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={registerInfo.marketing}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const checked = event.currentTarget.checked;

                        setRegisterInfo({
                          ...registerInfo,
                          marketing: checked,
                        });
                      }}
                      name="subscribe"
                      color="primary"
                    />
                  }
                  label="Súhlasím s používaním emailu na marketingové účely"
                />
              </Col>
            </Row>
          </Collapse>
          <ErrorMessage message={errorMessage} open={isError} />
        </Col>
        <Col md={6}>
          <CartSummary data={data} handleData={handleData} />
        </Col>
      </Row>
      <SummaryPrice />
      <ButtonsHolder>
        <Button type="button" onClick={handlePrevStep} className="mr-auto">
          Späť
        </Button>
        <Button type="submit" className="ml-auto">
          Objednať teraz
        </Button>
      </ButtonsHolder>
    </ValidatorForm>
  );
};

export default BillingInfo;

const useStyles = makeStyles({
  root: {
    '& .MuiFormControl-root': {
      marginBottom: '1rem',
    },
  },
});
