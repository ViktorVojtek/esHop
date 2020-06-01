import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Layout from '../../../../../shared/components/Layout/Admin.material.layout';
import Form from './components/SubCategorySubmitForm';
import List from './components/SubCategories';
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

const SubcategoryContentPage: () => JSX.Element = () => {
  const classes = useStyles();

  return (
    <Layout pageTitle="Subcategory settings">
      <Paper className={classes.paper}>
        <Form />
      </Paper>
      <Paper className={classes.paper}>
        <List />
      </Paper>
    </Layout>
  );
};

export default SubcategoryContentPage;
