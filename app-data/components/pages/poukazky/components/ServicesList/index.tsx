import React, { FC } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '100%',
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      flexWrap: 'wrap',
    },
    listItem:{
      flexBasis: '50%',
    },
  }),
);
const services = [
  {
    value: 0,
    title: '5x čiastočná masáž',
    price: 65,
  },
  {
    value: 1,
    title: '10x čiastočná masáž',
    price: 130,
  },
  {
    value: 2,
    title: '5x minerálny vaňový kúpeľ celkový',
    price: 80,
  },
  {
    value: 3,
    title: '3x celotelová masáž',
    price: 66,
  },
  {
    value: 4,
    title: '5x čiastočná masáž a 5x teploliečba',
    price: 125,
  },
  {
    value: 5,
    title: '5x Oxygenoterapia',
    price: 35,
  },
  {
    value: 6,
    title: '20x minerálny vaňový kúpeľ celkový',
    price: 224,
  },
  {
    value: 7,
    title: '10x inhalácia prírodnej minerálnej vody',
    price: 40,
  }
];

const ServicesList: FC = () => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List className={classes.root}>
      {services.map((item) => {
        const labelId = `checkbox-list-label-${item.value}`;

        return (
          <ListItem className={classes.listItem} key={item.value} role={undefined} dense button onClick={handleToggle(item.value)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(item.value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`${item.title} - ${item.price} €`} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default ServicesList;