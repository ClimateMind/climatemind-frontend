import classes from './CmButton.module.css';
import CmTypography from './CmTypography';
import { CircularProgress } from '@mui/material';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick?: () => void;
  color?: 'success' | 'error' | 'userb';
  variant?: 'outlined' | 'text';
  style?: React.CSSProperties;
  startIcon?: React.ReactNode;
  isLoading?: boolean;
}

function CmButton({ text, onClick, color = 'success', variant = 'outlined', isLoading, style, startIcon, ...rest }: Props) {
  if (variant === 'text') {
    return (
      <button style={{ position: 'relative', border: 'none', background: 'transparent' }}>
        <CmTypography
          variant="button"
          style={{
            padding: 5,
            marginLeft: startIcon ? 10 : 0,
            color: (rest.disabled || isLoading) ? '#77AAAF' : 'black',
            cursor: rest.disabled ? 'default' : 'pointer',
            visibility: isLoading ? 'hidden' : 'visible',
            ...style,
          }}
          onClick={rest.disabled ? () => {} : onClick}
        >
          {text}
        </CmTypography>
        <div style={{ position: 'absolute', top: 5, left: '50%', transform: 'translateX(-50%)' }}>
          {isLoading && <CircularProgress size={22} style={{ color: 'gray', marginRight: 5 }} />}
        </div>
      </button>
    );
  }

  const borderColor = color === 'error' ? 'red' : color === 'userb' ? '#a347ff' : '#39f5ad';

  return (
    <button {...rest}
      disabled={rest.disabled || isLoading}
      onClick={onClick}
      className={classes.CmButton}
      style={{
        borderColor,
        ...style
      }}
    >
      {isLoading ? <CircularProgress size={22} style={{ color: 'gray', marginRight: 5 }} /> : startIcon}
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
