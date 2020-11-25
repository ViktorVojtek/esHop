import React, { FC, useState } from 'react';
import {
  FormControl,
  Button,
  Input,
  InputLabel,
  Theme,
  IconButton,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { useSnackbar } from 'notistack';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { PhotoCamera } from '@material-ui/icons';
import { CREATE_LOYALITY_PRODUCT_MUTATION } from '../../../../../graphql/mutation';
import { LOYALITY_PRODUCTS_QUERY } from '../../../../../graphql/query';

type ProductDataType = {
  title: string;
  discount: number;
  isDiscount: boolean;
  image: any;
  costPoints: number;
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width: 100%;
`;

const CreateLoyalityProduct: FC = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [isDiscount, setIsDiscount] = useState<boolean>(false);
  const [images, setImages] = useState([]);
  const [createLoyalityProduct] = useMutation(
    CREATE_LOYALITY_PRODUCT_MUTATION,
    {
      refetchQueries: [{ query: LOYALITY_PRODUCTS_QUERY }],
    }
  );

  function handleIsDiscount() {
    setIsDiscount(!isDiscount);
  }

  const handleAddImageData: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void> = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;
    const filesPromises = [];
    const filesObjsArr = [];
    const imagesObjArr = [];
    let i = 0;
    let j = 0;

    while (i < files.length) {
      const promFn = toBase64(files[i]);

      filesObjsArr.push({
        ext: files[i].type.replace('image/', ''),
        size: bytesToSize(files[i].size),
        title: files[i].name.split('.')[files[i].name.split('.').length - 2],
      });
      filesPromises.push(promFn);

      i += 1;
    }

    const base64Files = await Promise.all(filesPromises);

    while (j < filesObjsArr.length) {
      imagesObjArr.push({
        ...filesObjsArr[j],
        base64: base64Files[j],
      });

      j += 1;
    }

    const newImagesArr = images.concat(
      imagesObjArr.filter((item) => images.indexOf(item.base64) < 0)
    );

    setImages(newImagesArr);
  };

  console.log(images);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const form = event.currentTarget;
      const productInput: ProductDataType = {
        title: form.title.value,
        discount: +form.discount.value,
        isDiscount: form.isDiscount.checked,
        image: images,
        costPoints: +form.costPoints.value,
      };
      await createLoyalityProduct({
        variables: { loyalityProductInput: productInput },
      });
      enqueueSnackbar('Produkt bol úspešne vytvorený', {
        variant: 'success',
      });
    } catch (err) {
      enqueueSnackbar(`Nastala chyba: ${err.message}`, {
        variant: 'error',
      });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FormControl>
        <InputLabel htmlFor="title">Názov produktu</InputLabel>
        <Input required id="title" aria-describedby="my-helper-text" />
      </FormControl>
      <FormControl className="mt-2">
        <TextField id="costPoints" label="Počet bodov" type="number" />
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={isDiscount}
            name="isDiscount"
            onChange={handleIsDiscount}
            color="primary"
          />
        }
        label="Zľava z objednávky?"
        className="mt-4"
      />
      <FormControl>
        <TextField
          id="discount"
          disabled={!isDiscount}
          label="Zľava %"
          type="number"
        />
      </FormControl>
      <p className="mt-2">Nahrať obrázok</p>
      <div>
        <input
          accept="image/*"
          id="image"
          type="file"
          className={classes.input}
          name="image"
          onChange={handleAddImageData}
          required
        />
        <label htmlFor="image">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            className={classes.icon}
          >
            <PhotoCamera />
          </IconButton>
        </label>
      </div>
      {images && <PreviewImages images={images} />}
      <Button
        type="submit"
        className="mt-4"
        variant="contained"
        color="primary"
      >
        Vytvoriť
      </Button>
    </Form>
  );
};

export default CreateLoyalityProduct;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
    icon: {
      padding: '0',
    },
  })
);

const PreviewImages = ({ images }) =>
  images.map((image) => {
    return (
      <img
        style={{ maxHeight: '300px' }}
        src={image.base64}
        alt={image.title}
        key={image.title}
      />
    );
  });

function toBase64(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader: FileReader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function bytesToSize(bytes: number): string {
  const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  if (bytes === 0) {
    return '0 Byte';
  }

  const bite: number = 1024;
  const c: number = Math.floor(Math.log(bytes) / Math.log(bite));

  return `${Math.round(bytes / 1024 ** c)} ${sizes[c]}`;
}
