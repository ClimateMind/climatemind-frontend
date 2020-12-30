import { createMuiTheme } from '@material-ui/core';

const TEXT_COLOR: string = '#07373B';

export const COLORS = {
  PRIMARY: '#FFFFFF',
  SECONDARY: '#39F5AD',
  DK_TEXT: '#07373B',
  ACCENT1: '#FCE1AE',
  ACCENT2: '#FDED6D',
  ACCENT3: '#FF9439',
  ACCENT4: '#C6BDFA',
  WARNING: '#ED7878',
  SUCCESS: '#00A85F',
  SUCCESS_LIGHT: '#E4FEF1',
  ERROR: '#B00620',
  ICON_LIGHT: '#77AAAF',
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
    error: {
      main: COLORS.ERROR,
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
      lineHeight: '1.4',
      color: TEXT_COLOR,
    },
    subtitle2: {
      fontFamily: 'atten-round-new',
      fontSize: 16,
      fontWeight: 800,
      letterSpacing: '0.8pt',
      lineHeight: '1.4',
      color: TEXT_COLOR,
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
      letterSpacing: 0,
      lineHeight: '1.4',
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
    MuiDialog: {
      root: {
        margin: 0,
      },
      paper: {
        margin: 0,
      },
      paperFullWidth: {
        width: '100%',
      },
    },
    MuiAppBar: {
      colorDefault: {
        backgroundColor: COLORS.DK_TEXT,
        color: COLORS.PRIMARY,
      },
    },
    MuiBottomNavigationAction: {
      root: {
        color: COLORS.ICON_LIGHT,
        // "&$selected": {
        //   "backgroundColor": "#07373B"
        // }
      }
    }
  },
});
