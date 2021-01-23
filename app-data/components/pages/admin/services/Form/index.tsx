import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button } from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import TextField from '@material-ui/core/TextField';
import toBase64 from '../../../../../shared/helpers/toBase64';
import { bytesToSize } from '../../../../../shared/helpers/formatters';
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import CategorySelector from '../../../admin/products/ProductForm/mui/components/CategorySelector';
import SubcategorySelector from '../../../admin/products/ProductForm/mui/components/SubCategorySelector';
import {
  CREATE_SERVICE_MUTATION,
  UPDATE_SERVICE_MUTATION,
} from '../../../../../graphql/mutation';
import { SERVICES_QUERY } from '../../../../../graphql/query';
import slugify from 'slugify';
import { useSnackbar } from 'notistack';

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
  slug: string;
  category: any;
  discount: number;
  html: string;
  img: any;
  subCategory: any;
  price: {
    currency: string;
    value: number;
  };
  video: string;
};

const initialData: initialDataType = {
  title: '',
  slug: '',
  category: {
    id: '',
    title: '',
  },
  discount: 0,
  html: '',
  img: null,
  price: {
    currency: '€',
    value: 0,
  },
  subCategory: {
    id: '',
    title: '',
  },
  video: '',
};

interface IServiceForm {
  update?: boolean;
  updateServiceData?: any;
}

const ServiceForm = (props: IServiceForm) => {
  const { update, updateServiceData } = props;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState(initialData);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [createService] = useMutation(CREATE_SERVICE_MUTATION, {
    refetchQueries: [{ query: SERVICES_QUERY }],
  });
  const [updateService] = useMutation(UPDATE_SERVICE_MUTATION, {
    refetchQueries: [{ query: SERVICES_QUERY }],
  });
  const htmlForm = useRef(null);

  useEffect(() => {
    if (updateServiceData) {
      setData(updateServiceData);
      const blocksFromHtml = convertFromHTML(updateServiceData.html);
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            blocksFromHtml.contentBlocks,
            blocksFromHtml.entityMap
          )
        )
      );
    }
  }, [updateServiceData]);

  const onEditorStateChange = (state: EditorState) => {
    let description = draftToHtml(convertToRaw(state.getCurrentContent()));

    setEditorState(state);
    setData({
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

    setData({
      ...data,
      img: imgData,
    });
  };

  const handleSubmitData: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (update) {
        const { _id, ...restData } = data as any;

        await updateService({
          variables: { _id, serviceInput: restData },
        });
        enqueueSnackbar('Služba bola úspešne upravená', {
          variant: 'success',
        });
      } else {
        await createService({ variables: { serviceInput: data } });
        enqueueSnackbar('Služba bola úspešne vytvorená', {
          variant: 'success',
        });
      }
    } catch (err) {
      enqueueSnackbar('Nastala chyba', {
        variant: 'error',
      });
      console.log(err);
    }
  };

  return (
    <form ref={htmlForm} onSubmit={handleSubmitData}>
      <FormControl className={classes.fieldRow}>
        <TextField
          label="Názov služby"
          required
          value={data.title}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setData({
              ...data,
              title: e.currentTarget.value as string,
              slug: slugify(e.currentTarget.value as string).toLowerCase(),
            });
          }}
        />
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <TextField
          id="slug"
          label="URL produktu"
          variant="standard"
          value={data.slug || ''}
          required
          disabled
        />
      </FormControl>
      <CategorySelector productData={data} setProductData={setData} />
      {data.category.id ? (
        <SubcategorySelector productData={data} setProductData={setData} />
      ) : (
        <div />
      )}
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
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <FormControl className={classes.fieldRow}>
            <TextField
              type="number"
              label="Cena"
              required
              value={data.price.value}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setData({
                  ...data,
                  price: {
                    currency: '€',
                    value: +event.currentTarget.value as number,
                  },
                });
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">€</InputAdornment>,
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl className={classes.fieldRow}>
            <TextField
              type="number"
              label="Zľava"
              required
              value={data.discount}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setData({
                  ...data,
                  discount: +event.currentTarget.value as number,
                });
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </FormControl>
        </Grid>
      </Grid>
      <FormControl className={classes.fieldRow}>
        <TextField
          type="text"
          label="Video"
          value={data.video}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setData({
              ...data,
              video: event.currentTarget.value as string,
            });
          }}
        />
      </FormControl>
      <FormControl className={classes.fieldRow}>
        <Button color="primary" type="submit">
          {update ? 'Upraviť' : 'Vytvoriť'}
        </Button>
      </FormControl>
    </form>
  );
};

export default ServiceForm;
