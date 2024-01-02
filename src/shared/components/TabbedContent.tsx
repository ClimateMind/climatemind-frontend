import { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentIcon from '@mui/icons-material/Assignment';

import { TAction } from '../../types/Actions';
import { COLORS } from '../../common/styles/CMTheme';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export interface TabbedContentProps {
  action?: TAction;
  details?: React.ReactNode;
  sources?: React.ReactNode;
  tabOneName?: string;
  tabTwoName?: string;
}

export const TabbedContent: React.FC<TabbedContentProps> = ({
  details,
  sources,
  tabOneName = 'Details',
  tabTwoName = 'Sources',
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div style={{flexGrow: 1,
      width: '100%',}}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        aria-label="scrollable force tabs example"
        sx={{ root: {
          textTransform: 'capitalize',
          color: COLORS.ICON_LIGHT,
        }}}
      >
        <Tab
          label={tabOneName}
          icon={<AssignmentIcon style={ {marginBottom: '0 !important'}} />}
          {...a11yProps(0)}
        />
        <Tab
          label={tabTwoName}
          icon={<DescriptionIcon style={{marginBottom: '0 !important'}} />}
          {...a11yProps(1)}
        />
      </Tabs>

      <TabPanel value={value} index={0}>
        {details}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {sources}
      </TabPanel>
    </div>
  );
};

export default TabbedContent;
