import React, { useState } from 'react';
import { Col, Collapse } from 'reactstrap';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import styled from 'styled-components';
import { Button, colors } from '../../../../../../../../shared/design';
import { ChevronDown } from '@styled-icons/boxicons-regular';
import ErrorMessage from '../../../../../../../../shared/components/ErrorMessage';
import { makeStyles } from '@material-ui/core';

const Tab = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${colors.primary};
  padding: 1rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
`;

const P = styled.p`
  text-transform: uppercase;
  color: white;
  font-size: 1.05rem;
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
  const [errorMessage, setErrorMessage] = useState('');
  const [coupon, setCoupon] = useState('');
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleChange = (event) => {
    setCoupon(event.target.value);
  };

  const handleSubmitCoupon: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();
    try {
      console.log('kupon');
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
            value={coupon}
            fullWidth
            onChange={handleChange}
          />
          <Button style={{ marginTop: '.5rem' }} type="submit">
            Použiť
          </Button>

          <ErrorMessage message={errorMessage} open={isError} />
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
