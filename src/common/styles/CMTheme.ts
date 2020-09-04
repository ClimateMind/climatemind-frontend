import { createMuiTheme } from "@material-ui/core";

const TEXT_COLOR: string = '#07373B';

// TODO - move values to constants
export default createMuiTheme({
    palette: {
        primary: {
            main: '#FFFFFF',
            contrastText: TEXT_COLOR
        },
        text: {
            primary: TEXT_COLOR
        }
    },
    typography: {
        fontFamily: 'Bilo',
        h3: {
            fontFamily: 'atten-round-new',
            fontSize: '32pt',
            fontWeight: 500,
            letterSpacing: '1.6pt',
            color: TEXT_COLOR
        },
        h4: {
            fontFamily: 'atten-round-new',
            fontSize: '24pt',
            fontWeight: 800,
            letterSpacing: '1.6pt',
            color: TEXT_COLOR
        },
        h6: {
            fontSize: '14pt',
            color: TEXT_COLOR
        },
        button: {
            textTransform: 'uppercase',
            letterSpacing: '1pt',
            color: TEXT_COLOR,
        }
    }
})