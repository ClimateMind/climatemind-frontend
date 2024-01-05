import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CmTypography from './CmTypography';

interface Props {
  text?: string;
  onClick: () => void;
  style?: React.CSSProperties;
}

function CmBackButton({ text = 'Back', onClick, style }: Props) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', ...style }}>
      <ChevronLeftIcon fontSize='large' style={{ color: 'rgb(163, 71, 255)' }} />
      <CmTypography variant='button'>{text}</CmTypography>
    </div>
  );
}

export default CmBackButton;
