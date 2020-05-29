import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperBlock: {
      padding: theme.spacing(6),
      marginBottom: theme.spacing(3),
    },
  })
);

export default (props) => {
  const { productData, handleProductData } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.paperBlock}>
      <Typography>Final Product data would be here</Typography>
    </Paper>
  );
};
