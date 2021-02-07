import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
// import { PaddedWrapper } from '../styles/settings.style';
import Paper from '@material-ui/core/Paper';
import Layout from '../../../../shared/components/Layout/Admin.material.layout';
import GiftCards from './components/GiftCards';
import GiftCardSubmitForm from './components/GiftCardsSubmitForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
  })
);

export type GiftCardType = {
  _id?: string;
  title: string;
  image: any;
};

const GiftCardsContentPage: (props: { role: number }) => JSX.Element = ({
  role,
}) => {
  const classes = useStyles();

  return (
    <Layout pageTitle="Nastavenie darčekových poukážok" role={role}>
      <Paper className={classes.paper}>
        <GiftCardSubmitForm />
      </Paper>
      <Paper className={classes.paper}>
        <GiftCards />
      </Paper>
    </Layout>
  );
};

export default GiftCardsContentPage;
