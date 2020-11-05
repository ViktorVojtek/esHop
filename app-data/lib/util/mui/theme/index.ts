import { createMuiTheme } from '@material-ui/core/styles';
import { skSK } from '@material-ui/core/locale';

// Create a theme instance.
const theme = createMuiTheme(
  {
    palette: {
      primary: {
        main: '#007bff',
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: '#d32f2f',
        dark: '#b71c1c',
      },
      background: {
        default: '#fff',
      },
    },
  },
  skSK
);

export default theme;
