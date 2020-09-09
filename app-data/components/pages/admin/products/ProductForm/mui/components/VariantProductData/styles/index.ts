import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    input: {
      display: 'none',
    },
    imageUpload: {
      marginBlock: theme.spacing(3),
    },
    imagePreview: {
      padding: theme.spacing(7),
      marginBottom: theme.spacing(2),
    },
    paperBlock: {
      padding: theme.spacing(6),
      marginBottom: theme.spacing(3),
    },
  })
);

export default useStyles;
