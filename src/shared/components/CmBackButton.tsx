import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CmTypography from './CmTypography';

interface Props {
  text?: string;
  onClick: () => void;
}

function CmBackButton({ text = 'Back', onClick }: Props) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
      <ChevronLeftIcon fontSize='large' style={{ color: 'rgb(163, 71, 255)' }} />
      <CmTypography variant='button'>{text}</CmTypography>
    </div>
  );
}

export default CmBackButton;
