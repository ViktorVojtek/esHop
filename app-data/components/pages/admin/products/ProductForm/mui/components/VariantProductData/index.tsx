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
import { EditorState, convertToRaw } from 'draft-js';
//import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor, Editor),
  { ssr: false }
);

const VariantProductData = (props) => {
  const { productData, setProductData } = props;
  const classes = useStyles();
  const [variantData, setVariantData] = useState({});
  const [images, setImages] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    return () => {};
  }, []);

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
  };

  const disabled: boolean = checkVariantAddBtnDisabled(variantData);

  return (
    <>
      <Paper className={classes.paperBlock}>
        <FormControl margin="normal">
          <TextField
            label="Variant title"
            variant="standard"
            id="vTitle"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setVariantData({
                ...variantData,
                title: event.currentTarget.value.trim(),
              });
            }}
            required
          />
        </FormControl>
        <FormControl margin="normal">
          <TextField
            label="Variant number"
            variant="standard"
            id="vIdentificationNumber"
            style={{ marginLeft: '10px' }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setVariantData({
                ...variantData,
                identificationNumber: event.currentTarget.value.trim(),
              });
            }}
            required
          />
        </FormControl>
        <div>
          <p className="mt-4 mb-2">Description </p>
          <Editor
            editorState={editorState}
            wrapperClassName="description-wrapper"
            editorClassName="description-editor"
            onEditorStateChange={onEditorStateChange}
          />
          <p className="mb-2">Preview </p>
          <textarea
            disabled
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            rows={4}
            className="w-100"
          />
        </div>
        {/*<FormControl className={classes.root} margin="normal">
          <TextField
            id="vDesc"
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setVariantData({
                ...variantData,
                description: event.currentTarget.value,
              });
            }}
            required
          />
          </FormControl>*/}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl className={classes.root} margin="normal">
              <TextField
                label="Price"
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
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl margin="normal" className={classes.root}>
              <TextField
                label="Discount"
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
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl margin="normal" className={classes.root}>
              <TextField
                label="In Stock"
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
            <Typography component="span">Upload image: </Typography>
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
            <Typography align="center">Image preview</Typography>
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
        <Carousel arrows={productData.variants.length > 1}>
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
            No variants has beeen created yet
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
