import { createTheme, ThemeOptions } from '@material-ui/core';

export const TEXT_COLOR: string = '#07373B';

export const COLORS = {
  PRIMARY: '#FFFFFF',
  SECONDARY: '#39F5AD',
  DK_TEXT: '#07373B',
  DK_BG: '#07373B',
  ACCENT1: '#FCE1AE',
  ACCENT2: '#FDED6D',
  ACCENT3: '#FF9439',
  ACCENT4: '#C6BDFA',
  ACCENT5: '#70D7CC',
  ACCENT6: '#FFF7BA',
  ACCENT7: '#CAF7BC',
  ACCENT8: '#BCEEF7',
  ACCENT9: '#D3F7FD',
  ACCENT10: '#B9DEDF',
  ACCENT11: '#82EFC5',
  ACCENT12: '#F0FDD3',
  ACCENT13: '#C5C3FF',
  DEEP_PURPLE: '#A347FF',
  SECTION1: '#FFE19F',
  SECTION2: '#E6FFD3',
  SECTION3: '#D0FFD1',
  SECTION4: '#FFFCB4',
  SECTION5: '#DDE3FF',
  WARNING: '#ED7878',
  SUCCESS: '#00A85F',
  INFO: '#FDED6D',
  SUCCESS_LIGHT: '#E4FEF1',
  SUCCESS_LIGHT2: '#BDFADC',
  ERROR: '#B00620',
  ICON_LIGHT: '#77AAAF',
  CHART1: '#078DFF',
  CARD_BORDER: '#A347FF',
};

export const APPBAR_HEIGHT = {
  DENSE: 48,
  NORMAL: 56,
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
      fontFamily: 'bilo',
      fontSize: '20px',
      fontWeight: 500,
      letterSpacing: '1.6pt',
      color: TEXT_COLOR,
    },
    h6: {
      fontFamily: 'atten-round-new',
      fontWeight: 800,
      fontSize: '16px',
      color: TEXT_COLOR,
      letterSpacing: '0.8px',
    },
    subtitle1: {
      fontSize: '16px',
      fontWeight: 900,
      letterSpacing: '0.8pt',
      lineHeight: '1.4',
      color: TEXT_COLOR,
    },
    subtitle2: {
      fontFamily: 'Bilo',
      fontSize: '20px',
      color: TEXT_COLOR,
    },
    body1: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '24px',
      letterSpacing: '1px',
      color: TEXT_COLOR,
    },
    body2: {
      fontSize: '16px',
      fontWeight: 900,
      fontFamily: 'atten-round-new',
      letterSpacing: '1px',
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
    MuiTab: {
      labelIcon: {
        minHeight: '64px',
      },
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

export default createTheme(THEME_OPTIONS);
