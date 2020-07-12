import React, { useState, useRef } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Grid from '@material-ui/core/Grid';
import SvgIcon from '@material-ui/core/SvgIcon';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';

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
  contains: string[];
  description: string;
  image: string;
  price: number;
  location: string;
  bonus: string[];
};

const initialData: initialDataType = {
  title: '',
  contains: [],
  description: '',
  image: '',
  price: 0,
  location: '',
  bonus: [],
};

export default () => {
  const classes = useStyles();
  const [data, populateData] = useState(initialData);
  const htmlForm = useRef(null);
  const containsInput = useRef(null);
  const bonusInput = useRef(null);

  const handleAddImage: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void = (event) => {
    const { files } = event.currentTarget as HTMLInputElement;

    if (files && files[0]) {
      const reader = new FileReader();

      reader.addEventListener('load', (progress: ProgressEvent<FileReader>) => {
        populateData({
          ...data,
          image: progress.target.result as string,
        });
      });

      reader.readAsDataURL(files[0]);
    }
  };

  const handleAddContainsData: () => void = () => {
    const newData: string[] = [
      ...data.contains,
      containsInput.current.value as string,
    ];

    populateData({
      ...data,
      contains: newData,
    });
  };
  const handleAddBonusData: () => void = () => {
    const newData: string[] = [
      ...data.bonus,
      bonusInput.current.value as string,
    ];

    populateData({
      ...data,
      bonus: newData,
    });
  };

  const handleRemoveListData: (key: string, idx: number) => void = (
    key,
    idx
  ) => {
    const newData: string[] = [
      ...data[key].slice(0, idx),
      ...data[key].slice(idx + 1),
    ];

    populateData({
      ...data,
      [key]: newData,
    });
  };

  const handleSubmitData: (e: React.FormEvent<HTMLFormElement>) => void = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log('Submitting data');
    console.log(data);
  };

  const containsItems: JSX.Element[] =
    data.contains.length > 0
      ? data.contains.map((item, i) => (
          <ListItem key={`${item}-${i}`} className={classes.listItem}>
            {item}
            <IconButton
              color="secondary"
              onClick={() => handleRemoveListData('contains', i)}
            >
              <ClearIcon />
            </IconButton>
          </ListItem>
        ))
      : null;
  const bonusItems: JSX.Element[] =
    data.bonus.length > 0
      ? data.bonus.map((item, i) => (
          <ListItem key={`${item}-${i}`} className={classes.listItem}>
            {item}
            <IconButton
              color="secondary"
              onClick={() => handleRemoveListData('bonus', i)}
            >
              <ClearIcon />
            </IconButton>
          </ListItem>
        ))
      : null;

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
      <FormControl className={classes.fieldRow}>
        <input
          accept="image/*"
          className={classes.input}
          id="icon-button-file"
          type="file"
          onChange={handleAddImage}
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
      {data.image.length > 0 && (
        <FormControl className={classes.fieldRow}>
          <img src={data.image} style={{ maxWidth: 500 }} />
        </FormControl>
      )}
      <FormControl className={classes.fieldRow}>
        <TextareaAutosize
          rows={4}
          placeholder="Description"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            populateData({
              ...data,
              description: e.currentTarget.value,
            });
          }}
        />
      </FormControl>
      <FormControl className={classes.fieldRow}>
        <Grid container>
          <Grid item>
            <TextField label="Contains" inputRef={containsInput} />
          </Grid>
          <Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddContainsData}
            >
              <SvgIcon>
                <AddIcon />
              </SvgIcon>
            </Button>
          </Grid>
          <Grid item>
            <List className={classes.list}>{containsItems}</List>
          </Grid>
        </Grid>
      </FormControl>
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
          label="Location"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            populateData({
              ...data,
              location: event.currentTarget.value as string,
            });
          }}
        />
      </FormControl>
      <FormControl className={classes.fieldRow}>
        <Grid container>
          <Grid item>
            <TextField label="Bonus" inputRef={bonusInput} />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddBonusData}
            >
              <SvgIcon>
                <AddIcon />
              </SvgIcon>
            </Button>
          </Grid>
          <Grid item>{bonusItems}</Grid>
        </Grid>
      </FormControl>
      <FormControl className={classes.fieldRow}>
        <Button color="primary" type="submit">
          Send
        </Button>
      </FormControl>
    </form>
  );
};
