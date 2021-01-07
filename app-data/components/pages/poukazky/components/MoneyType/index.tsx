import React, { useState, FC, ChangeEvent } from 'react';
import { H3, H5, InputHolder } from '../../styles/index';
import { InputAdornment, TextField } from '@material-ui/core';
import { TextFieldButton } from '../../../../../shared/design';
import { IGiftCardData } from '../Stepper';
import { useSnackbar } from 'notistack';

type IMoneyType = {
  setFormData: React.Dispatch<React.SetStateAction<IGiftCardData>>;
  formData: IGiftCardData;
};

const MoneyType: FC<IMoneyType> = ({ formData, setFormData }) => {
  const [value, setValue] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue(+event.currentTarget.value);
  };

  const setData = () => {
    if (value < 20) {
      return enqueueSnackbar(`Minimálna hodnota je 20 €`, {
        variant: 'error',
      });
    }
    setFormData({
      ...formData,
      priceValue: formData.priceValue + value,
      totalPrice: formData.totalPrice + value,
    });
    enqueueSnackbar(`Pridaná suma: ${value} €`, {
      variant: 'success',
    });
  };

  return (
    <>
      <InputHolder style={{ marginTop: '48px' }}>
        <TextField
          onChange={handleChange}
          type="number"
          variant="outlined"
          fullWidth
          label="Zadajte sumu"
          InputProps={{
            endAdornment: <InputAdornment position="end">€</InputAdornment>,
          }}
        />
        <TextFieldButton onClick={setData}>Pridať</TextFieldButton>
      </InputHolder>
    </>
  );
};

export default MoneyType;
