import { createMuiTheme } from '@material-ui/core';

const TEXT_COLOR: string = '#07373B';

export const COLORS = {
  PRIMARY: '#FFFFFF',
  SECONDARY: '#39F5AD',
  DK_GREEN: '#07373B',
};

// TODO - move values to constants
export default createMuiTheme({
  palette: {
    primary: {
      main: COLORS.PRIMARY,
      contrastText: TEXT_COLOR,
    },
    secondary: {
      main: COLORS.SECONDARY,
      contrastText: TEXT_COLOR,
    },
    text: {
      primary: TEXT_COLOR,
    },
  },
  typography: {
    fontFamily: 'Bilo',
    h3: {
      fontFamily: 'atten-round-new',
      fontSize: '32pt',
      letterSpacing: '1.6pt',
      color: TEXT_COLOR,
      fontWeight: 500,
    },
    h4: {
      fontFamily: 'atten-round-new',
      fontSize: '24pt',
      fontWeight: 800,
      letterSpacing: '1.6pt',
      color: TEXT_COLOR,
    },
    h6: {
      fontSize: '16pt',
      color: TEXT_COLOR,
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 800,
      letterSpacing: '0.8pt',
      lineHeight: '22pt',
      color: TEXT_COLOR,
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
      letterSpacing: 0,
      lineHeight: '22pt',
      color: TEXT_COLOR,
    },
    button: {
      textTransform: 'uppercase',
      letterSpacing: '1pt',
      color: TEXT_COLOR,
    },
  },
  overrides: {
    MuiFormControlLabel: {
      label: {
        color: TEXT_COLOR,
        opacity: '40%',
        width: '100%',
        padding: 0,
      },
    },
    MuiListItem: {
      root: {
        fontWeight: 900,
      },
    },
    MuiButton: {
      contained: {
        border: `1px solid ${COLORS.SECONDARY}`,
      },
    },
    MuiAppBar: {
      colorDefault: {
        backgroundColor: COLORS.DK_GREEN,
        color: COLORS.PRIMARY,
      },
    },
  },
});
