import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Layout from '../../../../../shared/components/Layout/Admin.material.layout';
import Form from './components/SubCategorySubmitForm';
import List from './components/SubCategories';
// import { PaddedWrapper } from '../styles/settings.style';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import SubCategoryUpdateForm from './components/SubCategoryUpdateForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
  })
);

export type SubCategoryType = {
  _id?: string;
  categoryId: string;
  title: string;
  image: any;
  forReservation: boolean;
  forSale: boolean;
  forGiftCard: boolean;
  forGiftBasket: boolean;
  covidWarranty: boolean;
};

const SubcategoryContentPage: (props: { role: number }) => JSX.Element = ({
  role,
}) => {
  const classes = useStyles();
  const [action, setAction] = useState<'create' | 'update'>(null);
  const [subCategoryToUpdate, setSubCategoryToUpdate] = useState<
    SubCategoryType
  >(null);

  const handleCreateNew = () => setAction('create');

  const handleSetSubCategoryToUpdate = (subCategory: SubCategoryType) => {
    setSubCategoryToUpdate(subCategory);
  };

  return (
    <Layout pageTitle="Nastavenie podkategórii" role={role}>
      <Button variant="contained" color="primary" onClick={handleCreateNew}>
        Pridať podkategóriu
      </Button>
      {action === 'create' && (
        <Paper className={classes.paper}>
          <Form action={action} setAction={setAction} />
        </Paper>
      )}
      {action === 'update' && subCategoryToUpdate !== null && (
        <Paper className={classes.paper}>
          <SubCategoryUpdateForm
            setAction={setAction}
            subCategory={subCategoryToUpdate}
          />
        </Paper>
      )}
      <Paper className={classes.paper}>
        <List
          action={action}
          setAction={setAction}
          handleSetSubCategoryToUpdate={handleSetSubCategoryToUpdate}
        />
      </Paper>
    </Layout>
  );
};

export default SubcategoryContentPage;
