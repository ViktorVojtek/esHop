import React, { FC, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
  })
);

interface ISelector {
  data: any;
  change: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
  dataId?: string;
  selected: string;
  setDefault?: (id: string) => void;
  title: string;
}

const Selector: FC<ISelector> = (props) => {
  const { data, change, dataId, selected, setDefault, title } = props;
  const classes = useStyles();

  useEffect(() => {
    if (dataId) {
      setDefault(dataId);
    } else {
      setDefault('');
    }
  }, [dataId]);

  return (
    <FormControl className={classes.formControl} margin="normal">
      <InputLabel id="demo-simple-select-label">{title}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selected || ''}
        onChange={change}
        defaultValue={0}
      >
        {data.map((item: any, i: number) => (
          <MenuItem
            key={item._id}
            selected={dataId == item._id}
            value={item._id}
            data-name={item.title}
          >
            {item.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Selector;
