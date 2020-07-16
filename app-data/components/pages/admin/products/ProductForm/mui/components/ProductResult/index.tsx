import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Carousel from '@brainhubeu/react-carousel';
import { CREATE_PRODUCT_MUTATION } from '../../../../../../../../graphql/mutation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperBlock: {
      padding: theme.spacing(6),
      marginBottom: theme.spacing(3),
    },
    card: {
      width: 330,
    },
    media: {
      height: 140,
    },
    marginB: {
      marginBottom: theme.spacing(2),
    },
  })
);

export default (props) => {
  const { productData } = props;
  const { title, category, subCategory, variants } = productData;
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
  function renderDescription(description) {
    return { __html: description };
  }

  return (
    <Paper className={classes.paperBlock}>
      <Box className={classes.marginB}>
        <Typography variant="h4" component="h2">
          {title}
        </Typography>
        <Typography variant="subtitle1" component="h3">
          Category: {category.title}
        </Typography>
        <Typography variant="subtitle1" component="h3">
          Subcategory: {subCategory.title}
        </Typography>
      </Box>
      {variants && variants.length > 0 && (
        <Carousel
          slidesPerPage={variants.length > 1 ? 2 : 1}
          arrows={variants.length > 2}
        >
          {variants.map(
            (
              { description, discount, inStock, images, title, price },
              i: number
            ) => (
              <Card key={`${title}-${i}`} className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={images[0].base64 || images[0].path}
                  title={title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {title}
                  </Typography>
                  <TableContainer component={Paper} className={classes.marginB}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Price</TableCell>
                          <TableCell>Items in stock</TableCell>
                          <TableCell>Discount</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>{`${price.value},-${price.currency}`}</TableCell>
                          <TableCell>{`${inStock || 0} pcs.`}</TableCell>
                          <TableCell>{`${discount || 0}%`}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Typography
                    dangerouslySetInnerHTML={renderDescription(description)}
                  ></Typography>
                </CardContent>
              </Card>
            )
          )}
        </Carousel>
      )}
    </Paper>
  );
};

function VariantCard(props) {
  return <Card></Card>;
}
