import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CmTypography from './CmTypography';

interface Props {
  text?: string;
  onClick: () => void;
  style?: React.CSSProperties;
}

function CmBackButton({ text = 'Back', onClick, style }: Props) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', padding: 5, ...style }}>
      <ChevronLeftIcon fontSize='large' style={{ color: '#07373B' }} />
      <CmTypography variant='button' style={{ color: '#07373B', textTransform: 'none', letterSpacing: 0 }}>{text}</CmTypography>
    </div>
  );
}

export default CmBackButton;
