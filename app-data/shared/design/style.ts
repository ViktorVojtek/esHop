import { createStyles, makeStyles } from '@material-ui/core';
import { colors } from './colors';

export const useSiteStyles = makeStyles(() =>
  createStyles({
    checkbox: {
      '& .Mui-checked': {
        color: `${colors.primary} !important`,
      },
      '& .MuiFormControlLabel-label': {
        fontFamily: 'GothamRnd-Book',
        fontSize: '1rem',
        color: colors.text,
      },
    },
    paginationBlog: {
      '& .MuiPagination-ul': {
        justifyContent: 'center',
        marginTop: '32px',
        '& li': {
          '& button': {
            width: '40px',
            height: '40px',
            borderRadius: '20px',
          },
          '&:first-child': {
            '& button': {
              backgroundColor: colors.primary,
            },
            '& svg': {
              color: 'white',
            },
          },
          '&:last-child': {
            '& button': {
              backgroundColor: colors.primary,
            },
            '& svg': {
              color: 'white',
            },
          },
        },
      },
    },
  })
);
