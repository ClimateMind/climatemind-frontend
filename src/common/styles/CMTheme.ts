import { createMuiTheme, ThemeOptions } from '@material-ui/core';

const TEXT_COLOR: string = '#07373B';

export const COLORS = {
  PRIMARY: '#FFFFFF',
  SECONDARY: '#39F5AD',
  DK_TEXT: '#07373B',
  ACCENT1: '#FCE1AE',
  ACCENT2: '#FDED6D',
  ACCENT3: '#FF9439',
  ACCENT4: '#C6BDFA',
  ACCENT5: '#70D7CC',
  WARNING: '#ED7878',
  SUCCESS: '#00A85F',
  SUCCESS_LIGHT: '#E4FEF1',
  SUCCESS_LIGHT2: '#BDFADC',
  ERROR: '#B00620',
  ICON_LIGHT: '#77AAAF',
};

export const THEME_OPTIONS: ThemeOptions = {
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
    h1: {
      fontFamily: 'atten-round-new',
      fontSize: '64px',
      fontWeight: 900,
      color: TEXT_COLOR,
    },
    h2: {
      fontSize: '48px',
      fontWeight: 900,
      color: TEXT_COLOR,
    },
    h3: {
      fontFamily: 'atten-round-new',
      fontSize: '32px',
      fontWeight: 900,
      color: TEXT_COLOR,
    },
    h4: {
      fontSize: '24px',
      fontWeight: 900,
      letterSpacing: '1.6pt',
      color: TEXT_COLOR,
    },
    h5: {
      fontFamily: 'atten-round-new',
      fontSize: '22pt',
      fontWeight: 800,
      letterSpacing: '1.6pt',
      color: TEXT_COLOR,
    },
    h6: {
      fontSize: '16pt',
      color: TEXT_COLOR,
      lineHeight: '1.2',
    },
    subtitle1: {
      fontSize: '16px',
      fontWeight: 900,
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
      fontSize: '16px',
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
    MuiTab:{
      labelIcon: {
        minHeight: '64px',
      }
    },
    MuiBottomNavigationAction: {
      root: {
        color: COLORS.ICON_LIGHT,
        // "&$selected": {
        //   "backgroundColor": "#07373B"
        // }
      },
    },
  },
};

// TODO - move values to constants
export default createMuiTheme(THEME_OPTIONS);
