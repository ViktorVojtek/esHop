import { Paper } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    input: {
      display: 'none',
    },
    button: {
      marginBottom: '8px',
      marginRight: '8px',
    },
    delete: {
      background: 'red',
      color: 'white',
      '&:hover': {
        background: 'red',
      },
    },
    right: {
      marginLeft: 'auto',
      display: 'block',
    },
    select: {
      marginTop: '.5rem',
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
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
      marginLeft: 0,
      marginTop: 16,
    },
  })
);

export const DetailWrapper = styled(Paper)`
  margin-top: 1rem;
  padding: 12px;
  margin: 8px;
`;
export const ImageTitleWrapper = styled.div`
  display: flex;
`;
export const DetailImage = styled.img`
  min-width: 150px;
  max-width: 150px;
`;
export const DetailTitle = styled.h5`
  color: black;
`;
export const DetailText = styled.p`
  margin-bottom: 0.3rem;
`;
