import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Layout from '../../../../../shared/components/Layout/Admin.material.layout';
import Form from './components/CategorySubmitForm';
import List from './components/Categories';
// import { PaddedWrapper } from '../styles/settings.style';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
  })
);

const CategoryPageContent: (props: { role: number }) => JSX.Element = ({
  role,
}) => {
  const classes = useStyles();

  return (
    <Layout pageTitle="Category settings" role={role}>
      <Paper className={classes.paper}>
        <Form />
      </Paper>
      <Paper className={classes.paper}>
        <List />
      </Paper>
    </Layout>
  );
};

export default CategoryPageContent;
