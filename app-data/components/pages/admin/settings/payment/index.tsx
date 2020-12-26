import React from 'react';
import Layout from '../../../../../shared/components/Layout/Admin.material.layout';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import Form from './components/PaymentSubmitForm';
import Payments from './components/PaymentMethods';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
  })
);

const PaymentConent: (props: { role: number }) => JSX.Element = ({ role }) => {
  const classes = useStyles();

  return (
    <Layout pageTitle="Nastavenie platieb" role={role}>
      <Paper className={classes.root}>
        <Form />
      </Paper>
      <Paper className={classes.root}>
        <Payments />
      </Paper>
    </Layout>
  );
};

export default PaymentConent;
