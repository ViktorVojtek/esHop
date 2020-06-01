import React from 'react';
import Layout from '../../../../../shared/components/Layout/Admin.material.layout';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4),
    },
  })
);

const PaymentContentPage: () => JSX.Element = () => {
  const classes = useStyles();

  return (
    <Layout pageTitle="Payment settings">
      <Paper className={classes.root}>
        <Typography>Payment methodes</Typography>
      </Paper>
    </Layout>
  );
};

export default PaymentContentPage;
