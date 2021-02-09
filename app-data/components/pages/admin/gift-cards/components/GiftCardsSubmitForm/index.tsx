/* eslint-disable no-underscore-dangle */
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  Button,
  createStyles,
  FormControl,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { Form } from 'reactstrap';
import styled from 'styled-components';
import { GiftCardType } from '../..';
import { CREATE_GIFTCARD_MUTATION } from '../../../../../../graphql/mutation';
import { GIFTCARDS_QUERY } from '../../../../../../graphql/query';
import { bytesToSize } from '../../../../../../shared/helpers/formatters';
import toBase64 from '../../../../../../shared/helpers/toBase64';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      display: 'none',
    },
    fieldRow: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
  })
);

const GiftCardSubmitForm = (): JSX.Element => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [giftCardFormData, setGiftCardFormData] = useState<GiftCardType>({
    title: '',
    image: {},
  });
  const [createGiftCard] = useMutation(CREATE_GIFTCARD_MUTATION, {
    refetchQueries: [{ query: GIFTCARDS_QUERY }],
  });

  const handleSubmitGiftCardData: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();

    try {
      await createGiftCard({
        variables: { giftCardInput: giftCardFormData },
      });
      enqueueSnackbar('Darčeková poukážka bola úspešne vytvorená', {
        variant: 'success',
      });
    } catch (err) {
      console.log(err);
      enqueueSnackbar('Nastala neočakávaná chyba', {
        variant: 'error',
      });
    }
  };

  const handleAddImageData: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void> = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;
    let i = 0;

    const b64 = await toBase64(files[i]);
    const imgData = {
      ext: files[i].type.replace('image/', ''),
      size: bytesToSize(files[i].size),
      title: files[i].name.split('.')[files[i].name.split('.').length - 2],
      base64: b64,
    };

    setGiftCardFormData({
      ...giftCardFormData,
      image: imgData,
    });
  };

  return (
    <Form onSubmit={(e) => handleSubmitGiftCardData(e)}>
      <TextField
        variant="outlined"
        label="Názov darčekovej poukážky"
        fullWidth
        required
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setGiftCardFormData({
            ...giftCardFormData,
            title: event.currentTarget.value as string,
          });
        }}
        className="mb-4"
      />
      <div className="d-flex align-items-center">
        <p style={{ fontWeight: 'bold' }}>Vložiť obrázok:</p>
        <FormControl>
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            onChange={handleAddImageData}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </FormControl>
      </div>
      {giftCardFormData.image && (
        <FormControl className={classes.fieldRow}>
          <img
            src={giftCardFormData.image.path || giftCardFormData.image.base64}
            style={{ maxWidth: 200 }}
          />
        </FormControl>
      )}
      <Button variant="contained" color="primary" type="submit">
        Pridať
      </Button>
    </Form>
  );
};

export default GiftCardSubmitForm;
