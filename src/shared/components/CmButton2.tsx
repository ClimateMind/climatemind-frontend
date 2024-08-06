import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import CmTypography from "./CmTypography";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variant?: 'light' | 'dark';
  style?: React.CSSProperties;
  isLoading?: boolean;
}

function CmButton2({ text, variant = 'light', style, isLoading = false, ...rest }: Props) {
  const backgroundColor = variant === 'light' ? '#D0EEEB' : '#07373B';
  const color = variant === 'light' ? '#07373B' : '#FFFFFF';

  return (
    <button style={{ ...styles.button, backgroundColor, opacity: rest.disabled ? 0.3 : 1, ...style }} {...rest} disabled={isLoading || rest.disabled}>
      {isLoading && <CircularProgress size={24} style={{ color }} />}
      {!isLoading && <CmTypography variant='onboarding-button' style={{ color }}>{text}</CmTypography>}
    </button>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  button: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#07373B',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 36,
    paddingRight: 29,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    minWidth: 240,
    cursor: 'pointer',
  },
};

export default CmButton2;
