import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { CREATE_PRODUCT_MUTATION } from '../../../../../../../../graphql/mutation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperBlock: {
      padding: theme.spacing(6),
      marginBottom: theme.spacing(3),
    },
    media: {
      height: 140,
    },
  })
);

export default (props) => {
  const { productData } = props;
  const { title, category, subCategory } = productData;
  const classes = useStyles();
  const [dispatch] = useMutation(CREATE_PRODUCT_MUTATION);

  const handleCreateProduct = async () => {
    console.log('Going to create product by mutation');
    try {
      await dispatch({ variables: { productInput: productData } });
      console.log('Product should be created');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Paper className={classes.paperBlock}>
      <Typography variant="h5" component="h2">
        {title}
      </Typography>
      <Typography variant="body2" component="h3">
        {category.title}
      </Typography>
      <Typography variant="body2" component="h3">
        {subCategory.title}
      </Typography>
      <Button onClick={handleCreateProduct}>Publish</Button>
    </Paper>
  );
};

function VariantCard(props) {
  return <Card></Card>;
}
