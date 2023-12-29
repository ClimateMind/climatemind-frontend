import React from 'react';

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'body-italics' | 'button' | 'caption' | 'label' | 'overline';
  children: React.ReactNode;
  style?: React.CSSProperties;
}

function CmTypography({ variant, children, style, ...rest }: Props) {
  let textStyle: React.CSSProperties = styles.body;

  switch (variant) {
    case 'h1':
      textStyle = styles.headline1;
      return <h1 {...rest} style={{...textStyle, ...style}}>{children}</h1>;
    case 'h2':
      textStyle = styles.headline2;
      return <h2 {...rest} style={{...textStyle, ...style}}>{children}</h2>;
    case 'h3':
      textStyle = styles.headline3;
      return <h3 {...rest} style={{...textStyle, ...style}}>{children}</h3>;
    case 'h4':
      textStyle = styles.headline4;
      return <h4 {...rest} style={{...textStyle, ...style}}>{children}</h4>;
    case 'body':
      textStyle = styles.body;
      break;
    case 'body-italics':
      textStyle = styles.bodyItalics;
      break;
    case 'button':
      textStyle = styles.button;
      break;
    case 'caption':
      textStyle = styles.caption;
      break;
    case 'label':
      textStyle = styles.label;
      break;
    case 'overline':
      textStyle = styles.overline;
      break;
    default:
      textStyle = styles.body;
      break;
  }

  return (
    <p {...rest} style={{ margin: 0, padding: 0, ...textStyle, ...style }}>
      {children}
    </p>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  headline1: {
    color: '#07373B',
    fontFamily: 'Nunito',
    fontSize: 32,
    fontWeight: 900,
    lineHeight: 1.2,
    letterSpacing: 0.8,
    textAlign: 'center',
    paddingTop: 8,
  },
  headline2: {
    color: '#07373B',
    fontFamily: 'Nunito',
    fontSize: 24,
    fontWeight: 900,
    lineHeight: 1.3,
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  headline3: {
    color: '#07373B',
    fontFamily: 'Nunito',
    fontWeight: 900,
    fontSize: 18,
    lineHeight: 1.4,
    letterSpacing: 1.6,
    textAlign: 'center',
  },
  headline4: {
    color: '#07373B',
    fontFamily: 'Nunito',
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.375,
    textAlign: 'center',
  },
  body: {
    color: '#07373B',
    fontFamily: 'Nunito',
    fontSize: 16,
    lineHeight: 1.375,
  },
  bodyItalics: {
    fontFamily: 'Nunito',
    fontSize: 16,
    fontStyle: 'italic',
    color: '#07373B',
    lineHeight: 1.375,
  },
  button: {
    color: '#07373B',
    fontFamily: 'Nunito',
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 1.5,
    letterSpacing: 3.2,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  caption: {
    color: '#07373B',
    fontFamily: 'Nunito',
    fontSize: 12,
    lineHeight: 1.333,
  },
  label: {
    color: '#07373B',
    fontFamily: 'Nunito',
    fontSize: 12,
    fontWeight: 800,
    lineHeight: 1.333,
    letterSpacing: 1.0,
  },
  overline: {
    color: '#07373B',
    fontFamily: 'Nunito',
    fontSize: 10,
    fontWeight: 700,
    lineHeight: 1.4,
    letterSpacing: 3.2,
    textTransform: 'uppercase',
  },
};

export default CmTypography;
