import React, { useEffect, useState } from 'react';
import {
  useStyles,
  DetailWrapper,
  DetailImage,
  DetailTitle,
  DetailText,
  ImageTitleWrapper,
} from './styles';
import dynamic from 'next/dynamic';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Carousel from '@brainhubeu/react-carousel';
import ImagePreview from './components/ImagePreview';
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from 'draft-js';
//import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import {
  ProductImage,
  ProductPrice,
} from '../../../../../../../../shared/types/Product.types';
import { Button, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_PRODUCT_MUTATION } from '../../../../../../../../graphql/mutation';
import { PRODUCTS_QUERY } from '../../../../../../../../graphql/query';

type ProductVariant = {
  description?: string;
  discount?: number;
  itemsInStock?: number;
  images?: ProductImage[];
  inStock?: number;
  title?: string;
  price?: ProductPrice;
  productCode?: string;
  bonus?: string;
};

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor, Editor),
  { ssr: false }
);

const UpdateVariantProductData = (props) => {
  const initialVariantData = {
    title: '',
    description: '',
    inStock: 0,
    images: [],
    discount: 0,
    price: { value: 0, currency: '€' },
    productCode: '',
  };
  const { productData, setProductData, update } = props;
  const { variants } = productData;
  const [updateActual, setUpdateActual] = useState<boolean>(true);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: PRODUCTS_QUERY }],
  });
  const [activeVariant, setActiveVariant] = useState<number>(0);
  const [variantData, setVariantData] = useState<ProductVariant>(
    variants[activeVariant]
      ? {
          title: variants[activeVariant].title
            ? variants[activeVariant].title
            : '',
          description: variants[activeVariant].description
            ? variants[activeVariant].description
            : '',
          inStock: variants[activeVariant].inStock
            ? variants[activeVariant].inStock
            : 0,
          images: variants[activeVariant].images
            ? variants[activeVariant].images
            : [],
          discount: variants[activeVariant].discount
            ? variants[activeVariant].discount
            : 0,
          price: variants[activeVariant].price.value
            ? { value: variants[activeVariant].price.value, currency: '€' }
            : { value: 0, currency: '€' },
          productCode: variants[activeVariant].productCode
            ? variants[activeVariant].productCode
            : '',
        }
      : initialVariantData
  );
  const [images, setImages] = useState(variantData.images);
  const oldDesc = variants[activeVariant]
    ? variants[activeVariant].description
    : '';
  const blocksFromHtml = convertFromHTML(oldDesc);
  const [editorState, setEditorState] = useState(
    variants[activeVariant] &&
      variants[activeVariant].description &&
      updateActual
      ? EditorState.createWithContent(
          ContentState.createFromBlockArray(
            blocksFromHtml.contentBlocks,
            blocksFromHtml.entityMap
          )
        )
      : EditorState.createEmpty()
  );
  //const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    return () => {};
  }, []);

  console.log(variantData);

  const handleCreateProduct = async () => {
    try {
      const {
        _id,
        dateCreated,
        dateModified,
        modifiedByUserId,
        ...restData
      } = productData as any;
      let dataToUpdate = {};
      if (updateActual) {
        console.log('som tu');
        restData.variants[activeVariant] = variantData;
        dataToUpdate = restData;
      }
      if (!updateActual) {
        console.log('druhy update');
        dataToUpdate = {
          ...restData,
          variants: [...variants, variantData],
        };
      }

      console.log(dataToUpdate);

      await updateProduct({
        variables: { _id, productInput: dataToUpdate },
      });
      enqueueSnackbar('Produkt bol úspešne upravený', {
        variant: 'success',
      });
      setProductData({ ...dataToUpdate, _id });
    } catch (err) {
      enqueueSnackbar('Nastala chyba', {
        variant: 'error',
      });
      console.log(err.message);
    }
  };

  const handleRemoveVariant = async (idx: number) => {
    if (productData.variants.length === 1) {
      return enqueueSnackbar('Nie je možné odstrániť posledný variant.', {
        variant: 'error',
      });
    }
    try {
      const {
        _id,
        dateCreated,
        dateModified,
        modifiedByUserId,
        ...restData
      } = productData as any;
      const dataToUpdate = {
        ...restData,
        variants: [
          ...restData.variants.slice(0, idx),
          ...restData.variants.slice(idx + 1),
        ],
      };
      console.log(dataToUpdate);
      await updateProduct({
        variables: { _id, productInput: dataToUpdate },
      });
      enqueueSnackbar('Produkt bol úspešne upravený', {
        variant: 'success',
      });
      setProductData({ ...dataToUpdate, _id });
      setActiveVariant(0);
    } catch (err) {
      enqueueSnackbar('Nastala chyba', {
        variant: 'error',
      });
      console.log(err.message);
    }
  };

  const handleSetActiveVariant = (value: number) => {
    setActiveVariant(value);
    setVariantData(variants[value]);
    setImages(variants[value].images);
    const blocksFromHtml = convertFromHTML(variants[value].description);
    setEditorState(
      EditorState.createWithContent(
        ContentState.createFromBlockArray(
          blocksFromHtml.contentBlocks,
          blocksFromHtml.entityMap
        )
      )
    );
  };

  const onEditorStateChange = (state: EditorState) => {
    let description = draftToHtml(convertToRaw(state.getCurrentContent()));
    setEditorState(state);
    setVariantData({
      ...variantData,
      description: description,
    });
    setEditorState(state);
  };

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
    setVariantData({
      ...variantData,
      images: newImagesArr,
    });
  };

  const handleRemoveImage: (idx: number) => Promise<void> = async (idx) => {
    const removeItem: (items: any[], i: number) => any[] = (items, i) =>
      items.slice(0, i).concat(items.slice(i + 1, items.length));

    const newImagesArr = removeItem(images, idx);

    setImages(newImagesArr);

    setVariantData({
      ...variantData,
      images: newImagesArr,
    });
  };

  const handleChangeVariant = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    handleSetActiveVariant(event.target.value as number);
  };

  const handleUpdateVariant = () => {
    setUpdateActual(true);
    handleSetActiveVariant(0);
  };
  const handleCreateNewVariant = () => {
    setUpdateActual(false);
    setVariantData(initialVariantData);
    setEditorState(EditorState.createEmpty());
    setImages([]);
  };

  const disabled: boolean = checkVariantAddBtnDisabled(variantData);

  return (
    <>
      <Paper className={classes.paperBlock}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="h3">
              Variant produktu
            </Typography>
            <div style={{ display: 'flex' }}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleUpdateVariant}
              >
                Upraviť aktuálny
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleCreateNewVariant}
              >
                Vytvoriť nový
              </Button>
            </div>
          </div>
          {updateActual && (
            <FormControl
              variant="outlined"
              className={`${classes.formControl}`}
            >
              <InputLabel id="variant-select-label">Zvoľte variant</InputLabel>
              <Select
                labelId="variant-select-label"
                id="variant-select"
                value={activeVariant}
                onChange={handleChangeVariant}
                label="Zvoľte variant"
              >
                {variants.map((variant: any, index: number) => {
                  return (
                    <MenuItem key={index} value={index}>
                      {variant.title}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          )}
        </div>
        <FormControl margin="normal">
          <TextField
            label="Názov variantu"
            variant="standard"
            id="vTitle"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setVariantData({
                ...variantData,
                title: event.currentTarget.value,
              });
            }}
            value={variantData.title}
            defaultValue={undefined}
            required
          />
        </FormControl>
        <FormControl margin="normal">
          <TextField
            label="Číslo produktu"
            variant="standard"
            id="vproductCode"
            style={{ marginLeft: '10px' }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setVariantData({
                ...variantData,
                productCode: event.currentTarget.value,
              });
            }}
            value={variantData.productCode}
            required
            defaultValue={undefined}
          />
        </FormControl>
        <div>
          <p className="mt-4 mb-2">Popis produktu </p>
          <Editor
            editorState={editorState}
            wrapperClassName="description-wrapper"
            editorClassName="description-editor"
            onEditorStateChange={onEditorStateChange}
          />
          <p className="mb-2">Náhľad </p>
          <textarea
            disabled
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            rows={4}
            className="w-100"
          />
        </div>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl className={classes.root} margin="normal">
              <TextField
                label="Cena"
                id="vPrice"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">€</InputAdornment>
                  ),
                }}
                type="number"
                variant="outlined"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setVariantData({
                    ...variantData,
                    price: {
                      value: +(event.currentTarget.value as unknown) as number,
                      currency: '€',
                    },
                  });
                }}
                value={variantData.price.value}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl margin="normal" className={classes.root}>
              <TextField
                label="Zľava"
                id="vDiscount"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                type="number"
                variant="outlined"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setVariantData({
                    ...variantData,
                    discount: +(event.currentTarget.value as unknown) as number,
                  });
                }}
                required
                value={variantData.discount}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl margin="normal" className={classes.root}>
              <TextField
                label="Na sklade"
                id="vInStock"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">ks</InputAdornment>
                  ),
                }}
                type="number"
                variant="outlined"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setVariantData({
                    ...variantData,
                    inStock: +(event.currentTarget.value as unknown) as number,
                  });
                }}
                required
                value={variantData.inStock}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Bonus k produktu"
              id="vBonus"
              variant="outlined"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setVariantData({
                  ...variantData,
                  bonus: event.currentTarget.value,
                });
              }}
              value={variantData.bonus}
            />
          </Grid>
        </Grid>
        {''}
        <div className={classes.imageUpload}>
          <input
            className={classes.input}
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={handleAddImageData}
            multiple
          />
          <label htmlFor="icon-button-file">
            <Typography component="span">Nahrať obrázok: </Typography>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </div>

        {images && images.length > 0 ? (
          <Carousel
            slidesPerPage={images.length > 1 ? 2 : 1}
            arrows={images.length > 1}
          >
            {images.map(({ base64, path }, i) => (
              <ImagePreview
                key={i}
                idx={i}
                srcImg={base64 || path}
                removeImage={handleRemoveImage}
              />
            ))}
          </Carousel>
        ) : (
          <Paper className={classes.imagePreview} variant="outlined">
            <Typography align="center">Náhľad obrázku</Typography>
          </Paper>
        )}
        <Button
          onClick={handleCreateProduct}
          color="primary"
          variant="contained"
          className={classes.right}
        >
          {updateActual ? 'Upraviť' : 'Vytvoriť'}
        </Button>
      </Paper>
      {''}
      {productData.variants && productData.variants.length > 0 && !update && (
        <>
          <Typography variant="h5" component="h3">
            Varianty produktu
          </Typography>
          <Grid container>
            {productData.variants.map((item: any, i: number) => {
              return (
                <Grid item md={12} xs={12} key={i}>
                  <DetailWrapper elevation={2}>
                    <ImageTitleWrapper>
                      {item.images[0] && (
                        <DetailImage
                          src={item.images[0].base64 || item.images[0].path}
                        />
                      )}
                      <div style={{ marginLeft: '1rem' }}>
                        <DetailTitle>{item.title}</DetailTitle>
                        <DetailText>{`Kód produktu: ${item.productCode}`}</DetailText>
                        <DetailText>{`Na sklade: ${item.inStock}`}</DetailText>
                        <DetailText>{`Cena: ${item.price.value} €`}</DetailText>
                        <DetailText>{`Zľava: ${item.discount} %`}</DetailText>
                      </div>
                    </ImageTitleWrapper>
                    <DetailText
                      style={{ marginTop: '1rem' }}
                      dangerouslySetInnerHTML={renderDescription(
                        item.description
                      )}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.delete}
                      onClick={() => handleRemoveVariant(i)}
                    >
                      Odstrániť
                    </Button>
                  </DetailWrapper>
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </>
  );
};

function renderDescription(description) {
  return { __html: description };
}

function checkVariantAddBtnDisabled(variantData: any): boolean {
  const { title, description, inStock, price } = variantData;

  if (title && description && inStock && price) {
    return false;
  }

  return true;
}

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

export default UpdateVariantProductData;
