import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 350,
      marginRight: theme.spacing(2),
    },
  })
);
export default (props) => {
  const { data, idx, product, removeItem } = props;
  const { title, description, images, price, discount, inStock } = data;
  const { title: productTitle } = product;
  const classes = useStyles();

  function renderDescription() {
    return { __html: description };
  }

  return (
    <Card className={classes.root}>
      <Button onClick={() => removeItem(idx)}>Remove</Button>
      {images && images.length > 0 && (
        <CardMedia
          component="img"
          alt={title}
          height="140"
          image={images[0].base64 || images[0].path}
          title={title}
        />
      )}
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          <Typography variant="button" component="strong">
            {productTitle}
          </Typography>{' '}
          {title}
        </Typography>
        <Typography
          color="textSecondary"
          dangerouslySetInnerHTML={renderDescription()}
        ></Typography>
        <Typography variant="body2" component="p">
          Price: {price.value || 0},-{price.currency}
        </Typography>
        <Typography variant="body2" component="p">
          Discount: {discount || 0}%
        </Typography>
        <Typography variant="body2" component="p">
          In stock are{' '}
          <Typography component="strong">{inStock || 0} products</Typography>
        </Typography>
      </CardContent>
    </Card>
  );
};
