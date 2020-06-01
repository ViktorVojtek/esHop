import React, { FC } from 'react';
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
  selected: string;
  title: string;
}

const Selector: FC<ISelector> = (props) => {
  const { data, change, selected, title } = props;
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} margin="normal">
      <InputLabel id="demo-simple-select-label">{title}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selected}
        onChange={change}
      >
        {data.map((item: any, i: number) => (
          <MenuItem key={item._id} value={item._id} data-name={item.title}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Selector;
