import { Radio } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Props {
  checked?: boolean;
  onChange?: () => void;
  style?: React.CSSProperties;
}

const CmRadio = styled((props: Props) => <Radio {...props} />)(
  () => ({
    color: '#77AAAF',
    '&.Mui-checked': {
      color: '#39f5AD',
    },
  })
);

export default CmRadio;
