import React, { useContext, useState } from 'react';
import { Col, Collapse } from 'reactstrap';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import styled from 'styled-components';
import { Button, colors } from '../../../../../../../../shared/design';
import { ChevronDown } from '@styled-icons/boxicons-regular';
import ErrorMessage from '../../../../../../../../shared/components/ErrorMessage';
import { makeStyles } from '@material-ui/core';
import { useMutation } from 'react-apollo';
import { VALIDATE_DISCOUNT_MUTATION } from '../../../../../../../../graphql/mutation';
import { Context } from '../../../../../../../../lib/state/Store';
import { scrollBottom } from '../../../../../../../../shared/helpers/scrollBottom';

const Tab = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${colors.primary};
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  &:hover {
    background-color: ${colors.primaryHover};
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  }
`;

const P = styled.p`
  text-transform: uppercase;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
`;

const Span = styled.span`
  font-size: 0.9rem;
  font-style: italic;
  text-transform: none;
`;
type ArrowProps = {
  isOpen: boolean;
};

const Arrow = styled(ChevronDown)<ArrowProps>`
  width: 32px;
  color: ${colors.inverse};
  transform: ${(props) => (props.isOpen ? 'rotate(0deg)' : 'rotate(-90deg)')};
  transition: all 0.3s ease-out;
`;

const Coupon = (): JSX.Element => {
  const {
    state: { loyalityProduct, coupon },
    dispatch,
  } = useContext(Context);
  const [errorMessage, setErrorMessage] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [validateCoupon] = useMutation(VALIDATE_DISCOUNT_MUTATION);

  const toggle = () => setIsOpen(!isOpen);

  const handleChange = (event) => {
    setCouponCode(event.target.value);
  };

  const handleSubmitCoupon: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();
    try {
      if (loyalityProduct) {
        setIsError(true);
        setErrorMessage('Nie je možné kombinovať zľavy');
        return;
      }
      const {
        data: { validateDiscount },
      } = await validateCoupon({ variables: { code: couponCode } });
      console.log(validateDiscount);
      dispatch({
        type: 'ADD_COUPON',
        payload: { code: validateDiscount.code, value: validateDiscount.value },
      });
      scrollBottom();
      setIsError(false);
    } catch (err) {
      setIsError(true);
      setErrorMessage('Neplatný kupón');
    }
  };

  return (
    <Col md={6} className="mb-4">
      <Tab onClick={toggle}>
        <P>
          Máte zľavový kupón?<Span> Použiť</Span>
        </P>
        <Arrow isOpen={isOpen} />
      </Tab>
      <Collapse isOpen={isOpen}>
        <ValidatorForm onSubmit={handleSubmitCoupon} className={classes.root}>
          <TextValidator
            label="Kód zľavového kupónu"
            variant="outlined"
            type="text"
            name="coupon"
            value={couponCode}
            fullWidth
            onChange={handleChange}
          />
          <ErrorMessage message={errorMessage} open={isError} />
          <Button style={{ marginTop: '.5rem' }} type="submit">
            Použiť
          </Button>
        </ValidatorForm>
      </Collapse>
    </Col>
  );
};

export default Coupon;

const useStyles = makeStyles({
  root: {
    marginTop: '1.5rem',
    '& .MuiFormControl-root': {
      marginBottom: '1rem',
    },
  },
});
