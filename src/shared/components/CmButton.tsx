import classes from './CmButton.module.css';
import CmTypography from './CmTypography';
import { CircularProgress } from '@mui/material';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick?: () => void;
  color?: 'success' | 'error';
  variant?: 'outlined' | 'text';
  style?: React.CSSProperties;
  startIcon?: React.ReactNode;
  isLoading?: boolean;
}

function CmButton({ text, onClick, color = 'success', variant = 'outlined', isLoading, style, startIcon, ...rest }: Props) {
  if (variant === 'text') {
    return (
      <CmTypography
        variant="button"
        style={{
          padding: 5,
          marginLeft: startIcon ? 10 : 0,
          color: (rest.disabled || isLoading) ? '#77AAAF' : 'black',
          cursor: rest.disabled ? 'default' : 'pointer',
          ...style,
        }}
        onClick={rest.disabled ? () => {} : onClick}
      >
        {text}
      </CmTypography>
    );
  }

  return (
    <button {...rest}
      disabled={rest.disabled || isLoading}
      onClick={onClick}
      className={classes.CmButton}
      style={{
        borderColor: color === 'error' ? 'red' : '39f5ad',
        ...style
      }}
    >
      {isLoading ? <CircularProgress size='small' style={{ color: 'gray', marginRight: 5 }} /> : startIcon}
      <CmTypography
        variant="button"
        style={{
          padding: 5,
          marginLeft: startIcon ? 10 : 0,
          color: (rest.disabled || isLoading) ? '#77AAAF' : 'black',
        }}
      >
        {text}
      </CmTypography>
    </button>
  );
}

export default CmButton;
