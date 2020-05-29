import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
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
  const { data } = props;
  console.log(data);

  const { title, description, images, price, discount, inStock } = data;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        alt={title}
        height="140"
        image={images[0].base64 || images[0].src}
        title={title}
      />
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography color="textSecondary">{description}</Typography>
        <Typography variant="body2" component="p">
          Price: {price.value},-{price.currency}
        </Typography>
        <Typography variant="body2" component="p">
          Discount: {discount}%
        </Typography>
        <Typography variant="body2" component="p">
          In stock are <Typography component="strong">{inStock}</Typography>
        </Typography>
      </CardContent>
    </Card>
  );
};
