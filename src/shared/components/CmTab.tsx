import React from 'react';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';

interface Props {
  label: string;
  icon: React.ReactElement;
}

const CmTab = styled((props: Props) => <Tab {...props} />)(
  () => ({
    flex: '1',
    textTransform: 'none',
    fontFamily: 'Nunito',
    fontSize: 12,
    fontWeight: 800,
    color: '#77AAAF',
    '&.Mui-selected': {
      color: '#07373B',
    },
  })
);

export default CmTab;
