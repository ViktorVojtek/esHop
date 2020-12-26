import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Layout from '../../../../../shared/components/Layout/Admin.material.layout';
// import { PaddedWrapper } from '../styles/settings.style';
import Paper from '@material-ui/core/Paper';
import FreeDeliveryList from './components/FreeDeliveries';
import FreeDeliverySubmitForm from './components/FreeDeliveriesForm';
import { useQuery } from '@apollo/react-hooks';
import { FREEDELIVERY_QUERY } from '../../../../../graphql/query';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
  })
);

const FreeDeliveryContentPage: (props: { role: number }) => JSX.Element = ({
  role,
}) => {
  const classes = useStyles();
  const { error, loading, data } = useQuery(FREEDELIVERY_QUERY);
  if (loading) {
    return <>loading</>;
  }
  if (error) {
    return <>{error.message}</>;
  }
  const { freeDeliveries } = data;

  return (
    <Layout pageTitle="Nastavenie doručenia zdarma" role={role}>
      {freeDeliveries.length === 0 && (
        <Paper className={classes.paper}>
          <FreeDeliverySubmitForm freeDeliveries={freeDeliveries} />
        </Paper>
      )}
      <Paper className={classes.paper}>
        <FreeDeliveryList freeDeliveries={freeDeliveries} />
      </Paper>
    </Layout>
  );
};

export default FreeDeliveryContentPage;
