import React from 'react';
import { Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number | boolean;
  onChange: (newValue: number) => void;
  style?: React.CSSProperties;
}

const CmTabs = styled((props: StyledTabsProps) => (
  <Tabs variant='fullWidth' {...props} onChange={(_: any, value: number) => props.onChange(value)} />
))({
  width: '100%',
  '& .MuiTabs-flexContainer': {
    justifyContent: 'center',
  },
  '& .MuiTabs-indicator': {
    width: '100%',
    backgroundColor: '#39F5AD',
  },
});

export default CmTabs;
