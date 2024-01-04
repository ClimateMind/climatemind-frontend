import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';

interface Props {
  label: string;
  icon: React.ReactElement;
}

const CmAppBarTab = styled((props: Props) => <Tab disableRipple {...props} />)(
  () => ({
    textTransform: 'none',
    fontFamily: 'Nunito',
    fontSize: 12,
    fontWeight: 800,
    marginBottom: -8,
    width: 160,
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-selected': {
      color: '#fff',
    },
  })
);

export default CmAppBarTab;
