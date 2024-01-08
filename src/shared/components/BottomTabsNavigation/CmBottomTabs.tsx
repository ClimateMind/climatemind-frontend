import React from 'react';
import { Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number | boolean;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  style?: React.CSSProperties;
}

const CmBottomTabs = styled((props: StyledTabsProps) => (
  <Tabs {...props} TabIndicatorProps={{ sx: { top: 8 } }} />
))({
  width: '100%',
  '& .MuiTabs-flexContainer': {
    justifyContent: 'center',
  },
  '& .MuiTabs-indicator': {
    width: '100%',
    backgroundColor: '#07373B',
  },
});

export default CmBottomTabs;
