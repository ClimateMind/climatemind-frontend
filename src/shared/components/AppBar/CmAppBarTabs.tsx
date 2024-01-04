import { Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const CmAppBarTabs = styled((props: StyledTabsProps) => <Tabs {...props} />)({
  '& .MuiTabs-indicator': {
    width: '100%',
    backgroundColor: '#39F5AD',
  },
});

export default CmAppBarTabs;
