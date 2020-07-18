import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button } from 'reactstrap';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import TextField from '@material-ui/core/TextField';
import toBase64 from '../../../../../shared/helpers/toBase64';
import { bytesToSize } from '../../../../../shared/helpers/formatters';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import CategorySelector from '../../../admin/products/ProductForm/mui/components/CategorySelector';
import SubcategorySelector from '../../../admin/products/ProductForm/mui/components/SubCategorySelector';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor, Editor),
  { ssr: false }
);

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
    fieldRow: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    list: {
      borderLeft: '1px solid #ccc',
      width: '100%',
      marginLeft: theme.spacing(2),
      maxWidth: 250,
      maxHeight: 95,
      position: 'relative',
      overflow: 'auto',
    },
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
      height: 25,
    },
  })
);

type initialDataType = {
  title: string;
  category: any;
  html: string;
  img: any;
  subCategory: any;
  price: number;
  video: string;
};

const initialData: initialDataType = {
  title: '',
  category: {
    id: '',
    title: '',
  },
  html: '',
  img: null,
  price: 0,
  subCategory: {
    id: '',
    title: '',
  },
  video: '',
};

export default () => {
  const classes = useStyles();
  const [data, populateData] = useState(initialData);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const htmlForm = useRef(null);

  const onEditorStateChange = (state: EditorState) => {
    let description = draftToHtml(convertToRaw(state.getCurrentContent()));

    setEditorState(state);
    populateData({
      ...data,
      html: description,
    });
    setEditorState(state);
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

    populateData({
      ...data,
      img: imgData,
    });
  };

  const handleSubmitData: (e: React.FormEvent<HTMLFormElement>) => void = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log('Submitting data');
    console.log(data);
  };

  return (
    <form ref={htmlForm} onSubmit={handleSubmitData}>
      <FormControl className={classes.fieldRow}>
        <TextField
          label="Title"
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            populateData({
              ...data,
              title: e.currentTarget.value as string,
            });
          }}
        />
      </FormControl>
      <CategorySelector productData={data} setProductData={populateData} />
      {data.category.id ? (
        <SubcategorySelector productData={data} setProductData={populateData} />
      ) : (
        <div />
      )}
      <Editor
        editorState={editorState}
        wrapperClassName="description-wrapper"
        editorClassName="description-editor"
        onEditorStateChange={onEditorStateChange}
      />
      <FormControl className={classes.fieldRow}>
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
      {data.img && (
        <FormControl className={classes.fieldRow}>
          <img
            src={data.img.path || data.img.base64}
            style={{ maxWidth: 500 }}
          />
        </FormControl>
      )}
      <FormControl className={classes.fieldRow}>
        <TextField
          type="number"
          label="Price"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            populateData({
              ...data,
              price: +event.currentTarget.value as number,
            });
          }}
        />
      </FormControl>
      <FormControl className={classes.fieldRow}>
        <TextField
          type="text"
          label="Video"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            populateData({
              ...data,
              video: event.currentTarget.value as string,
            });
          }}
        />
      </FormControl>
      <FormControl className={classes.fieldRow}>
        <Button color="primary" type="submit">
          Send
        </Button>
      </FormControl>
    </form>
  );
};
