import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CategorySelector from '../CategorySelector';
import SubcategorySelector from '../SubCategorySelector';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperBlock: {
      padding: theme.spacing(6),
      marginBottom: theme.spacing(3),
    },
  })
);

interface IProps {
  productData: any;
  setProductData: any;
}
export default (props: IProps): JSX.Element => {
  const { productData, setProductData } = props;
  const classes = useStyles();

  // Component did mount
  useEffect(() => {
    // Component will umount
    return () => {};
  }, []);

  return (
    <Paper className={classes.paperBlock}>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h6" component="h3">
            Here we set the basic product properties
          </Typography>
          <FormControl margin="normal">
            <TextField
              id="title"
              label="Product title"
              variant="standard"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setProductData({
                  ...productData,
                  title: event.currentTarget.value as string,
                });
              }}
              defaultValue={undefined}
              value={productData.title || ''}
              required
            />
          </FormControl>
          <CategorySelector
            productData={productData}
            setProductData={setProductData}
          />
          {productData.category.id ? (
            <SubcategorySelector
              productData={productData}
              setProductData={setProductData}
            />
          ) : (
            <div />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};
