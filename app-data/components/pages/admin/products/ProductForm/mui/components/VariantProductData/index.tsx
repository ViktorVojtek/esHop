import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import dynamic from 'next/dynamic';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Carousel from '@brainhubeu/react-carousel';
import ImagePreview from './components/ImagePreview';
import VariantItemCard from './components/VariantCardItem';
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

type ProductVariant = {
  description?: string;
  discount?: number;
  itemsInStock?: number;
  images?: ProductImage[];
  inStock?: number;
  title?: string;
  price?: ProductPrice;
  productCode?: string;
};

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor, Editor),
  { ssr: false }
);

const VariantProductData = (props) => {
  const { productData, setProductData } = props;
  const { variants } = productData;
  const classes = useStyles();
  const [activeVariant, setActiveVariant] = useState(0);
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
      : {
          title: '',
          description: '',
          inStock: 0,
          images: [],
          discount: 0,
          price: { value: 0, currency: '€' },
          productCode: '',
        }
  );
  const [images, setImages] = useState(variantData.images);
  const oldDesc = variants[activeVariant]
    ? variants[activeVariant].description
    : '';
  const blocksFromHtml = convertFromHTML(oldDesc);
  const [editorState, setEditorState] = useState(
    variants[activeVariant] && variants[activeVariant].description
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

  const handleSetActiveVariant = (value: number) => {
    setActiveVariant(value);
    setVariantData(variants[value]);
    setImages(variants[value].images);
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
      images:
        (variantData as any).images && (variantData as any).images.length > 0
          ? [...(variantData as any).images, ...newImagesArr]
          : newImagesArr,
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

  const handleAddVariantToProd: () => void = () => {
    setProductData({
      ...productData,
      variants: [...productData.variants, variantData],
    });
  };

  const handleRemoveVariant: (idx: number) => void = (idx) => {
    setProductData({
      ...productData,
      variants: [
        ...productData.variants.slice(0, idx),
        ...productData.variants.slice(idx + 1),
      ],
    });
    setActiveVariant(0);
  };

  const disabled: boolean = checkVariantAddBtnDisabled(variantData);

  return (
    <>
      <Paper className={classes.paperBlock}>
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

        <Box>
          <Typography align="right">
            <Tooltip title="Add new variant">
              <span>
                <Fab
                  color="primary"
                  aria-label="add"
                  onClick={handleAddVariantToProd}
                  disabled={disabled}
                >
                  <AddIcon />
                </Fab>
              </span>
            </Tooltip>
          </Typography>
        </Box>
      </Paper>
      {''}
      {productData.variants && productData.variants.length > 0 ? (
        <Carousel
          arrows={productData.variants.length > 1}
          value={activeVariant}
          onChange={handleSetActiveVariant}
        >
          {productData.variants.map((item: any, i: number) => {
            const { title } = productData;
            const productProps = { title };

            return (
              <VariantItemCard
                data={item}
                removeItem={handleRemoveVariant}
                idx={i}
                product={productProps}
                key={i}
              />
            );
          })}
        </Carousel>
      ) : (
        <Paper className={classes.paperBlock}>
          <Typography align="center">
            Nebol vytvorený žiaden variant produktu.
          </Typography>
        </Paper>
      )}
    </>
  );
};

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

export default VariantProductData;
