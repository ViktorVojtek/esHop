/* eslint-disable no-underscore-dangle */
import React, { FC, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Form } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { UPDATE_SUBCATEGORY_MUTATION } from '../../../../../../../graphql/mutation';
import {
  SUBCATEGORIES_QUERY,
  CATEGORIES_QUERY,
} from '../../../../../../../graphql/query';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Theme,
  makeStyles,
  createStyles,
  Checkbox,
  FormControlLabel,
  Button,
} from '@material-ui/core';
import toBase64 from '../../../../../../../shared/helpers/toBase64';
import { bytesToSize } from '../../../../../../../shared/helpers/formatters';
import styled from 'styled-components';
import { SubCategoryType } from '../..';
import { useSnackbar } from 'notistack';

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

const CheckboxWrapper = styled.div`
  display: flex;
`;

const IconHolder = styled.div`
  margin: 8px;
  text-align: right;
`;

type SubCategoryUpdateFormProps = {
  setAction: React.Dispatch<React.SetStateAction<'create' | 'update'>>;
  subCategory: SubCategoryType;
};

const SubCategoryUpdateForm = (
  props: SubCategoryUpdateFormProps
): JSX.Element => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { setAction, subCategory } = props;
  const [subCategoryFormData, setSubCategoryFormData] = useState<
    SubCategoryType
  >({
    categoryId: subCategory.categoryId || '',
    title: subCategory.title || '',
    image: subCategory.image || {},
    forReservation: subCategory.forReservation || false,
    forSale: subCategory.forSale || false,
    forGiftCard: subCategory.forGiftCard || false,
    forGiftBasket: subCategory.forGiftBasket || false,
  });
  const [updateSubCategory] = useMutation(UPDATE_SUBCATEGORY_MUTATION, {
    refetchQueries: [{ query: SUBCATEGORIES_QUERY }],
  });
  const { error, loading, data } = useQuery(CATEGORIES_QUERY);

  if (loading) {
    return <>loading</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  useEffect(() => {
    setSubCategoryFormData({
      categoryId: subCategory.categoryId || '',
      title: subCategory.title || '',
      image: subCategory.image || {},
      forReservation: subCategory.forReservation || false,
      forSale: subCategory.forSale || false,
      forGiftCard: subCategory.forGiftCard || false,
      forGiftBasket: subCategory.forGiftBasket || false,
    });
  }, [subCategory]);
  const handleSubmitSubCategoryData: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();
    console.log(subCategory._id);
    console.log(subCategoryFormData);
    try {
      await updateSubCategory({
        variables: {
          _id: subCategory._id,
          subCategoryInput: subCategoryFormData,
        },
      });
      enqueueSnackbar('Podkategória bola úspešne upravená', {
        variant: 'success',
      });
    } catch (err) {
      console.log(err);
      enqueueSnackbar('Nastala neočakávaná chyba', {
        variant: 'error',
      });
    }
  };

  const { categories } = data;

  const handleChangeCategory = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSubCategoryFormData({
      ...subCategoryFormData,
      categoryId: event.target.value as string,
    });
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

    setSubCategoryFormData({
      ...subCategoryFormData,
      image: imgData,
    });
  };

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubCategoryFormData({
      ...subCategoryFormData,
      [event.target.name]: event.target.checked,
    });
  };

  const handleHideCreateForm = () => setAction(null);

  return (
    <Form onSubmit={(e) => handleSubmitSubCategoryData(e)}>
      <IconHolder>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={handleHideCreateForm}
        >
          <CloseIcon />
        </IconButton>
      </IconHolder>
      <FormControl className="mb-4" fullWidth required variant="outlined">
        <InputLabel id="category">Zvoľte kategóriu</InputLabel>
        <Select
          labelId="category"
          value={subCategoryFormData.categoryId}
          onChange={handleChangeCategory}
          label="Zvoľte kategóriu"
        >
          {categories && categories.length > 0
            ? categories.map(({ _id, title }) => {
                return (
                  <MenuItem key={_id} value={_id}>
                    {title}
                  </MenuItem>
                );
              })
            : null}
        </Select>
      </FormControl>
      <TextField
        variant="outlined"
        label="Názov podkategórie"
        value={subCategoryFormData.title}
        fullWidth
        required
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSubCategoryFormData({
            ...subCategoryFormData,
            title: event.currentTarget.value as string,
          });
        }}
        className="mb-4"
      />
      <CheckboxWrapper>
        <FormControlLabel
          control={
            <Checkbox
              checked={subCategoryFormData.forSale || false}
              onChange={handleCheckbox}
              name="forSale"
              color="primary"
            />
          }
          label="Predaj"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={subCategoryFormData.forReservation || false}
              onChange={handleCheckbox}
              name="forReservation"
              color="primary"
            />
          }
          label="Rezervácia"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={subCategoryFormData.forGiftCard || false}
              onChange={handleCheckbox}
              name="forGiftCard"
              color="primary"
            />
          }
          label="Darčekové poukážky"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={subCategoryFormData.forGiftBasket || false}
              onChange={handleCheckbox}
              name="forGiftBasket"
              color="primary"
            />
          }
          label="Darčekové koše"
        />
      </CheckboxWrapper>
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
      {subCategoryFormData.image && (
        <FormControl className={classes.fieldRow}>
          <img
            src={
              subCategoryFormData.image.path || subCategoryFormData.image.base64
            }
            style={{ maxWidth: 200 }}
          />
        </FormControl>
      )}
      <Button variant="contained" color="primary" type="submit">
        Upraviť
      </Button>
    </Form>
  );
};

export default SubCategoryUpdateForm;
